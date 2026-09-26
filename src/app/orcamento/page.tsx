import type { Metadata } from "next";
import Image from "next/image";
import QuoteSimulator from "@/components/QuoteSimulator";

export const metadata: Metadata = {
  title: "Simule seu orçamento | Fanezze Uniformes",
  description: "Monte uma estimativa personalizada para os uniformes da sua equipe.",
};

export default function OrcamentoPage() {
  return <main className="quotePage">
    <header className="quoteHeader"><a href="/" aria-label="Voltar para a página inicial"><Image src="/images/logo-fanezze.png" alt="Fanezze Uniformes" width={210} height={50} priority/></a><a href="/">← Voltar ao site</a></header>
    <section className="quoteHero"><p className="eyebrow">Orçamento inteligente</p><h1>Monte seu uniforme.<br/><em>Descubra a estimativa.</em></h1><p>Configure seu pedido em poucos passos e envie tudo pronto para o WhatsApp.</p></section>
    <QuoteSimulator/>
  </main>;
}
