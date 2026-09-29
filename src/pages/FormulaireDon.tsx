import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const assetPathPrefix = '/assets';
const imgRectangle = `${assetPathPrefix}/1720c.png`;
const imgShield = `${assetPathPrefix}/28343.svg`;
const imgPhone = `${assetPathPrefix}/3fac7.svg`;
const imgMapPin = `${assetPathPrefix}/f48bd.svg`;
const imgCheck = `${assetPathPrefix}/409ec.svg`;
const imgLine = `${assetPathPrefix}/e8887.svg`;
const imgLine1 = `${assetPathPrefix}/1022d.svg`;
const imgLine2 = `${assetPathPrefix}/5d0b6.svg`;
const imgCheck1 = `${assetPathPrefix}/04f70.svg`;
const imgSmartphone = `${assetPathPrefix}/94c4a.svg`;
const imgIndicator = `${assetPathPrefix}/e0d2e.svg`;
const imgCreditCard = `${assetPathPrefix}/446b6.svg`;
const imgGlobe = `${assetPathPrefix}/6552d.svg`;
const imgInfo = `${assetPathPrefix}/9b568.svg`;
const imgShieldAlert = `${assetPathPrefix}/23b88.svg`;
const imgLine3 = `${assetPathPrefix}/93fe4.svg`;
const imgCheckCircle = `${assetPathPrefix}/2d5a7.svg`;
const imgShieldCheck = `${assetPathPrefix}/eec99.svg`;
const imgLock = `${assetPathPrefix}/0daf5.svg`;
const imgCreditCard1 = `${assetPathPrefix}/72690.svg`;
const imgCircleX = `${assetPathPrefix}/90405.svg`;
const imgWallet = `${assetPathPrefix}/9d939.svg`;
const imgMountain = `${assetPathPrefix}/f4d30.svg`;

