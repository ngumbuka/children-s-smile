import { Link } from "react-router-dom"
import { useOrganisation, usePublicImpact } from "../lib/public"
import { Icon } from "./Icon"

const assetPathPrefix = "/assets"
const imgLogo = `${assetPathPrefix}/1fe61.png`

const imgTransparenceIcon = `${assetPathPrefix}/bcc79.svg`
const imgPhoneIcon = `${assetPathPrefix}/7e754.svg`
const imgDocIcon = `${assetPathPrefix}/e8b1a.svg`
const imgCertIcon = `${assetPathPrefix}/9677a.svg`
const imgScaleIcon = `${assetPathPrefix}/af606.svg`
const imgPartnerIcon = `${assetPathPrefix}/ebbdc.svg`
const imgImpactIcon = `${assetPathPrefix}/0d423.svg`
const imgPhoneContactIcon = `${assetPathPrefix}/235d5.svg`
const imgWhatsappIcon = `${assetPathPrefix}/17688.svg`
const imgMoneyIcon = `${assetPathPrefix}/8875f.svg`

export function Footer() {
  const organisation = useOrganisation()
  const impact = usePublicImpact()
  return (
    <footer className="bg-surface-muted border-t border-[rgba(194,198,211,0.3)] flex flex-col items-start w-full">
      <div className="flex flex-col gap-10 items-start py-10 w-full shell">
        <div className="grid grid-cols-1 gap-8 items-start w-full md:grid-cols-2 xl:grid-cols-[424px_repeat(3,224px)] xl:gap-6">
          {/* Brand */}
          <div className="flex flex-col gap-4 items-start w-full shrink-0 xl:w-[424px]">
            <Link className="flex gap-3 items-center rounded-xs" to="/">
              <div className="relative rounded-pill shrink-0 size-8">
                <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-pill">
                  <img
                    alt=""
                    className="absolute left-0 max-w-none size-full top-0"
                    src={imgLogo}
                  />
                </div>
              </div>
              <div className="flex flex-col font-['Montserrat'] font-bold items-start">
                <p className="leading-[25px] text-brand-900 text-xl">
                  {organisation.name}
                </p>
                <p className="leading-4 text-ink-700 text-[11px] tracking-[1.1px] uppercase">
                  CAMEROUN
                </p>
              </div>
            </Link>
            <p className="font-['Inter'] font-normal leading-[22px] text-ink-700 text-sm">
              Organisation humanitaire à but non lucratif dédiée à la
              protection,{" "}
              {`l'éducation civique, la santé et l'épanouissement des enfants`}{" "}
              vulnérables de 3 à 15 ans dans les zones rurales et périurbaines
              isolées des 10 régions du Cameroun.
            </p>
            <div className="flex flex-col gap-1 items-start text-[12px]">
              <p className="font-['Inter'] font-bold text-ink-900">
                Agrément Ministériel Officiel :
              </p>
              <p className="font-['Inter'] font-semibold text-ink-700">
                {organisation.legalApproval}
              </p>
              <p className="font-['Inter'] font-semibold text-ink-700">{`Enregistrée sous le régime de la loi N° 90/053`}</p>
            </div>
          </div>

          {/* Piliers */}
          <div className="flex flex-col gap-4 items-start w-full shrink-0 xl:w-[224px]">
            <div className="flex gap-2 items-center">
              <Icon name="pillars" size={16} className="shrink-0" />
              <p className="font-['Montserrat'] font-bold text-brand-900 text-lg whitespace-nowrap">{`Piliers d'Intervention`}</p>
            </div>
            <div className="flex flex-col gap-2 items-start">
              {[
                {
                  color: "#004484",
                  text: `Scolarisation & Kits Pédagogiques`,
                  to: "/nos-actions",
                },
                {
                  color: "#006e2d",
                  text: `Cantines Solidaires & Nutrition Rurale`,
                  to: "/nos-actions",
                },
                {
                  color: "#a33900",
                  text: `Protection Infantile & État Civil`,
                  to: "/nos-actions",
                },
                {
                  color: "#0b5cab",
                  text: `Santé Préventive & Eau Potable`,
                  to: "/nos-actions",
                },
                {
                  color: "#7cf994",
                  text: `Mentorat & Autonomisation Communautaire`,
                  to: "/nos-actions",
                },
              ].map((item) => (
                <Link
                  key={item.text}
                  className="flex gap-2 items-center footer-link rounded-xs"
                  to={item.to}
                >
                  <div
                    className="rounded-pill shrink-0 size-1.5"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="font-['Inter'] font-normal text-sm">
                    {item.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Transparence */}
          <div className="flex flex-col gap-4 items-start w-full shrink-0 xl:w-[224px]">
            <div className="flex gap-2 items-center">
              <Icon name="shieldCheck" size={16} className="shrink-0" />
              <p className="font-['Montserrat'] font-bold text-brand-900 text-lg">
                {`Transparence &`}
                <br />
                {`Gouvernance`}
              </p>
            </div>
            <div className="flex flex-col gap-2 items-start">
              {[
                {
                  icon: imgDocIcon,
                  iconW: "w-[10.67px]",
                  iconH: "h-[13.33px]",
                  text: `Rapports Annuels & Audits CEMAC`,
                  to: "/notre-impact",
                },
                {
                  icon: imgCertIcon,
                  iconW: "w-[13.33px]",
                  iconH: "h-[13.33px]",
                  text: `Comptes Certifiés BEAC & MinFi`,
                  to: "/notre-impact",
                },
                {
                  icon: imgScaleIcon,
                  iconW: "w-[16px]",
                  iconH: "h-[8px]",
                  text: `Conseil d'Administration Indépendant`,
                  to: "/a-propos",
                },
                {
                  icon: imgPartnerIcon,
                  iconW: "w-[14.67px]",
                  iconH: "h-[13.33px]",
                  text: `Partenariats Institutionnels & ONGs`,
                  to: "/a-propos",
                },
                {
                  icon: imgImpactIcon,
                  iconW: "w-[12px]",
                  iconH: "h-[12px]",
                  text: `Suivi Terrain & Taux d'Impact ${impact.impactRate}%`,
                  to: "/notre-impact",
                },
              ].map((item) => (
                <Link
                  key={item.text}
                  className="flex gap-2 items-center footer-link rounded-xs"
                  to={item.to}
                >
                  <div
                    className={`relative shrink-0 ${item.iconW} ${item.iconH}`}
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={item.icon}
                    />
                  </div>
                  <p className="font-['Inter'] font-normal text-sm">
                    {item.text}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 items-start w-full shrink-0 xl:w-[224px]">
            <div className="flex gap-2 items-center">
              <Icon name="phone" size={16} className="shrink-0" />
              <p className="font-['Montserrat'] font-bold text-brand-900 text-lg">{`Ligne Directe & Soutien`}</p>
            </div>
            <div className="flex flex-col gap-3 items-start">
              <div className="flex gap-2 items-start">
                <Icon name="phone" size={12} className="shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <p className="font-['Inter'] font-bold text-ink-900 text-sm">
                    Permanence Siège :
                  </p>
                  {organisation.contact.phones.map((phone) => (
                    <p
                      key={phone}
                      className="font-['Inter'] font-normal text-ink-700 text-sm"
                    >
                      {phone}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Icon name="whatsapp" size={16} className="shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <p className="font-['Inter'] font-bold text-ink-900 text-sm whitespace-nowrap">
                    WhatsApp Coordination :
                  </p>
                  <p className="font-['Inter'] font-normal text-ink-700 text-sm">
                    {organisation.contact.whatsapp}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Icon name="wallet" size={16} className="shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <p className="font-['Inter'] font-bold text-ink-900 text-sm whitespace-nowrap">
                    Canaux de Dons Certifiés :
                  </p>
                  <p className="font-['Inter'] font-normal text-ink-700 text-xs">{`Orange Money & MTN MoMo officiels`}</p>
                  <Link
                    className="font-['Inter'] font-semibold text-accent-700 text-sm footer-link rounded-xs underline"
                    to="/nous-soutenir"
                  >
                    {`Faire un don maintenant`}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(194,198,211,0.3)] flex flex-col gap-4 items-start justify-between pt-6 w-full lg:flex-row lg:items-center">
          <p className="font-['Inter'] font-normal text-ink-700 text-sm">{`© 2025 ${organisation.name} Cameroun. Tous droits réservés.`}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="font-['Inter'] font-semibold text-ink-700 text-xs">{`Politique de Sauvegarde de l'Enfance`}</span>
            <span className="text-ink-300">•</span>
            <span className="font-['Inter'] font-semibold text-ink-700 text-xs">{`Mentions Légales & RGPD`}</span>
            <span className="text-ink-300">•</span>
            <span className="font-['Inter'] font-semibold text-ink-700 text-xs">{`Code d'éthique et Déontologie`}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
