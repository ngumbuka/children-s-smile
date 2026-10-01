import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Icon } from '../components/Icon';

const assetPathPrefix = '/assets';
const imgFrame = `${assetPathPrefix}/1720c.png`;
const imgFrame8 = `${assetPathPrefix}/85841.png`;
const imgFrame9 = `${assetPathPrefix}/fab16.png`;
const imgFrame10 = `${assetPathPrefix}/22b04.png`;

const imgVector4 = `${assetPathPrefix}/980d9.svg`;
const imgVector5 = `${assetPathPrefix}/82bef.svg`;
const imgVector6 = `${assetPathPrefix}/726e1.svg`;
const imgVector7 = `${assetPathPrefix}/7ba43.svg`;
const imgFrame1 = `${assetPathPrefix}/6f97a.svg`;
const imgVector8 = `${assetPathPrefix}/81c83.svg`;
const imgFrame2 = `${assetPathPrefix}/4d27b.svg`;
const imgVector9 = `${assetPathPrefix}/dc706.svg`;
const imgFrame3 = `${assetPathPrefix}/11864.svg`;
const imgFrame4 = `${assetPathPrefix}/22d98.svg`;
const imgVector10 = `${assetPathPrefix}/2f50c.svg`;
const imgFrame5 = `${assetPathPrefix}/0eec3.svg`;
const imgVector11 = `${assetPathPrefix}/17688.svg`;
const imgVector12 = `${assetPathPrefix}/80a04.svg`;
const imgVector13 = `${assetPathPrefix}/7ec7a.svg`;
const imgFrame6 = `${assetPathPrefix}/5fe9c.svg`;
const imgVector14 = `${assetPathPrefix}/44030.svg`;
const imgFrame7 = `${assetPathPrefix}/f7fbc.svg`;
const imgVector15 = `${assetPathPrefix}/64df0.svg`;
const imgVector16 = `${assetPathPrefix}/3b2a7.svg`;
const imgVector17 = `${assetPathPrefix}/258ec.svg`;
const imgVector18 = `${assetPathPrefix}/562ba.svg`;
const imgVector19 = `${assetPathPrefix}/97ec3.svg`;
const imgVector20 = `${assetPathPrefix}/72309.svg`;
const imgVector21 = `${assetPathPrefix}/f666b.svg`;
const imgVector22 = `${assetPathPrefix}/6d901.svg`;
const imgVector23 = `${assetPathPrefix}/23b92.svg`;
const imgVector26 = `${assetPathPrefix}/e37a2.svg`;
const imgVector27 = `${assetPathPrefix}/001d2.svg`;
const imgVector28 = `${assetPathPrefix}/6a818.svg`;

