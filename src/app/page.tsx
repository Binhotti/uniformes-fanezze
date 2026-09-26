import Image from "next/image";
import ExpandableCategoryGallery from "@/components/ExpandableCategoryGallery";
import FloatingContactButton from "@/components/FloatingContactButton";

function ArrowUpRight({ size = 18 }: { size?: number }) {
  return <svg className="actionIcon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function ArrowDown({ size = 18 }: { size?: number }) {
  return <svg className="actionIcon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function ArrowUp({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

const whatsappUrl = "https://wa.me/554734265137?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento";

const categories = [
  { title: "Corporativo", text: "Alfaiataria e peças sociais que traduzem confiança.", image: "/images/corporativo-premium.png" },
  { title: "Operacional", text: "Resistência, mobilidade e segurança para cada jornada.", image: "/images/operacional-premium.png" },
  { title: "Saúde & Serviços", text: "Conforto técnico com uma apresentação impecável.", image: "/images/saude-premium.png" },
];

const featuredUniforms = [
  { brand: "Ipiranga", type: "Polo operacional", image: "/images/3d-ipiranga.png", tone: "blue" },
  { brand: "McDonald’s", type: "Camiseta corporativa", image: "/images/3d-mcdonalds.png", tone: "black" },
  { brand: "Hotel Tannenhof", type: "Camisa de atendimento", image: "/images/3d-tannenhof.png", tone: "cream" },
];

const clients = ["300 Franchising", "Hotel Tannenhof", "Choco Leite", "Kunz", "Jurerê", "Radial", "Selbetti", "Ipiranga", "McDonald’s", "Nidec"];

export default function Home() {
  return (
    <main>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Fanezze Uniformes">
          <Image src="/images/logo-fanezze.png" alt="Fanezze Uniformes" width={250} height={60} priority />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#colecoes">Coleções</a><a href="#diferenciais">Diferenciais</a><a href="#clientes">Clientes</a><a href="/localizacao">Localização</a><a href="/orcamento">Orçamento</a>
        </nav>
        <a className="headerCta" href="/orcamento">Solicitar orçamento <span className="iconSlot"><ArrowUpRight size={16}/></span></a>
      </header>

      <section className="hero" id="inicio">
        <video autoPlay muted loop playsInline preload="auto">
          <source src="/media/fanezzi.mp4" type="video/mp4" />
        </video>
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow">Uniformes que representam</p>
          <h1>Vista sua marca.<br/><em>Marque presença.</em></h1>
          <p className="heroText">Projetamos uniformes com estética, conforto e propósito para transformar equipes em uma expressão autêntica da sua empresa.</p>
          <div className="heroActions"><a className="button gold" href={whatsappUrl} target="_blank" rel="noreferrer">Criar meu uniforme <span className="iconSlot"><ArrowUpRight/></span></a><a className="textLink" href="#colecoes">Conheça nossas linhas <span className="iconSlot"><ArrowDown size={16}/></span></a></div>
        </div>
        <div className="heroCounter"><strong>25+</strong><span>anos vestindo<br/>grandes histórias</span></div>
      </section>

      <section className="intro section" id="diferenciais">
        <div><p className="eyebrow dark">Excelência em cada detalhe</p><h2>Mais que uniformes.<br/><em>Identidade em forma.</em></h2></div>
        <div className="introCopy"><p>Do primeiro traço ao último acabamento, cada projeto nasce para valorizar pessoas e fortalecer marcas.</p><div className="stats"><span><strong>100%</strong>personalizado</span><span><strong>+500</strong>marcas atendidas</span></div></div>
      </section>

      <section className="collections section" id="colecoes">
        <div className="sectionTop"><p className="eyebrow">Linhas Fanezze</p><h2>Para cada equipe,<br/><em>uma presença única.</em></h2></div>
        <ExpandableCategoryGallery categories={categories}/>
      </section>

      <section className="uniformShowcase section" aria-labelledby="uniform-showcase-title">
        <div className="showcaseHeading"><div><p className="eyebrow">Projetos em destaque</p><h2 id="uniform-showcase-title">Uniformes que ganham<br/><em>forma e presença.</em></h2></div><p>Visualize cada peça antes da produção. Modelagem, tecido e identidade trabalhando juntos em todos os ângulos.</p></div>
        <div className="uniformStage">
          {featuredUniforms.map((uniform, index) => <article className={`uniformModel ${uniform.tone}`} key={uniform.brand} style={{ "--float-delay": `${index * -1.4}s` } as React.CSSProperties}>
            <span className="modelNumber">0{index + 1}</span>
            <div className="modelGlow"/>
            <Image src={uniform.image} alt={`${uniform.type} criada para ${uniform.brand}`} width={1000} height={1300} sizes="(max-width: 900px) 88vw, 32vw" />
            <div className="modelShadow"/>
            <div className="modelMeta"><span>{uniform.type}</span><strong>{uniform.brand}</strong></div>
          </article>)}
        </div>
        <div className="showcaseFoot"><span>Modelagem exclusiva</span><span>Identidade aplicada</span><span>Acabamento premium</span></div>
      </section>

      <section className="atelier section">
        <div className="atelierVisual"><div className="goldHalo"/><Image src="/images/modelo-social.png" alt="Profissional com uniforme social personalizado" width={900} height={900}/><p className="verticalText">FEITO PARA REPRESENTAR</p></div>
        <div className="atelierCopy"><p className="eyebrow dark">Seu projeto, do seu jeito</p><h2>Da ideia ao uniforme,<br/><em>cuidamos de tudo.</em></h2><p>Entendemos sua rotina, sua cultura e seus objetivos. Nossa equipe acompanha cada etapa para entregar peças que vestem bem, duram mais e fazem sua marca acontecer.</p><ol><li><span>01</span><div><strong>Imersão na sua marca</strong><p>Necessidades, rotina e identidade visual.</p></div></li><li><span>02</span><div><strong>Criação e modelagem</strong><p>Design exclusivo e escolha de materiais.</p></div></li><li><span>03</span><div><strong>Produção com excelência</strong><p>Controle de qualidade em cada acabamento.</p></div></li></ol></div>
      </section>

      <section className="clients section" id="clientes"><p className="eyebrow dark">Marcas que vestem Fanezze</p><h2>Confiança que atravessa<br/><em>diferentes setores.</em></h2><div className="clientMarquee">{clients.map(c=><span key={c}>{c}</span>)}</div><Image className="partnerBoard" src="/images/parceiros.png" alt="Marcas parceiras da Fanezze Uniformes" width={1240} height={602}/></section>

      <section className="cta" id="contato"><p className="eyebrow">O próximo destaque pode ser o seu</p><h2>Vamos criar algo<br/><em>inesquecível?</em></h2><p>Conte sua ideia para nossa equipe e receba uma proposta personalizada.</p><a className="button light" href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp <span className="iconSlot"><ArrowUpRight/></span></a></section>

      <FloatingContactButton whatsappUrl={whatsappUrl}/>

      <footer>
        <a className="mobileFooterBack" href="#inicio" aria-label="Voltar ao início"><ArrowUp/></a>
        <Image src="/images/logo-fanezze.png" alt="Fanezze Uniformes" width={210} height={50}/><p>Uniformes que vestem marcas e inspiram pessoas.</p><div><a href="#inicio">Instagram</a><a href="#inicio">Facebook</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp · (47) 3426-5137</a></div><small>© 2026 Fanezze Uniformes. Todos os direitos reservados.</small>
      </footer>
    </main>
  );
}
