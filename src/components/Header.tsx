import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from './Icon';

const assetPathPrefix = '/assets';
const imgLogo = `${assetPathPrefix}/1fe61.png`;

const imgPhone = `${assetPathPrefix}/16689.svg`;
const imgMapPin = `${assetPathPrefix}/5abb2.svg`;

const navItems = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Nos actions', to: '/nos-actions' },
  { label: 'Nos projets', to: '/nos-projets' },
  { label: 'Notre impact', to: '/notre-impact' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Nous soutenir', to: '/nous-soutenir' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="backdrop-blur-[6px] bg-[rgba(250,248,255,0.95)] flex flex-col items-start shadow-[0px_1px_8px_0px_rgba(11,92,171,0.08)] w-full sticky top-0 z-50">
      <a
        href="#main-content"
        className="absolute bg-white font-['Inter'] font-bold left-4 px-4 py-3 rounded-lg text-[#004484] -translate-y-20 focus:translate-y-2 transition-transform z-[60]"
      >
        Aller au contenu principal
      </a>
      <div className="bg-[#004484] hidden items-center justify-between max-w-[1280px] mx-auto px-4 py-3 sm:px-8 lg:px-14 w-full xl:flex">
        <div className="flex gap-4 items-center">
          <div className="bg-[#0b5cab] flex gap-1 items-center px-2 py-0.5 rounded-full">
            <Icon name="shieldCheck" size={12.83} className="shrink-0" />
            <p className="font-['Montserrat'] font-bold text-[#bfd6ff] text-[10px] tracking-[0.55px] uppercase whitespace-nowrap">
              ONG AGRÉÉE RÉPUBLIQUE DU CAMEROUN - 10 RÉGIONS
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <Icon name="phone" size={10.5} className="shrink-0" />
            <p className="font-['Inter'] font-semibold text-[#d5e3ff] text-[11px] whitespace-nowrap">
              +237 699 09 86 88 / 650 88 11 55
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <Icon name="mapPin" size={11.67} className="shrink-0" />
            <p className="font-['Inter'] font-semibold text-[#d5e3ff] text-[11px] whitespace-nowrap">
              Yaoundé • Douala • Grand-Nord • Est
            </p>
          </div>
          <div className="bg-[#006e2d] flex flex-col items-start px-2 py-0.5 rounded-full">
            <p className="font-['Montserrat'] font-bold text-[10px] text-white whitespace-nowrap">{`Orange & MTN MoMo OK`}</p>
          </div>
        </div>
      </div>
      <div className="flex min-h-20 items-center justify-between gap-4 max-w-[1280px] mx-auto px-4 py-3 w-full sm:px-8 lg:px-14">
        <Link to="/" className="flex gap-3 items-center">
          <div className="relative rounded-full shrink-0 size-8">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-full">
              <img alt="Children's Smile Cameroun" className="absolute left-0 max-w-none size-full top-0" src={imgLogo} />
            </div>
          </div>
          <div className="hidden flex-col font-['Montserrat'] font-bold items-start min-[420px]:flex">
            <p className="leading-[25px] text-[#004484] text-xl tracking-[-0.5px]">{`Children's Smile`}</p>
            <p className="leading-4 text-[#424751] text-[11px] tracking-[1.1px] uppercase">{`CAMEROUN • ENFANCE & AVENIR`}</p>
          </div>
        </Link>
        <nav className="hidden gap-1 items-center xl:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-start px-3 py-2 rounded-lg ${isActive ? 'bg-[#eaedff]' : ''}`}
              >
                <p className={`font-['Inter'] ${isActive ? 'font-bold text-[#004484]' : 'font-semibold text-[#424751]'} leading-5 text-sm whitespace-nowrap`}>
                  {item.label}
                </p>
              </Link>
            );
          })}
        </nav>
        <div className="flex gap-2 items-center sm:gap-3">
          <Link to="/contact" className="bg-[#006e2d] hidden flex-col items-start justify-center px-4 py-2.5 rounded-full hover:bg-[#005a24] transition-colors 2xl:flex">
            <p className="font-['Inter'] font-semibold leading-5 text-sm text-white whitespace-nowrap">Devenir Partenaire</p>
          </Link>
          <Link
            to="/nous-soutenir"
            className="bg-[#a33900] drop-shadow-[0px_4px_7px_rgba(163,57,0,0.35)] hidden flex-col items-start justify-center px-5 py-2.5 rounded-full hover:bg-[#8c3000] transition-colors sm:flex"
          >
            <p className="font-['Inter'] font-semibold leading-5 text-sm text-white whitespace-nowrap">Nous Soutenir</p>
          </Link>
          <button
            type="button"
            aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="border border-[#c2c6d3] flex flex-col gap-1.5 items-center justify-center rounded-lg size-11 xl:hidden"
          >
            <span className={`bg-[#004484] h-0.5 rounded-full transition-transform w-5 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`bg-[#004484] h-0.5 rounded-full transition-opacity w-5 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`bg-[#004484] h-0.5 rounded-full transition-transform w-5 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="bg-white border-t border-[#eaedff] grid gap-1 max-w-[1280px] mx-auto px-4 py-4 w-full sm:grid-cols-2 sm:px-8 xl:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.to || (item.to !== '/' && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={`font-['Inter'] font-semibold px-4 py-3 rounded-lg text-sm ${isActive ? 'bg-[#eaedff] text-[#004484]' : 'text-[#424751] hover:bg-[#f2f3ff]'}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="bg-[#006e2d] flex justify-center mt-2 px-4 py-3 rounded-full sm:hidden"
          >
            <p className="font-['Inter'] font-bold text-sm text-white">Devenir partenaire</p>
          </Link>
          <Link
            to="/nous-soutenir"
            onClick={() => setIsMenuOpen(false)}
            className="bg-[#a33900] flex justify-center mt-2 px-4 py-3 rounded-full sm:hidden"
          >
            <p className="font-['Inter'] font-bold text-sm text-white">Nous soutenir</p>
          </Link>
        </nav>
      )}
    </div>
  );
}
