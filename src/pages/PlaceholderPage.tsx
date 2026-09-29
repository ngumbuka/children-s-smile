import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  description: string;
}

export function PlaceholderPage({ title, subtitle, description }: PlaceholderPageProps) {
  return (
    <div className="bg-surface-subtle flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex flex-col flex-1 w-full">
        <div className="bg-surface-muted flex flex-col items-center px-14 py-20 w-full">
          <div className="flex flex-col gap-4 items-center text-center shell-prose">
            <p className="font-['Montserrat'] font-bold text-brand-900 text-[11px] tracking-[1.1px] uppercase">{subtitle}</p>
            <h1 className="font-['Montserrat'] font-bold text-brand-900 text-[40px] leading-[48px]">{title}</h1>
            <p className="font-['Inter'] font-normal text-ink-700 text-lg leading-7">{description}</p>
            <div className="flex gap-3 items-center mt-4">
              <Link
                to="/nous-soutenir"
                className="bg-warn-700 drop-shadow-[0px_4px_7px_rgba(163,57,0,0.35)] px-8 py-3 rounded-pill hover:bg-warn-800 transition-colors"
              >
                <p className="font-['Inter'] font-bold text-sm text-white">Nous Soutenir</p>
              </Link>
              <Link
                to="/"
                className="bg-surface-tint px-8 py-3 rounded-pill hover:bg-[#d5dcff] transition-colors"
              >
                <p className="font-['Inter'] font-semibold text-brand-900 text-sm">Retour à l'Accueil</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center flex-1 py-20">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="bg-surface-tint flex items-center justify-center rounded-pill size-16">
              <span className="text-brand-900 text-2xl">🚧</span>
            </div>
            <p className="font-['Montserrat'] font-bold text-ink-900 text-lg">Page en cours de construction</p>
            <p className="font-['Inter'] font-normal text-ink-700 text-sm max-w-[400px] leading-5">
              Cette section sera bientôt disponible. En attendant, découvrez comment soutenir notre mission.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