export default function FormulaireDon() {
  const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'card' | 'bank'>('mobile');

  return (
    <div className="donation-checkout-page bg-surface-subtle flex flex-col items-start w-full min-h-screen overflow-x-hidden">
      <Header />

      {/* Main */}
      <main id="main-content" className="bg-surface-subtle flex flex-col items-start pb-16 pt-10 w-full lg:pb-20 lg:pt-12">
        <div className="flex flex-col gap-12 items-start w-full mx-auto shell">
          {/* Progress Header */}
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex gap-2 items-center whitespace-nowrap">
              <p className="font-['Montserrat'] font-bold leading-4 text-brand-900 text-[11px] tracking-[1.1px] uppercase">
                FINALISATION SÉCURISÉE
              </p>
              <p className="font-['Inter'] font-normal text-[#8a94a6] text-sm" data-decorative-separator="true">•</p>
              <p className="font-['Montserrat'] font-bold leading-4 text-accent-700 text-[11px] tracking-[1.1px] uppercase">
                BANC-PUPITRE RENTRÉE RURALE
              </p>
            </div>
            <div className="flex flex-col gap-6 items-start justify-between w-full lg:flex-row lg:items-end">
              <p className="font-['Montserrat'] font-extrabold leading-tight text-brand-900 text-3xl sm:text-4xl lg:leading-[44px] lg:whitespace-nowrap">
                Formulaire de Don Sécurisé
              </p>
              {/* Steps */}
              <div className="flex gap-3 items-center overflow-x-auto max-w-full pb-1 sm:gap-4">
                <div className="flex gap-2 items-center">
                  <div className="bg-accent-700 flex flex-col items-center justify-center rounded-xl size-6">
                    <div className="relative shrink-0 size-3">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck} />
                    </div>
                  </div>
                  <p className="font-['Inter'] font-semibold text-accent-700 text-[13px] whitespace-nowrap">Palier</p>
                </div>
                <div className="h-0 relative shrink-0 w-5">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine} />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="bg-brand-900 flex flex-col items-center justify-center rounded-xl size-6">
                    <p className="font-['Montserrat'] font-bold text-[11px] text-white whitespace-nowrap">2</p>
                  </div>
                  <p className="font-['Inter'] font-bold text-brand-900 text-[13px] whitespace-nowrap">Paiement</p>
                </div>
                <div className="h-0 relative shrink-0 w-5">
                  <div className="absolute inset-[-2px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine1} />
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="bg-white border-2 border-border-subtle border-solid flex flex-col items-center justify-center rounded-xl size-6">
                    <p className="font-['Montserrat'] font-bold text-[#8a94a6] text-[11px] whitespace-nowrap">3</p>
                  </div>
                  <p className="font-['Inter'] font-medium text-ink-600 text-[13px] whitespace-nowrap">Reçu</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columns */}
          <div className="flex flex-col gap-10 items-start w-full lg:flex-row">
            {/* Left Column */}
            <div className="flex flex-1 flex-col gap-8 items-start min-w-0 w-full lg:w-auto">
              {/* Contact Card */}
              <div className="bg-white drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)] flex flex-col gap-6 items-start p-5 rounded-xl w-full sm:p-8">
                <div className="flex gap-3 items-center">
                  <div className="bg-surface-tint flex flex-col items-center justify-center rounded-panel size-7">
                    <p className="font-['Montserrat'] font-bold text-brand-900 text-sm whitespace-nowrap">1</p>
                  </div>
                  <p className="font-['Montserrat'] font-bold text-ink-900 text-lg">
                    Coordonnées du Bienfaiteur (Reçu Fiscal)
                  </p>
                </div>
                <div className="h-0 relative w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
                <div className="flex flex-col gap-5 items-start w-full">
                  <div className="flex flex-col gap-4 items-start w-full sm:flex-row">
                    <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
                      <label htmlFor="don-civility" className="font-['Montserrat'] font-bold leading-4 text-ink-900 text-[12px] whitespace-nowrap">Civilité *</label>
                      <div className="bg-white border border-border-subtle flex items-start px-4 py-3 rounded-lg w-full focus-within:ring-2 focus-within:ring-[#0b5cab]">
                        <input id="don-civility" name="civility" required autoComplete="honorific-prefix" className="flex-1 font-['Inter'] font-normal leading-5 text-ink-900 text-sm outline-none bg-transparent" defaultValue="M." />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
                      <label htmlFor="don-email" className="font-['Montserrat'] font-bold leading-4 text-ink-900 text-[12px] whitespace-nowrap">Adresse E-mail *</label>
                      <div className="bg-white border border-border-subtle flex items-start px-4 py-3 rounded-lg w-full focus-within:ring-2 focus-within:ring-[#0b5cab]">
                        <input id="don-email" name="email" type="email" required autoComplete="email" className="flex-1 font-['Inter'] font-normal leading-5 text-ink-900 placeholder:text-ink-600 text-sm outline-none bg-transparent w-full" placeholder="votre@adresse.com" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 items-start w-full sm:flex-row">
                    <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
                      <label htmlFor="don-name" className="font-['Montserrat'] font-bold leading-4 text-ink-900 text-[12px] whitespace-nowrap">Nom complet / Raison Sociale *</label>
                      <div className="bg-white border border-border-subtle flex items-start px-4 py-3 rounded-lg w-full focus-within:ring-2 focus-within:ring-[#0b5cab]">
                        <input id="don-name" name="name" required autoComplete="name" className="flex-1 font-['Inter'] font-normal leading-5 text-ink-900 text-sm outline-none bg-transparent w-full" defaultValue="Emmanuel Kamga" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
                      <label htmlFor="don-phone" className="font-['Montserrat'] font-bold leading-4 text-ink-900 text-[12px] whitespace-nowrap">Numéro de Téléphone *</label>
                      <div className="bg-white border border-border-subtle flex items-start px-4 py-3 rounded-lg w-full focus-within:ring-2 focus-within:ring-[#0b5cab]">
                        <input id="don-phone" name="phone" type="tel" required autoComplete="tel" className="flex-1 font-['Inter'] font-normal leading-5 text-ink-900 placeholder:text-ink-600 text-sm outline-none bg-transparent w-full" placeholder="+237 6XX XX XX XX" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 items-start w-full">
                    <label htmlFor="don-address" className="font-['Montserrat'] font-bold leading-4 text-ink-900 text-[12px]">
                      Adresse Postale de Résidence (Obligatoire pour reçu fiscal) *
                    </label>
                    <div className="bg-white border border-border-subtle flex items-start px-4 py-3 rounded-lg w-full focus-within:ring-2 focus-within:ring-[#0b5cab]">
                      <input id="don-address" name="address" required autoComplete="street-address" className="flex-1 font-['Inter'] font-normal leading-5 text-ink-900 placeholder:text-ink-600 text-sm outline-none bg-transparent w-full" placeholder="Ex: 12 Rue du Lac / B.P. 124 Yaoundé" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 items-start w-full sm:flex-row">
                    <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
                      <label htmlFor="don-city" className="font-['Montserrat'] font-bold leading-4 text-ink-900 text-[12px] whitespace-nowrap">Ville *</label>
                      <div className="bg-white border border-border-subtle flex items-start px-4 py-3 rounded-lg w-full focus-within:ring-2 focus-within:ring-[#0b5cab]">
                        <input id="don-city" name="city" required autoComplete="address-level2" className="flex-1 font-['Inter'] font-normal leading-5 text-ink-900 text-sm outline-none bg-transparent w-full" defaultValue="Paris" />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 items-start min-w-0">
                      <label htmlFor="don-country" className="font-['Montserrat'] font-bold leading-4 text-ink-900 text-[12px] whitespace-nowrap">Pays *</label>
                      <div className="bg-white border border-border-subtle flex items-start px-4 py-3 rounded-lg w-full focus-within:ring-2 focus-within:ring-[#0b5cab]">
                        <input id="don-country" name="country" required autoComplete="country-name" className="flex-1 font-['Inter'] font-normal leading-5 text-ink-900 text-sm outline-none bg-transparent w-full" defaultValue="France" />
                      </div>
                    </div>
                  </div>
                </div>
                <label className="bg-[rgba(0,68,132,0.05)] flex gap-3 items-center p-3 rounded-lg w-full cursor-pointer">
                  <input className="peer sr-only" type="checkbox" defaultChecked />
                  <div className="bg-white border border-brand-900 peer-checked:bg-brand-900 flex flex-col items-center justify-center rounded size-5">
                    <div className="relative shrink-0 size-2.5">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheck1} />
                    </div>
                  </div>
                  <p className="flex-1 font-['Inter'] font-semibold min-w-0 text-ink-900 text-[13px]">
                    Je souhaite recevoir mon attestation fiscale certifiée MINAT (PDF) par e-mail
                  </p>
                </label>
              </div>

              {/* Payment Card */}
              <div className="bg-white drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)] flex flex-col gap-6 items-start p-5 rounded-xl w-full sm:p-8">
                <div className="flex gap-3 items-center">
                  <div className="bg-surface-tint flex flex-col items-center justify-center rounded-panel size-7">
                    <p className="font-['Montserrat'] font-bold text-brand-900 text-sm whitespace-nowrap">2</p>
                  </div>
                  <p className="font-['Montserrat'] font-bold text-ink-900 text-lg">
                    Sélectionnez un Canal de Paiement Officiel
                  </p>
                </div>
                <div className="h-0 relative w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine2} />
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-start w-full">
                  <button
                    type="button"
                    aria-pressed={paymentMethod === 'mobile'}
                    onClick={() => setPaymentMethod('mobile')}
                    className={`${paymentMethod === 'mobile' ? 'bg-surface-tint border-brand-900' : 'bg-white border-border-subtle'} border-[1.5px] flex gap-3 items-center p-4 rounded-xl text-left w-full cursor-pointer transition-colors`}
                  >
                    <div className="bg-brand-900 flex flex-col items-start p-2.5 rounded-lg">
                      <div className="relative shrink-0 size-5">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgSmartphone} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5 items-start min-w-0">
                      <p className="font-['Montserrat'] font-bold leading-[18px] text-ink-900 text-sm whitespace-nowrap">
                        Mobile Money (Orange Money / MTN MoMo)
                      </p>
                      <p className="font-['Inter'] font-normal leading-4 text-ink-700 text-[11px]">{`Transfert direct instantané au Cameroun (ONG Children's Smile)`}</p>
                    </div>
                    {paymentMethod === 'mobile' ? (
                      <div className="relative shrink-0 size-5">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIndicator} />
                      </div>
                    ) : (
                      <div className="bg-white border-2 border-border-subtle rounded-card size-5" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-pressed={paymentMethod === 'card'}
                    onClick={() => setPaymentMethod('card')}
                    className={`${paymentMethod === 'card' ? 'bg-surface-tint border-brand-900' : 'bg-white border-border-subtle hover:bg-gray-50'} border-[1.5px] flex gap-3 items-center p-4 rounded-xl text-left w-full cursor-pointer transition-colors`}
                  >
                    <div className="bg-surface-tint flex flex-col items-start p-2.5 rounded-lg">
                      <div className="relative shrink-0 size-5">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCreditCard} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5 items-start min-w-0">
                      <p className="font-['Montserrat'] font-bold leading-[18px] text-ink-900 text-sm whitespace-nowrap">
                        Carte Bancaire (Visa / Mastercard) / Diaspora
                      </p>
                      <p className="font-['Inter'] font-normal leading-4 text-ink-700 text-[11px]">{`Passerelle sécurisée 3D-Secure Europe & International`}</p>
                    </div>
                    {paymentMethod === 'card' ? (
                      <div className="relative shrink-0 size-5">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIndicator} />
                      </div>
                    ) : (
                      <div className="bg-white border-2 border-border-subtle rounded-card size-5" />
                    )}
                  </button>
                  <button
                    type="button"
                    aria-pressed={paymentMethod === 'bank'}
                    onClick={() => setPaymentMethod('bank')}
                    className={`${paymentMethod === 'bank' ? 'bg-surface-tint border-brand-900' : 'bg-white border-border-subtle hover:bg-gray-50'} border-[1.5px] flex gap-3 items-center p-4 rounded-xl text-left w-full cursor-pointer transition-colors`}
                  >
                    <div className="bg-surface-tint flex flex-col items-start p-2.5 rounded-lg">
                      <div className="relative shrink-0 size-5">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGlobe} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-0.5 items-start min-w-0">
                      <p className="font-['Montserrat'] font-bold leading-[18px] text-ink-900 text-sm whitespace-nowrap">{`Virement Bancaire (CEMAC & SWIFT)`}</p>
                      <p className="font-['Inter'] font-normal leading-4 text-ink-700 text-[11px]">{`Compte certifié de l'ONG (RIB / Code IBAN)`}</p>
                    </div>
                    {paymentMethod === 'bank' ? (
                      <div className="relative shrink-0 size-5">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIndicator} />
                      </div>
                    ) : (
                      <div className="bg-white border-2 border-border-subtle rounded-card size-5" />
                    )}
                  </button>
                </div>
                <div className="bg-surface-subtle flex flex-col gap-4 items-start p-5 rounded-lg w-full">
                  <p className="font-['Montserrat'] font-bold text-brand-900 text-[12px] uppercase">
                    LIGNES EXPRESS DÉDIÉES À LA SOLIDARITÉ :
                  </p>
                  <div className="flex flex-col gap-4 items-start w-full sm:flex-row">
                    <div className="bg-white border border-border-subtle flex flex-1 flex-col gap-1 items-start min-w-0 p-3 rounded-lg">
                      <p className="font-['Inter'] font-bold text-warn-700 text-[11px]">ORANGE MONEY CAMEROUN</p>
                      <p className="font-['Montserrat'] font-extrabold text-ink-900 text-base">+237 699 09 86 88</p>
                    </div>
                    <div className="bg-white border border-border-subtle flex flex-1 flex-col gap-1 items-start min-w-0 p-3 rounded-lg">
                      <p className="font-['Inter'] font-bold text-brand-900 text-[11px]">MTN MOBILE MONEY</p>
                      <p className="font-['Montserrat'] font-extrabold text-ink-900 text-base">+237 650 88 11 55</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center w-full">
                    <div className="relative shrink-0 size-3.5">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgInfo} />
                    </div>
                    <p className="flex-1 font-['Inter'] font-normal min-w-0 text-ink-700 text-[12px]">
                      <span>{`Titulaire officiel obligatoire: `}</span>
                      <span className="font-bold">{`ONG CHILDREN'S SMILE`}</span>
                      <span>{`. Veuillez indiquer la mention `}</span>
                      <span className="font-bold">« SOUTIEN »</span>
                      <span>{` en motif.`}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Reassurance Banner */}
              <div className="bg-[#ebf3fc] border border-[#c2ddf6] flex gap-4 items-center p-5 rounded-lg w-full">
                <div className="relative shrink-0 size-8">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShieldAlert} />
                </div>
                <div className="flex flex-1 flex-col gap-1 items-start min-w-0">
                  <p className="font-['Montserrat'] font-bold text-brand-900 text-sm">{`Traçabilité Garantie par Agrément d'État (Loi N° 90/053)`}</p>
                  <p className="font-['Inter'] font-normal text-ink-700 text-[12px] leading-[18px]">
                    <span>{`Enregistrée sous le numéro officiel `}</span>
                    <span className="font-bold">N° 000214/A/MINAT</span>
                    <span>. Toutes les transactions sont auditées trimestriellement par des commissaires CEMAC.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-1 flex-col gap-6 items-start min-w-0 w-full lg:w-auto">
              {/* Summary Card */}
              <div className="bg-white border border-surface-tint drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)] flex flex-col gap-5 items-start p-5 rounded-xl w-full sm:p-6">
                <div className="h-[130px] overflow-clip relative rounded-lg w-full">
                  <div className="absolute h-[130px] left-0 right-0 top-0">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="Écoliers bénéficiaires de la campagne rentrée rurale" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgRectangle} />
                    </div>
                  </div>
                  <div className="absolute bg-gradient-to-t from-[rgba(19,27,46,0.8)] h-[130px] left-0 right-0 to-[rgba(19,27,46,0)] top-0" />
                  <div className="absolute bg-accent-700 flex items-start left-3 px-2 py-1 rounded top-3">
                    <p className="font-['Montserrat'] font-bold text-[10px] text-white whitespace-nowrap">IMPACT DIRECT</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-start w-full">
                  <p className="font-['Inter'] font-semibold text-ink-600 text-[13px]">VOTRE CONTRIBUTION :</p>
                  <div className="flex gap-2 items-baseline text-brand-900">
                    <p className="font-['Montserrat'] font-extrabold text-[32px]">25 000</p>
                    <p className="font-['Montserrat'] font-bold text-base">FCFA</p>
                  </div>
                  <p className="font-['Inter'] font-normal text-ink-600 text-[12px]">
                    ≈ 38 € / $41.00 USD (Sans aucun frais administratif caché)
                  </p>
                </div>
                <div className="h-0 relative w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine3} />
                  </div>
                </div>
                <div className="flex flex-col gap-3 items-start w-full">
                  <p className="font-['Montserrat'] font-bold text-ink-900 text-sm whitespace-nowrap">{`Palier Choisi : Éducation & Dignité (Palier 2)`}</p>
                  <div className="flex gap-2 items-start w-full">
                    <div className="relative shrink-0 size-4 mt-0.5">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheckCircle} />
                    </div>
                    <p className="flex-1 font-['Inter'] font-normal min-w-0 text-ink-700 text-[13px] leading-[18px]">
                      <span className="font-bold">1 Banc-pupitre double :</span>
                      <span>{` en bois massif camerounais confectionné par un artisan local pour asseoir dignement `}</span>
                      <span className="font-bold">2 écoliers</span>
                      <span>{` du village.`}</span>
                    </p>
                  </div>
                  <div className="flex gap-2 items-start w-full">
                    <div className="relative shrink-0 size-4 mt-0.5">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCheckCircle} />
                    </div>
                    <p className="flex-1 font-['Inter'] font-normal min-w-0 text-ink-700 text-[13px] leading-[18px]">
                      <span className="font-bold">Pacte du Franc CFA Utile :</span>
                      <span>{` 88% de votre versement est immédiatement engagé sur l'achat de bois et de quincaillerie terrain.`}</span>
                    </p>
                  </div>
                </div>
                <div className="h-0 relative w-full">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgLine3} />
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start w-full">
                  <div className="flex gap-2 items-center">
                    <div className="relative shrink-0 size-3.5">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShieldCheck} />
                    </div>
                    <p className="font-['Inter'] font-semibold text-accent-700 text-[11px] whitespace-nowrap">Attestation Fiscale officielle incluse</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="relative shrink-0 size-3.5">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgShieldCheck} />
                    </div>
                    <p className="font-['Inter'] font-semibold text-accent-700 text-[11px] whitespace-nowrap">Audit bancaire BEAC régulé</p>
                  </div>
                </div>
                <div className="flex flex-col items-start w-full">
                  <button type="button" className="bg-warn-700 drop-shadow-[0px_4px_7px_rgba(163,57,0,0.35)] flex items-center justify-center rounded-pill w-full cursor-pointer hover:bg-warn-800 transition-colors btn-lg btn">
                    <div className="btn-icon relative shrink-0">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLock} />
                    </div>
                    <p className="btn-label font-['Inter'] font-bold leading-5 text-sm text-white">
                      Valider mon Don de 25 000 FCFA
                    </p>
                  </button>
                </div>
                <div className="flex items-start justify-center w-full">
                  <button type="button" className="font-['Inter'] font-semibold text-ink-600 text-[12px] whitespace-nowrap hover:text-ink-700 transition-colors cursor-pointer">
                    Modifier le montant de ma contribution
                  </button>
                </div>
              </div>
              {/* Secure Logos */}
              <div className="flex gap-4 items-start justify-center w-full">
                <div className="h-5 relative shrink-0 w-10">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCreditCard1} />
                </div>
                <div className="h-5 relative shrink-0 w-10">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgCircleX} />
                </div>
                <div className="h-5 relative shrink-0 w-10">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgWallet} />
                </div>
                <div className="h-5 relative shrink-0 w-10">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgMountain} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
