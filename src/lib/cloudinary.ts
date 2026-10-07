/**
 * Image upload to Cloudinary.
 *
 * The backoffice fields that carry an image (`coverImage` on projects and
 * articles, and any field typed `image` in `flows.tsx`) store a plain URL
 * string in the document — exactly what the mock database keeps. This module
 * only turns a chosen file into such a URL, so nothing else has to change:
 *
 *  - **upload** — the file is pushed to Cloudinary and the returned
 *    `secure_url` is stored, using either a signed request (the `cloudinary-sign`
 *    edge function signs each upload with the *secret*, which never reaches
 *    the browser) or an unsigned preset when one is given.
 *  - **link** — the editor pastes any public URL and that string is stored
 *    as-is.
 *
 * Configuration (Vite env, none of it a secret except what the edge function
 * reads):
 *
 *  - `VITE_CLOUDINARY_CLOUD_NAME`       — your cloud's identifier (public).
 *    Required for uploads.
 *  - `VITE_CLOUDINARY_UPLOAD_PRESET`    — optional. When set, uploads use this
 *    *unsigned* preset instead of the signed edge-function path. Create it in
 *    Dashboard → Settings → Upload → presets (signing = unsigned).
 *
 * For the signed path, set these as secrets on the `cloudinary-sign` edge
 * function (never in `.env` — they would be inlined publicly):
 *
 *   supabase secrets set CLOUDINARY_API_KEY=<your key>
 *   supabase secrets set CLOUDINARY_API_SECRET=<your secret>
 *   supabase secrets set CLOUDINARY_CLOUD_NAME=<your cloud>
 *   supabase secrets set CLOUDINARY_FOLDER=childrensmile   # optional
 *
 * The API key is safe to show a signed request (it is part of the signing
 * scheme, not a secret); the secret only ever lives server-side.
 */

import { SUPABASE_URL, supabase } from "./supabase"

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? ""
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? ""

export const cloudinaryConfigured = Boolean(CLOUD_NAME)

export type UploadImageResult =
  | { ok: true; url: string }
  | { ok: false; error: string }

type SignedUploadParams = {
  signature: string
  timestamp: string
  apiKey: string
  cloudName: string
  folder: string
  publicId: string
}

/** Asks the edge function for a per-upload signature. The function verifies
 *  the caller is a logged-in backoffice editor before signing anything. */
async function signUpload(publicId: string): Promise<
  { ok: true; params: SignedUploadParams } | { ok: false; error: string }
> {
  if (!supabase) {
    return {
      ok: false,
      error: "Connexion requise pour importer une image.",
    }
  }
  const session = await supabase.auth.getSession()
  const token = session?.data?.session?.access_token
  if (!token) return { ok: false, error: "Vous n’êtes pas connecté." }
  try {
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/cloudinary-sign`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ publicId }),
      },
    )
    const body = (await response.json().catch(() => null)) as
      | {
          ok?: boolean
          error?: string
          signature?: string
          timestamp?: string
          apiKey?: string
          cloudName?: string
          folder?: string
          publicId?: string
        }
      | null
    if (
      !response.ok ||
      !body?.ok ||
      !body.signature ||
      !body.timestamp ||
      !body.apiKey ||
      !body.cloudName
    ) {
      return {
        ok: false,
        error:
          body?.error ??
          "L’import d’images n’est pas prêt (fonction cloudinary-sign non déployée). Utilisez le champ URL.",
      }
    }
    return {
      ok: true,
      params: {
        signature: body.signature,
        timestamp: body.timestamp,
        apiKey: body.apiKey,
        cloudName: body.cloudName,
        folder: body.folder ?? "",
        publicId: body.publicId ?? publicId,
      },
    }
  } catch {
    return {
      ok: false,
      error:
        "Le service d’import d’images est inaccessible. Réessayez, ou collez une URL.",
    }
  }
}

/** Posts the file to Cloudinary with a request signed by the edge function. */
async function signedUpload(
  file: File,
): Promise<UploadImageResult> {
  const publicId = `csc-${crypto.randomUUID()}`
  const signed = await signUpload(publicId)
  if (!signed.ok) return signed
  const { params } = signed
  const body = new FormData()
  body.append("file", file)
  body.append("folder", params.folder)
  body.append("public_id", params.publicId)
  body.append("timestamp", params.timestamp)
  body.append("api_key", params.apiKey)
  body.append("signature", params.signature)
  return postToCloudinary(body, params.cloudName)
}

/** Posts the file with an unsigned preset (no signing step). */
async function unsignedUpload(
  file: File,
): Promise<UploadImageResult> {
  const body = new FormData()
  body.append("file", file)
  body.append("upload_preset", UPLOAD_PRESET)
  return postToCloudinary(body, CLOUD_NAME)
}

async function postToCloudinary(
  body: FormData,
  cloudName: string,
): Promise<UploadImageResult> {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body },
    )
    if (!response.ok) {
      const detail = (await response.json().catch(() => null)) as {
        error?: { message?: string }
      } | null
      return {
        ok: false,
        error:
          detail?.error?.message?.startsWith("Invalid upload preset")
            ? "Le preset d’import Cloudinary est invalide. Vérifiez VITE_CLOUDINARY_UPLOAD_PRESET."
            : detail?.error?.message?.includes("signature")
              ? "La signature Cloudinary a été refusée. Retentez dans un instant."
              : "L’import Cloudinary a échoué. Réessayez, ou collez une URL.",
      }
    }
    const json = (await response.json()) as { secure_url?: string }
    if (!json.secure_url) {
      return { ok: false, error: "Cloudinary n’a pas renvoyé d’URL valide." }
    }
    return { ok: true, url: json.secure_url }
  } catch {
    return {
      ok: false,
      error: "L’import Cloudinary est inaccessible. Vérifiez votre connexion, ou collez une URL.",
    }
  }
}

/** Uploads a single image and returns its stored URL. */
export async function uploadImage(file: File): Promise<UploadImageResult> {
  if (!cloudinaryConfigured) {
    return {
      ok: false,
      error:
        "L’import d’images n’est pas configuré (VITE_CLOUDINARY_CLOUD_NAME manquant). Utilisez le champ URL.",
    }
  }
  if (!file.type.startsWith("image/")) {
    return { ok: false, error: "Le fichier choisi n’est pas une image." }
  }
  if (file.size > 10 * 1024 * 1024) {
    return { ok: false, error: "L’image dépasse 10 Mo." }
  }
  return UPLOAD_PRESET
    ? unsignedUpload(file)
    : signedUpload(file)
}