const DONATION_TIERS = [
  {
    amount: '10 000',
    label: 'Solidarité Directe',
    badge: 'IMPACT IMMÉDIAT',
    badgeColor: 'bg-[rgba(0,68,132,0.1)] text-brand-900',
    icon: imgFrame3,
    iconSize: 'h-[28.29px] w-[22.67px]',
    items: ['1 Kit fournitures scolaires complet (cahiers, stylos, règle)', '5 repas chauds à la cantine solidaire'],
    accentColor: '#004484',
  },
  {
    amount: '25 000',
    label: 'Éducation & Dignité',
    badge: 'PALIER RECOMMANDÉ',
    badgeColor: 'bg-[rgba(0,110,45,0.1)] text-accent-700',
    icon: imgFrame4,
    iconSize: 'h-[24px] w-[24px]',
    items: ['1 Banc-pupitre double en bois massif camerounais', '1 Mois de cantine pour 2 enfants'],
    accentColor: '#006e2d',
    highlighted: true,
  },
  {
    amount: '50 000',
    label: 'Bâtisseur de Classe',
    badge: 'GRAND BIENFAITEUR',
    badgeColor: 'bg-[rgba(163,57,0,0.1)] text-warn-900',
    icon: imgFrame5,
    iconSize: 'h-[24px] w-[24px]',
    items: ['1 Fenêtre ou porte de salle de classe rénovée', '1 Trimestre complet de fournitures pour une classe'],
    accentColor: '#a33900',
  },
  {
    amount: '150 000',
    label: 'Parrain de Génération',
    badge: 'MÉCÈNE',
    badgeColor: 'bg-[rgba(11,92,171,0.1)] text-brand-700',
    icon: imgFrame6,
    iconSize: 'h-[28px] w-[24px]',
    items: ['1 Salle de classe entièrement rénovée (murs, toit, sols)', 'Scolarisation complète de 30 enfants / an'],
    accentColor: '#004484',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Mes dons ouvrent-ils droit à une déduction fiscale ?',
    a: `Oui. Conformément à la législation fiscale camerounaise régissant les œuvres d'intérêt public agréées (Loi N° 90/053), vos dons sont déductibles. Pour les donateurs de France, de Belgique ou du Canada, notre association partenaire relais en Europe émet un reçu fiscal habilité (équivalent CERFA) pour vos déclarations annuelles.`,
  },
  {
    q: 'Comment puis-je être certain que mon transfert Mobile Money est bien arrivé ?',
    a: `Immédiatement après votre paiement, vous recevez un e-mail de confirmation contenant le numéro de référence de la transaction et le montant débité. Cet accusé de réception fait foi et vous est renvoyé sur demande. Si aucun e-mail n'arrive sous 24 heures, contactez notre équipe via la page Contact en indiquant l'heure, le montant et votre numéro de téléphone : nous vérifions la transaction auprès de notre opérateur et vous répondons en moins de 48 heures ouvrées.`,
  },
  {
    q: 'Puis-je flécher mon don vers une école ou une région spécifique ?',
    a: `Oui. Lors de la dernière étape du formulaire de don, un champ « Affectation » vous permet de désigner une école, une région ou un projet précis parmi ceux de notre catalogue. En cas d'impossibilité de realisation du projet choisi, la somme est automatiquement réorientée vers un projet de même nature dans la même région, et vous en êtes informé par e-mail. À défaut de précision de votre part, le don est affecté au besoin le plus urgent identifié par notre équipe terrain.`,
  },
  {
    q: `Comment suivre concrètement l'avancement physique des travaux ?`,
    a: `Chaque projet dispose d'un espace dédié sur notre site, où sont publiés les rapports de chantier datés et photographiés par nos référents régionaux. Après la clôture des travaux, un rapport de réception avec photos avant/après et la liste des bénéficiaires vous est transmis, et les montants correspondants figurent dans nos bilans financiers annuels consultables en ligne. Pour les dons fléchés, un point d'avancement vous est envoyé par e-mail à chaque étape clé.`,
  },
];

