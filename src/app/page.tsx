import Image from "next/image";

function ArrowUpRight({ size = 18 }: { size?: number }) {
  return <svg className="actionIcon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function ArrowDown({ size = 18 }: { size?: number }) {
  return <svg className="actionIcon" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path fill="currentColor" d="M16.04 3.2A12.77 12.77 0 0 0 5.1 22.57L3.2 29.5l7.09-1.86A12.79 12.79 0 1 0 16.04 3.2Zm0 23.4c-1.9 0-3.76-.51-5.38-1.48l-.39-.23-4.2 1.1 1.12-4.1-.25-.42a10.63 10.63 0 1 1 9.1 5.13Zm5.83-7.95c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59a9.62 9.62 0 0 1-1.78-2.21c-.18-.32-.02-.5.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.22.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.6-.09 1.89-.77 2.15-1.51.27-.75.27-1.4.19-1.52-.08-.14-.3-.22-.62-.38Z"/></svg>;
}

const whatsappUrl = "https://wa.me/554734265137?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento";

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
        <a className="headerCta" href={whatsappUrl} target="_blank" rel="noreferrer">Solicitar orçamento <span className="iconSlot"><ArrowUpRight size={16}/></span></a>
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
        <div className="categoryGrid">
          {categories.map((item, i) => <article className="category" key={item.title}><Image src={item.image} alt={`Uniforme ${item.title}`} fill sizes="(max-width: 800px) 100vw, 33vw" /><div className="categoryOverlay"/><span className="number">0{i+1}</span><div className="categoryInfo"><h3>{item.title}</h3><p>{item.text}</p><span className="roundArrow"><ArrowUpRight/></span></div></article>)}
        </div>
      </section>

      <section className="atelier section">
        <div className="atelierVisual"><div className="goldHalo"/><Image src="/images/modelo-social.png" alt="Profissional com uniforme social personalizado" width={900} height={900}/><p className="verticalText">FEITO PARA REPRESENTAR</p></div>
        <div className="atelierCopy"><p className="eyebrow dark">Seu projeto, do seu jeito</p><h2>Da ideia ao uniforme,<br/><em>cuidamos de tudo.</em></h2><p>Entendemos sua rotina, sua cultura e seus objetivos. Nossa equipe acompanha cada etapa para entregar peças que vestem bem, duram mais e fazem sua marca acontecer.</p><ol><li><span>01</span><div><strong>Imersão na sua marca</strong><p>Necessidades, rotina e identidade visual.</p></div></li><li><span>02</span><div><strong>Criação e modelagem</strong><p>Design exclusivo e escolha de materiais.</p></div></li><li><span>03</span><div><strong>Produção com excelência</strong><p>Controle de qualidade em cada acabamento.</p></div></li></ol></div>
      </section>

      <section className="clients section" id="clientes"><p className="eyebrow dark">Marcas que vestem Fanezze</p><h2>Confiança que atravessa<br/><em>diferentes setores.</em></h2><div className="clientMarquee">{clients.map(c=><span key={c}>{c}</span>)}</div><Image className="partnerBoard" src="/images/parceiros.png" alt="Marcas parceiras da Fanezze Uniformes" width={1240} height={602}/></section>

      <section className="cta" id="contato"><p className="eyebrow">O próximo destaque pode ser o seu</p><h2>Vamos criar algo<br/><em>inesquecível?</em></h2><p>Conte sua ideia para nossa equipe e receba uma proposta personalizada.</p><a className="button light" href={whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp <span className="iconSlot"><ArrowUpRight/></span></a></section>

      <a className="whatsappFloat" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar com a Fanezze pelo WhatsApp"><WhatsAppIcon/><span>Fale conosco</span></a>

      <footer><Image src="/images/logo-fanezze.png" alt="Fanezze Uniformes" width={210} height={50}/><p>Uniformes que vestem marcas e inspiram pessoas.</p><div><a href="#inicio">Instagram</a><a href="#inicio">Facebook</a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp · (47) 3426-5137</a></div><small>© 2026 Fanezze Uniformes. Todos os direitos reservados.</small></footer>
    </main>
  );
}
