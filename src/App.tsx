import { HashRouter, Routes, Route } from "react-router-dom"
import Accueil from "./pages/Accueil"
import NousSoutenir from "./pages/NousSoutenir"
import FormulaireDon from "./pages/FormulaireDon"
import APropos from "./pages/APropos"
import Contact from "./pages/Contact"
import NosActions from "./pages/NosActions"
import NosProjets from "./pages/NosProjets"
import NotreImpact from "./pages/NotreImpact"
import Actualites from "./pages/Actualites"
import ProjetDetail from "./pages/ProjetDetail"
import ArticleDetail from "./pages/ArticleDetail"

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/nous-soutenir" element={<NousSoutenir />} />
        <Route path="/don" element={<FormulaireDon />} />
        <Route path="/a-propos" element={<APropos />} />
        <Route path="/nos-actions" element={<NosActions />} />
        <Route path="/nos-projets" element={<NosProjets />} />
        <Route path="/nos-projets/:slug" element={<ProjetDetail />} />
        <Route path="/notre-impact" element={<NotreImpact />} />
        <Route path="/actualites" element={<Actualites />} />
        <Route path="/actualites/:slug" element={<ArticleDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  )
}
