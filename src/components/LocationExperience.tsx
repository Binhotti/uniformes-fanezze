"use client";

import { MouseEvent, useRef, useState } from "react";

const address = "R. Anita Garibaldi, 478, Anita Garibaldi, Joinville - SC";
const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
const whatsappUrl = "https://wa.me/554734265137?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20loja.";

function PinIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="1.6"/><circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6"/></svg>;
}

function ArrowUpRight() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function LocationExperience() {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card || expanded) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    card.style.setProperty("--map-rx", `${-y * 5}deg`);
    card.style.setProperty("--map-ry", `${x * 5}deg`);
  }

  function resetTilt() {
    cardRef.current?.style.setProperty("--map-rx", "0deg");
    cardRef.current?.style.setProperty("--map-ry", "0deg");
  }

  return <section className="locationContent">
    <div className="locationInfo">
      <p className="eyebrow dark">Onde estamos</p>
      <h2>Venha conhecer<br/><em>nosso espaço.</em></h2>
      <p className="locationIntro">Conheça de perto os tecidos, acabamentos e possibilidades para o uniforme da sua equipe.</p>
      <div className="addressCard"><span className="addressIcon"><PinIcon/></span><div><small>Fanezze Uniformes</small><strong>R. Anita Garibaldi, 478</strong><p>Anita Garibaldi · Joinville — SC</p></div></div>
      <div className="locationActions"><a className="locationPrimary" href={directionsUrl} target="_blank" rel="noreferrer">Traçar rota <ArrowUpRight/></a><a className="locationSecondary" href={whatsappUrl} target="_blank" rel="noreferrer">Falar com a loja</a></div>
      <div className="visitNotes"><span><strong>Atendimento</strong>Consulte o horário antes da visita</span><span><strong>Experiência</strong>Veja amostras e acabamentos</span></div>
    </div>

    <div className={`interactiveMap ${expanded ? "expanded" : ""}`} ref={cardRef} onMouseMove={handleMove} onMouseLeave={resetTilt}>
      <div className="mapFrame">
        <iframe src={mapEmbed} title="Mapa da Fanezze Uniformes em Joinville" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/>
        {!expanded && <button type="button" className="mapCover" onClick={() => setExpanded(true)} aria-label="Expandir e explorar o mapa">
          <span className="mapGrid"/>
          <span className="mapPin"><PinIcon/></span>
          <span className="mapStatus"><i/> Localização</span>
          <span className="mapHint">Clique para explorar</span>
        </button>}
        {expanded && <button type="button" className="mapCollapse" onClick={() => setExpanded(false)}>Reduzir mapa</button>}
      </div>
      <div className="mapFooter"><div><small>Endereço</small><strong>Joinville · Santa Catarina</strong></div><span>{expanded ? "Mapa interativo" : "Visualização compacta"}</span></div>
    </div>
  </section>;
}
