import Image from "next/image";

const categories = [
  { title: "Corporativo", text: "Alfaiataria e peças sociais que traduzem confiança.", image: "/images/corporativo-premium.png" },
  { title: "Operacional", text: "Resistência, mobilidade e segurança para cada jornada.", image: "/images/operacional-premium.png" },
  { title: "Saúde & Serviços", text: "Conforto técnico com uma apresentação impecável.", image: "/images/saude-premium.png" },
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
          <a href="#colecoes">Coleções</a><a href="#diferenciais">Diferenciais</a><a href="#clientes">Clientes</a>
        </nav>
        <a className="headerCta" href="#contato">Solicitar orçamento <span>↗</span></a>
      </header>

      <section className="hero" id="inicio">
        <video autoPlay muted loop playsInline poster="/images/corporativo.jpg">
          <source src="/media/fanezzi.mp4" type="video/mp4" />
        </video>
        <div className="heroShade" />
        <div className="heroContent">
          <p className="eyebrow">Uniformes que representam</p>
          <h1>Vista sua marca.<br/><em>Marque presença.</em></h1>
          <p className="heroText">Projetamos uniformes com estética, conforto e propósito para transformar equipes em uma expressão autêntica da sua empresa.</p>
          <div className="heroActions"><a className="button gold" href="#contato">Criar meu uniforme <span>↗</span></a><a className="textLink" href="#colecoes">Conheça nossas linhas <span>↓</span></a></div>
        </div>
        <div className="heroCounter"><strong>25+</strong><span>anos vestindo<br/>grandes histórias</span></div>
      </section>

      <section className="intro section" id="diferenciais">
        <div><p className="eyebrow dark">Excelência em cada detalhe</p><h2>Mais que uniformes.<br/><em>Identidade em forma.</em></h2></div>
        <div className="introCopy"><p>Do primeiro traço ao último acabamento, cada projeto nasce para valorizar pessoas e fortalecer marcas.</p><div className="stats"><span><strong>100%</strong>personalizado</span><span><strong>+500</strong>marcas atendidas</span></div></div>
      </section>

      <section className="collections section" id="colecoes">
        <div className="sectionTop"><p className="eyebrow">Linhas Fanezze</p><h2>Para cada equipe,<br/><em>uma presença única.</em></h2></div>
        <div className="categoryGrid">
          {categories.map((item, i) => <article className="category" key={item.title}><Image src={item.image} alt={`Uniforme ${item.title}`} fill sizes="(max-width: 800px) 100vw, 33vw" /><div className="categoryOverlay"/><span className="number">0{i+1}</span><div className="categoryInfo"><h3>{item.title}</h3><p>{item.text}</p><span className="roundArrow">↗</span></div></article>)}
        </div>
      </section>

      <section className="atelier section">
        <div className="atelierVisual"><div className="goldHalo"/><Image src="/images/modelo-social.png" alt="Profissional com uniforme social personalizado" width={900} height={900}/><p className="verticalText">FEITO PARA REPRESENTAR</p></div>
        <div className="atelierCopy"><p className="eyebrow dark">Seu projeto, do seu jeito</p><h2>Da ideia ao uniforme,<br/><em>cuidamos de tudo.</em></h2><p>Entendemos sua rotina, sua cultura e seus objetivos. Nossa equipe acompanha cada etapa para entregar peças que vestem bem, duram mais e fazem sua marca acontecer.</p><ol><li><span>01</span><div><strong>Imersão na sua marca</strong><p>Necessidades, rotina e identidade visual.</p></div></li><li><span>02</span><div><strong>Criação e modelagem</strong><p>Design exclusivo e escolha de materiais.</p></div></li><li><span>03</span><div><strong>Produção com excelência</strong><p>Controle de qualidade em cada acabamento.</p></div></li></ol></div>
      </section>

      <section className="clients section" id="clientes"><p className="eyebrow dark">Marcas que vestem Fanezze</p><h2>Confiança que atravessa<br/><em>diferentes setores.</em></h2><div className="clientMarquee">{clients.map(c=><span key={c}>{c}</span>)}</div><Image className="partnerBoard" src="/images/parceiros.png" alt="Marcas parceiras da Fanezze Uniformes" width={1240} height={602}/></section>

      <section className="cta" id="contato"><p className="eyebrow">O próximo destaque pode ser o seu</p><h2>Vamos criar algo<br/><em>inesquecível?</em></h2><p>Conte sua ideia para nossa equipe e receba uma proposta personalizada.</p><a className="button light" href="https://wa.me/5500000000000" target="_blank" rel="noreferrer">Chamar no WhatsApp <span>↗</span></a></section>

      <footer><Image src="/images/logo-fanezze.png" alt="Fanezze Uniformes" width={210} height={50}/><p>Uniformes que vestem marcas e inspiram pessoas.</p><div><a href="#inicio">Instagram</a><a href="#inicio">Facebook</a><a href="#inicio">WhatsApp</a></div><small>© 2026 Fanezze Uniformes. Todos os direitos reservados.</small></footer>
    </main>
  );
}