export default function NousSoutenir() {
  const [frequency, setFrequency] = useState<'ponctuel' | 'mensuel'>('ponctuel');
  const [selectedTier, setSelectedTier] = useState(1);
  const [customAmount, setCustomAmount] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="nous-soutenir-page bg-surface-subtle flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main id="main-content" className="flex flex-col items-start w-full">

        {/* ── HERO ── */}
        <div className="bg-surface-muted flex flex-col items-start py-12 relative w-full lg:py-10">
          <div className="absolute bg-[rgba(0,68,132,0.05)] blur-[32px] right-[-96px] rounded-pill size-[384px] top-[-96px]" />
          <div className="absolute bg-[rgba(0,110,45,0.05)] blur-[32px] bottom-0 left-[-80px] rounded-pill size-[320px]" />
          <div className="flex flex-col gap-8 items-start relative w-full mx-auto lg:flex-row lg:gap-10 shell">
            {/* Copy */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[560px] lg:shrink-0">
              <div className="flex flex-wrap gap-2 items-center max-w-full">
                <div className="bg-brand-900 flex gap-1.5 items-center justify-center px-3 py-1 rounded-pill">
                  <Icon name="heartPulse" size={12} className="shrink-0" />
                  <p className="font-['Montserrat'] font-bold text-[10px] text-white tracking-[1.1px] uppercase whitespace-nowrap">PLATEFORME OFFICIELLE DE SOLIDARITÉ</p>
                </div>
                <p className="font-['Montserrat'] font-bold text-accent-700 text-[10px] tracking-[0.55px] uppercase whitespace-nowrap">CAMEROUN • 10 RÉGIONS</p>
              </div>
              <h1 className="font-['Montserrat'] font-extrabold text-brand-900 text-4xl leading-[1.12] sm:text-5xl sm:leading-[56px]">
                Chaque Don Redonne un<span className="hidden lg:inline"><br /></span> Sourire et Bâtit une Salle<span className="hidden lg:inline"><br /></span> de Classe au Cameroun
              </h1>
              <p className="font-['Inter'] font-normal text-ink-700 text-lg leading-[29px]">
                {`Chez Children's Smile, votre solidarité n'est pas diluée dans des frais administratifs. Chaque franc CFA mobilisé finance directement du ciment, des tôles, des manuels scolaires, des pompes à eau et du matériel d'urgence pour les enfants des écoles de village.`}
              </p>
              {/* Reassurance badges */}
              <div className="grid grid-cols-2 gap-2 items-stretch w-full sm:grid-cols-4">
                {[
                  { icon: imgVector4, iconSize: 'h-5 w-4', title: 'Traçabilité 100%', sub: 'Rapports photographiques' },
                  { icon: imgVector5, iconSize: 'h-5 w-4', title: 'Reçu Fiscal Agréé', sub: 'Déductibilité légale' },
                  { icon: imgVector6, iconSize: 'h-5 w-4', title: '0 Frais Cachés', sub: 'Circuit direct terrain' },
                  { icon: imgVector7, iconSize: 'h-5 w-4', title: 'Audit CEMAC', sub: 'Comptabilité contrôlée' },
                ].map((b) => (
                  <div key={b.title} className="bg-white drop-shadow-card flex flex-1 flex-col gap-1 items-start min-w-0 p-3 rounded-lg">
                    <div className="relative shrink-0 size-8">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={b.icon} />
                    </div>
                    <p className="font-['Inter'] font-semibold text-ink-900 text-xs">{b.title}</p>
                    <p className="font-['Montserrat'] font-bold text-ink-700 text-[11px]">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Hero visual */}
            <div className="bg-surface-tint flex flex-col items-start overflow-clip relative rounded-xl shadow-hero w-full lg:w-[560px] lg:shrink-0">
              <div className="h-[280px] relative w-full sm:h-[360px] lg:h-[430px]">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={imgFrame} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,68,132,0.6)] to-transparent" />
              </div>
              {/* Progress overlay */}
              <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between">
                  <p className="font-['Montserrat'] font-bold text-white text-sm uppercase tracking-[1px]">Campagne Rentrée Rurale 2025</p>
                  <div className="bg-accent-700 px-2 py-0.5 rounded-pill">
                    <p className="font-['Montserrat'] font-bold text-[10px] text-white">92% ATTEINT</p>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0.2)] h-2.5 rounded-pill overflow-hidden">
                  <div className="bg-accent-700 h-full rounded-pill" style={{ width: '92%' }} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-['Inter'] font-semibold text-brand-100 text-xs">3 420 écoliers équipés</p>
                  <p className="font-['Inter'] font-semibold text-brand-100 text-xs">Objectif : 3 720 enfants</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── DONATION MODULE ── */}
        <div className="flex flex-col items-center py-12 w-full bg-white lg:py-10">
          <div className="flex flex-col gap-6 items-center w-full shell">
            <div className="flex flex-col gap-2 items-center">
              <p className="font-['Montserrat'] font-bold text-brand-900 text-[11px] tracking-[1.1px] uppercase">VOTRE CHOIX DE SOUTIEN</p>
              <h2 className="font-['Montserrat'] font-bold text-brand-900 text-[32px] text-center leading-10">Choisissez Votre Palier de Don</h2>
              <p className="font-['Inter'] font-normal text-ink-700 text-base text-center">Chaque montant a été calibré pour couvrir une unité d'impact terrain précise et traçable.</p>
            </div>
            {/* Frequency toggle */}
            <div className="bg-surface-tint flex gap-1 items-center p-1 rounded-pill">
              <button
                onClick={() => setFrequency('ponctuel')}
                className={`px-6 py-2.5 rounded-pill font-['Inter'] font-semibold text-sm transition-all ${frequency === 'ponctuel' ? 'bg-white text-brand-900 shadow-sm' : 'text-ink-700'}`}
              >
                Don Ponctuel
              </button>
              <button
                onClick={() => setFrequency('mensuel')}
                className={`px-6 py-2.5 rounded-pill font-['Inter'] font-semibold text-sm transition-all ${frequency === 'mensuel' ? 'bg-white text-brand-900 shadow-sm' : 'text-ink-700'}`}
              >
                Soutien Mensuel
              </button>
            </div>
            {/* Tier cards */}
            <div className="flex flex-col gap-4 items-stretch w-full lg:flex-row">
              {DONATION_TIERS.map((tier, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTier(i)}
                  className={`flex flex-col flex-1 gap-3 items-start p-6 rounded-xl text-left transition-all ${selectedTier === i ? 'bg-surface-tint border-2 border-brand-900 shadow-md' : 'bg-white border border-border-subtle hover:border-brand-900 hover:shadow-sm'}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`relative shrink-0 ${tier.iconSize}`}>
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={tier.icon} />
                    </div>
                    <div className={`${tier.badgeColor} px-2 py-0.5 rounded-pill`}>
                      <p className="font-['Montserrat'] font-bold text-[10px] uppercase whitespace-nowrap">{tier.badge}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-['Montserrat'] font-bold text-brand-900 text-2xl">{tier.amount} <span className="text-base">FCFA</span></p>
                    <p className="font-['Inter'] font-semibold text-ink-900 text-sm">{tier.label}</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    {tier.items.map((item, j) => (
                      <div key={j} className="flex gap-2 items-start">
                        <div className="relative shrink-0 size-3.5 mt-0.5">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1} />
                        </div>
                        <p className="font-['Inter'] font-normal text-ink-700 text-xs leading-4">{item}</p>
                      </div>
                    ))}
                  </div>
                  {selectedTier === i && (
                    <div className="flex items-center gap-1.5 w-full">
                      <Icon name="check" size={12} className="shrink-0" />
                      <p className="font-['Inter'] font-semibold text-accent-700 text-xs">Palier sélectionné</p>
                    </div>
                  )}
                </button>
              ))}
            </div>
            {/* Custom amount + CTA */}
            <div className="flex flex-col gap-4 items-stretch w-full sm:flex-row sm:items-end">
              <div className="flex flex-1 flex-col gap-1.5 items-start">
                <label htmlFor="custom-donation-amount" className="font-['Montserrat'] font-bold text-ink-900 text-xs uppercase">Montant Personnalisé (FCFA)</label>
                <div className="bg-white border border-border-subtle flex items-center gap-3 px-4 py-3 rounded-lg w-full">
                  <div className="relative shrink-0 size-4">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame2} />
                  </div>
                  <input
                    id="custom-donation-amount"
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Saisir un montant libre..."
                    className="flex-1 font-['Inter'] font-normal text-ink-700 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>
              <Link
                to="/don"
                className="bg-warn-700 drop-shadow-[0px_4px_7px_rgba(163,57,0,0.35)] flex items-center justify-center rounded-pill w-full hover:bg-warn-800 transition-colors sm:w-auto btn-md btn"
              >
                <Icon name="lock" size={16} className="shrink-0" />
                <p className="btn-label font-['Inter'] font-bold text-sm text-white">Finaliser ce Don</p>
              </Link>
            </div>
            {/* Trust row */}
            <div className="flex flex-wrap gap-4 items-center justify-center">
              {[
                { icon: imgFrame3, text: 'Transaction certifiée BEAC' },
                { icon: imgFrame4, text: 'Reçu fiscal PDF sous 24h' },
                { icon: imgFrame5, text: 'Rapport photo du chantier' },
              ].map((item) => (
                <div key={item.text} className="flex gap-2 items-center">
                  <div className="btn-icon relative shrink-0">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={item.icon} />
                  </div>
                  <p className="font-['Inter'] font-semibold text-ink-700 text-xs">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PAYMENT CHANNELS ── */}
        <div className="bg-surface-muted flex flex-col gap-6 items-center gutter py-12 w-full lg:py-10">
          <div className="flex flex-col gap-2 items-center w-full shell-prose">
            <p className="font-['Montserrat'] font-bold text-brand-900 text-[11px] tracking-[1.1px] uppercase text-center">CANAUX OFFICIELS DE PAIEMENT</p>
            <h2 className="font-['Montserrat'] font-bold text-brand-900 text-[32px] text-center leading-10">Trois Façons Sécurisées de Donner</h2>
            <p className="font-['Inter'] font-normal text-ink-700 text-base text-center">Chaque canal est certifié par les autorités compétentes et branché directement sur les comptes vérifiés de l'ONG.</p>
          </div>
          <div className="flex flex-col gap-6 items-stretch justify-center w-full lg:flex-row lg:items-start shell-content">
            {/* Mobile Money */}
            <div className="bg-white drop-shadow-card flex flex-col items-start justify-between p-8 rounded-xl w-[373px] shrink-0">
              <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="flex gap-3 items-center">
                    <Icon name="smartphone" size={20} className="shrink-0" />
                    <Icon name="whatsapp" size={20} className="shrink-0" />
                  </div>
                  <div className="bg-[rgba(0,110,45,0.15)] px-3 py-1 rounded-pill">
                    <p className="font-['Montserrat'] font-bold text-accent-700 text-[10px] uppercase whitespace-nowrap">CAMEROUN LOCAL</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="font-['Montserrat'] font-bold text-brand-900 text-xl">Mobile Money Officiel</h3>
                  <p className="font-['Inter'] font-normal text-ink-700 text-sm leading-5">Transfert instantané vers les numéros certifiés de l'ONG, opérationnels 7j/7.</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <div className="bg-[#fff7f0] border border-[rgba(163,57,0,0.2)] flex items-center justify-between p-4 rounded-lg">
                    <div className="flex gap-3 items-center">
                      <Icon name="wallet" size={12} className="shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <p className="font-['Montserrat'] font-bold text-warn-700 text-xs">ORANGE MONEY</p>
                        <p className="font-['Cousine'] font-bold text-ink-900 text-sm">+237 699 09 86 88</p>
                      </div>
                    </div>
                    <div className="bg-warn-700 px-2 py-0.5 rounded-pill">
                      <p className="font-['Montserrat'] font-bold text-[10px] text-white uppercase">OFFICIEL</p>
                    </div>
                  </div>
                  <div className="bg-[#f0f6ff] border border-[rgba(0,68,132,0.2)] flex items-center justify-between p-4 rounded-lg">
                    <div className="flex gap-3 items-center">
                      <Icon name="smartphone" size={12} className="shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <p className="font-['Montserrat'] font-bold text-brand-900 text-xs">MTN MOBILE MONEY</p>
                        <p className="font-['Cousine'] font-bold text-ink-900 text-sm">+237 650 88 11 55</p>
                      </div>
                    </div>
                    <div className="bg-brand-900 px-2 py-0.5 rounded-pill">
                      <p className="font-['Montserrat'] font-bold text-[10px] text-white uppercase">OFFICIEL</p>
                    </div>
                  </div>
                  <div className="bg-surface-tint flex gap-2 items-center p-3 rounded-lg">
                    <div className="relative shrink-0 size-3.5">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame6} />
                    </div>
                    <p className="font-['Inter'] font-normal text-ink-700 text-xs">Mention obligatoire : <span className="font-bold">« SOUTIEN »</span> en motif du transfert</p>
                  </div>
                </div>
              </div>
              <div className="pt-6 w-full">
                <button className="bg-accent-700 flex gap-2 items-center justify-center py-2.5 rounded-lg w-full hover:bg-[#005a24] transition-colors">
                  <Icon name="heartPulse" size={12} className="shrink-0" />
                  <p className="font-['Inter'] font-bold text-sm text-white">Copier les Numéros Certifiés</p>
                </button>
              </div>
            </div>

            {/* Virement Bancaire */}
            <div className="bg-white drop-shadow-card flex flex-col items-start justify-between p-8 rounded-xl w-[373px] shrink-0">
              <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="relative shrink-0 h-8 w-14">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame7} />
                  </div>
                  <div className="bg-[rgba(0,68,132,0.15)] px-3 py-1 rounded-pill">
                    <p className="font-['Montserrat'] font-bold text-brand-900 text-[10px] uppercase whitespace-nowrap">CEMAC & SWIFT</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="font-['Montserrat'] font-bold text-brand-900 text-xl">Virement Bancaire Officiel</h3>
                  <p className="font-['Inter'] font-normal text-ink-700 text-sm leading-5">Compte bancaire certifié pour particuliers, entreprises citoyennes et mécènes.</p>
                </div>
                <div className="bg-surface-muted flex flex-col gap-2 items-start p-4 rounded-lg w-full">
                  {[
                    { label: 'Titulaire :', value: `CHILDREN'S SMILE CAMEROUN`, bold: true, mono: false },
                    { label: 'Banque :', value: 'UBA / AFRILAND FIRST BANK', bold: false, mono: true },
                    { label: 'Code Banque :', value: '10033', bold: false, mono: true },
                    { label: 'Code Guichet :', value: '05210', bold: false, mono: true },
                    { label: 'N° Compte :', value: '01245893012', bold: false, mono: true },
                    { label: 'Clé RIB :', value: '44', bold: false, mono: true },
                    { label: 'BIC / SWIFT :', value: 'UBAFCMCXXX', bold: false, mono: true },
                  ].map((row) => (
                    <div key={row.label} className="flex items-start justify-between pb-1 w-full border-b border-[rgba(0,0,0,0.05)] last:border-0">
                      <p className="font-['Inter'] font-normal text-ink-700 text-xs">{row.label}</p>
                      <p className={`${row.bold ? "font-['Inter'] font-bold" : row.mono ? "font-['Cousine'] font-normal" : "font-['Inter'] font-normal"} text-ink-900 text-xs`}>{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 w-full">
                <button className="bg-surface-tint flex gap-2 items-center justify-center py-2.5 rounded-lg w-full hover:bg-[#d5dcff] transition-colors">
                  <Icon name="copy" size={12} className="shrink-0" />
                  <p className="font-['Inter'] font-bold text-brand-900 text-sm">Copier les coordonnées RIB complètes</p>
                </button>
              </div>
            </div>

            {/* Diaspora */}
            <div className="bg-white drop-shadow-card flex flex-col items-start justify-between p-8 rounded-xl w-[373px] shrink-0">
              <div className="flex flex-col gap-4 items-start w-full">
                <div className="flex items-center justify-between w-full">
                  <div className="relative shrink-0 h-12 w-12">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame7} />
                  </div>
                  <div className="bg-[rgba(163,57,0,0.15)] px-3 py-1 rounded-pill">
                    <p className="font-['Montserrat'] font-bold text-warn-900 text-[10px] uppercase whitespace-nowrap">{`DIASPORA & MONDE`}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <h3 className="font-['Montserrat'] font-bold text-brand-900 text-xl">{`Soutien depuis l'Étranger`}</h3>
                  <p className="font-['Inter'] font-normal text-ink-700 text-sm leading-5">{`Europe, Amérique du Nord, Golfe et Afrique de l'Ouest : soutenez sans frais confiscatoires.`}</p>
                </div>
                <div className="flex flex-col gap-3 w-full">
                  {[
                    { icon: imgVector15, title: 'Virement SEPA direct', desc: `Dépôt direct sur notre antenne relais européenne pour éliminer les frais de change abusifs.` },
                    { icon: imgVector16, title: `Cartes Visa & Mastercard`, desc: `Passerelle sécurisée 3D-Secure avec attestation fiscale envoyée en PDF sous 48h.` },
                    { icon: imgVector17, title: 'Remitly / TapTap Send', desc: `Transfert direct vers les numéros Orange et MTN officiels certifiés de l'ONG.` },
                  ].map((opt) => (
                    <div key={opt.title} className="bg-surface-muted flex gap-3 items-start p-3 rounded-lg">
                      <div className="relative shrink-0 size-4 mt-0.5">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={opt.icon} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-['Inter'] font-semibold text-ink-900 text-sm">{opt.title}</p>
                        <p className="font-['Inter'] font-normal text-ink-700 text-xs leading-4">{opt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 w-full">
                <button className="bg-brand-900 drop-shadow-card flex gap-2 items-center justify-center py-2.5 rounded-lg w-full hover:bg-[#003570] transition-colors">
                  <Icon name="globe" size={16} className="shrink-0" />
                  <p className="font-['Inter'] font-bold text-sm text-white">Demander les Identifiants Diaspora</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── ENGAGEMENT MODES ── */}
        <div className="flex flex-col gap-6 items-center gutter py-12 w-full lg:py-10">
          <div className="flex flex-col gap-2 items-center w-full shell-prose">
            <p className="font-['Montserrat'] font-bold text-brand-900 text-[11px] tracking-[1.1px] uppercase text-center">AU-DELÀ DU DON FINANCIER</p>
            <h2 className="font-['Montserrat'] font-bold text-brand-900 text-[32px] text-center leading-10">{`Trois Autres Façons Fortes d'Agir`}</h2>
            <p className="font-['Inter'] font-normal text-ink-700 text-base text-center">{`L'épanouissement scolaire des enfants du Cameroun s'appuie aussi sur vos compétences, votre logistique et vos réseaux professionnels.`}</p>
          </div>
          <div className="flex flex-col gap-6 items-stretch justify-center w-full lg:flex-row lg:items-start shell-content">
            {[
              {
                img: imgFrame8,
                badge: `LOGISTIQUE & MATÉRIEL`,
                badgeStyle: 'bg-surface-tint text-brand-900',
                title: `Matériel Didactique & Livres`,
                desc: `Acheminez vos conteneurs de romans jeunesse, manuels scientifiques, mobilier scolaire en état et ordinateurs reconditionnés à nos entrepôts de Yaoundé et Douala.`,
                cta: `Guide d'envoi en fret`,
                ctaColor: 'text-accent-700',
                icon: imgVector19,
              },
              {
                img: imgFrame9,
                badge: `FONDATIONS & ENTREPRISES`,
                badgeStyle: 'bg-[rgba(0,110,45,0.15)] text-accent-700',
                title: 'Parrainer une École Complète',
                desc: `Associez le nom de votre société, association ou amicale à la transformation intégrale d'un établissement : 3 classes remises à neuf, forage solaire et latrines écologiques.`,
                cta: 'Dossier de Mécénat RSE',
                ctaColor: 'text-brand-900',
                icon: imgVector20,
              },
              {
                img: imgFrame10,
                badge: 'CAPITAL HUMAIN',
                badgeStyle: 'bg-[rgba(163,57,0,0.15)] text-warn-900',
                title: `Bénévolat & Missions Terrain`,
                desc: `Médecins, pédagogues formateurs d'enseignants, architectes de brousse, spécialistes en forage hydraulique : mettez votre savoir-faire au service direct de nos missions annuelles.`,
                cta: 'Rejoindre la Réserve',
                ctaColor: 'text-warn-900',
                icon: imgVector21,
              },
            ].map((card) => (
              <div key={card.title} className="bg-white flex flex-col gap-4 items-start overflow-clip p-6 rounded-xl shadow-float w-[373px] shrink-0">
                <div className="bg-surface-tint h-44 overflow-clip relative rounded-lg w-full">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img alt="" className="absolute left-0 max-w-none size-full top-0 object-cover" src={card.img} />
                  </div>
                </div>
                <div className={`${card.badgeStyle} px-2 py-0.5 rounded-pill`}>
                  <p className="font-['Montserrat'] font-bold text-[10px] uppercase">{card.badge}</p>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-brand-900 text-lg">{card.title}</h3>
                <p className="font-['Inter'] font-normal text-ink-700 text-sm leading-[22px]">{card.desc}</p>
                <div className="flex items-center gap-1">
                  <p className={`font-['Inter'] font-bold ${card.ctaColor} text-xs`}>{card.cta}</p>
                  <div className="relative shrink-0 size-[10.67px]">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={card.icon} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── TRANSPARENCY PACT ── */}
        <div className="bg-surface-tint py-12 w-full lg:py-10">
          {/* The band owns the background; .shell owns the container. */}
          <div className="flex flex-col gap-8 items-start lg:flex-row lg:gap-10 shell">
            {/* Left: budget breakdown */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[560px] lg:shrink-0">
              <p className="font-['Montserrat'] font-bold text-brand-900 text-[11px] tracking-[1.1px] uppercase">{`RIGUEUR & DÉONTOLOGIE`}</p>
              <h2 className="font-['Montserrat'] font-bold text-brand-900 text-[32px] leading-10">Le Pacte du « Franc CFA Utile »</h2>
              <p className="font-['Inter'] font-normal text-ink-700 text-base leading-[26px]">
                Pour chaque tranche de 10 000 FCFA reçue, 8 800 FCFA sont directement transformés en briques de ciment, toitures, cahiers scolaires et armoires médicales. Voici la preuve mathématique de notre efficience :
              </p>
              <div className="flex flex-col gap-4 items-start w-full">
                {[
                  { color: '#006e2d', label: `Directement affecté aux Chantiers & Écoliers`, pct: '88 %', bar: '88%', desc: `Ciment, tôles, pupitres, manuels, kits d'hygiène et forages` },
                  { color: '#004484', label: `Logistique Terrain & Contrôles Qualité`, pct: '8 %', bar: '8%', desc: 'Acheminement 4x4 vers les zones enclavées, audits techniques' },
                  { color: '#5d626e', label: 'Frais Administratifs Statutaires Stricts', pct: '4 %', bar: '4%', desc: 'Tenue légale des registres, audit ministériel et télécoms' },
                ].map((row) => (
                  <div key={row.label} className="flex flex-col gap-1 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 items-center">
                        <div className="rounded-pill shrink-0 size-3" style={{ backgroundColor: row.color }} />
                        <p className="font-['Inter'] font-bold text-xs whitespace-nowrap" style={{ color: row.color }}>{row.label}</p>
                      </div>
                      <p className="font-['Inter'] font-extrabold text-sm" style={{ color: row.color }}>{row.pct}</p>
                    </div>
                    <div className="bg-[#e2e7ff] h-3 overflow-clip rounded-pill w-full">
                      <div className="h-full rounded-pill" style={{ width: row.bar, backgroundColor: row.color }} />
                    </div>
                    <p className="font-['Inter'] font-normal text-ink-700 text-xs">{row.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Right: testimonial + certification */}
            <div className="flex flex-col gap-4 items-start flex-1 min-w-0">
              <div className="bg-white flex flex-col gap-4 items-start p-8 rounded-xl w-full">
                <div className="flex gap-3 items-center">
                  <div className="bg-[rgba(0,68,132,0.1)] flex items-center justify-center rounded-pill size-12">
                    <p className="font-['Montserrat'] font-bold text-brand-900 text-base">EK</p>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="font-['Montserrat'] font-bold text-ink-900 text-lg">Dr. Emmanuel Kamga</p>
                    <p className="font-['Montserrat'] font-bold text-accent-700 text-[10px] uppercase">{`DONATEUR MENSUEL • PARIS & BAFOUSSAM`}</p>
                  </div>
                </div>
                <p className="font-['Inter'] italic font-normal text-ink-900 text-base leading-[26px]">
                  {`« En tant que membre de la diaspora, on a souvent peur que l'argent envoyé ne finisse dans les poches d'intermédiaires. Avec Children's Smile, j'ai reçu par WhatsApp les photos du déchargement des tôles d'aluminium pour l'école de mon village maternel à l'Ouest. Le niveau de transparence et de propreté financière est exemplaire pour une ONG en Afrique. »`}
                </p>
                <div className="flex items-center justify-between pt-4 w-full border-t border-border-subtle">
                  <div className="flex gap-1 items-center">
                    <Icon name="award" size={12} className="shrink-0" />
                    <p className="font-['Inter'] font-normal text-ink-700 text-xs">Donateur certifié depuis 3 ans</p>
                  </div>
                  <p className="font-['Cousine'] font-normal text-ink-700 text-xs">Contribution : 50 000 FCFA/mois</p>
                </div>
              </div>
              <div className="bg-white drop-shadow-card flex gap-3 items-center p-4 rounded-lg w-full">
                <Icon name="scrollText" size={24} className="shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <p className="font-['Inter'] font-bold text-ink-900 text-xs">Agrément MINAT N° 000214/A/MINAT/SG/DAP/SDLP/SAC</p>
                  <p className="font-['Inter'] font-normal text-ink-700 text-xs leading-4">Comptabilité certifiée soumise annuellement à la Direction des Affaires Politiques du Cameroun.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="flex flex-col gap-6 items-center gutter py-12 w-full lg:py-10">
          <div className="flex flex-col gap-2 items-center w-full shell-prose">
            <p className="font-['Montserrat'] font-bold text-brand-900 text-[11px] tracking-[1.1px] uppercase text-center">QUESTIONS FRÉQUENTES</p>
            <h2 className="font-['Montserrat'] font-bold text-brand-900 text-[32px] text-center leading-10">Tout ce que Vous Devez Savoir sur Vos Dons</h2>
            <p className="font-['Inter'] font-normal text-ink-700 text-base text-center">Une réponse claire et transparente à chaque interrogation légitime des bienfaiteurs.</p>
          </div>
          <div className="flex flex-col gap-3 items-start w-full shell-narrow">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="bg-white flex flex-col items-start overflow-clip rounded-xl shadow-raised w-full"
                >
                  <h3 className="w-full m-0">
                    <button
                      type="button"
                      aria-controls={`faq-panel-${i}`}
                      aria-expanded={isOpen}
                      id={`faq-tab-${i}`}
                      onClick={() => setOpenFaq(isOpen ? -1 : i)}
                      className="flex cursor-pointer items-start justify-between gap-4 p-5 w-full text-left rounded-xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#004484] hover:bg-[#f7f8ff]"
                    >
                      <span className="font-['Montserrat'] font-bold text-brand-900 text-[17px] leading-[26px] sm:text-lg">
                        {item.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`flex shrink-0 items-center justify-center text-brand-900 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        <Icon name="chevronDown" size={20} />
                      </span>
                    </button>
                  </h3>
                  <div
                    aria-labelledby={`faq-tab-${i}`}
                    className={`grid w-full transition-[grid-template-rows] duration-200 ease-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                    id={`faq-panel-${i}`}
                    role="region"
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5">
                        <p className="font-['Inter'] m-0 text-ink-700 text-sm leading-[22px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── FINAL CTA BANDEAU ── */}
        <div className="bg-brand-900 flex flex-col items-center gutter py-12 w-full lg:py-10">
          <div className="flex flex-col gap-4 items-center w-full shell-prose">
            <Icon name="handHeart" size={12} className="shrink-0" />
            <h2 className="font-['Montserrat'] font-bold text-white text-[32px] text-center leading-10">
              Un Enfant au Cameroun Attend Votre Coup de Pouce
            </h2>
            <p className="font-['Inter'] font-normal text-brand-100 text-base text-center leading-[26px]">
              {`Votre solidarité est le moteur de notre indépendance. Rejoignez les centaines de bienfaiteurs qui bâtissent, chaque mois, l'avenir éducatif de notre pays.`}
            </p>
            <div className="flex flex-col gap-3 items-stretch pt-2 w-full sm:flex-row sm:items-center sm:justify-center sm:w-auto">
              <Link
                to="/don"
                className="bg-warn-700 flex items-center justify-center rounded-pill hover:bg-warn-800 transition-colors btn-md btn"
              >
                <Icon name="handHeart" size={16} className="shrink-0" />
                <p className="btn-label font-['Inter'] font-bold text-sm text-white">Envoyer un Don Maintenant</p>
              </Link>
              <a
                href="tel:+237699098688"
                className="bg-brand-700 flex items-center justify-center rounded-pill hover:bg-[#094e97] transition-colors btn-md btn"
              >
                <Icon name="phone" size={16} className="shrink-0" />
                <p className="btn-label font-['Inter'] font-semibold text-sm text-white">Parler à un Responsable (+237 699 09 86 88)</p>
              </a>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
