import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LocationExperience from "@/components/LocationExperience";

export const metadata: Metadata = {
  title: "Localização | Fanezze Uniformes",
  description: "Encontre a Fanezze Uniformes em Joinville, Santa Catarina.",
};

export default function LocalizacaoPage() {
  return <main className="locationPage">
    <header className="quoteHeader"><Link href="/" aria-label="Voltar para a página inicial"><Image src="/images/logo-fanezze.png" alt="Fanezze Uniformes" width={210} height={50} priority/></Link><Link href="/">← Voltar ao site</Link></header>
    <section className="locationHero"><p className="eyebrow">Nossa localização</p><h1>Mais perto para criar<br/><em>algo inesquecível.</em></h1><p>Visite nossa loja em Joinville e descubra soluções feitas para representar a sua marca.</p></section>
    <LocationExperience/>
  </main>;
}
