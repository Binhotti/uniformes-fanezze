"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Category = { title: string; text: string; image: string };

function ArrowUpRight() {
  return <svg className="actionIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 6 6 6-6 6"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function ExpandableCategoryGallery({ categories }: { categories: Category[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const stripRef = useRef<HTMLDivElement>(null);

  const goToSlide = (index: number) => {
    const strip = stripRef.current;
    const card = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !card) return;
    const firstCard = strip.children[0] as HTMLElement;
    strip.scrollTo({ left: card.offsetLeft - firstCard.offsetLeft, behavior: "smooth" });
    setActiveSlide(index);
  };

  const updateActiveSlide = () => {
    const strip = stripRef.current;
    if (!strip) return;
    const cards = Array.from(strip.children) as HTMLElement[];
    const firstOffset = cards[0]?.offsetLeft ?? 0;
    const closest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - firstOffset - strip.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActiveSlide(closest.index);
  };

  useEffect(() => {
    document.body.style.overflow = selected === null ? "" : "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (selected !== null && event.key === "ArrowRight") setSelected((selected + 1) % categories.length);
      if (selected !== null && event.key === "ArrowLeft") setSelected((selected - 1 + categories.length) % categories.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [selected, categories.length]);

  return <>
    <div ref={stripRef} className="categoryGrid categoryStrip" onMouseLeave={() => setHovered(null)} onScroll={updateActiveSlide}>
      {categories.map((item, i) => (
        <article
          className={`category ${hovered === i ? "isHovered" : ""} ${hovered !== null && hovered !== i ? "isDimmed" : ""}`}
          key={item.title}
          onMouseEnter={() => setHovered(i)}
          onClick={() => setSelected(i)}
          tabIndex={0}
          role="button"
          aria-label={`Ampliar uniforme ${item.title}`}
          onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(i); }}
        >
          <Image src={item.image} alt={`Uniforme ${item.title}`} fill sizes="(max-width: 800px) 100vw, 50vw" />
          <div className="categoryOverlay" />
          <span className="number">0{i + 1}</span>
          <div className="categoryInfo"><h3>{item.title}</h3><p>{item.text}</p><span className="roundArrow"><ArrowUpRight /></span></div>
        </article>
      ))}
    </div>
    <div className="categoryPagination" aria-label="Navegação das coleções">
      {categories.map((item, index) => <button key={item.title} type="button" className={activeSlide === index ? "active" : ""} onClick={() => goToSlide(index)} aria-label={`Ver coleção ${item.title}`} aria-current={activeSlide === index ? "true" : undefined}><span /></button>)}
    </div>

    {selected !== null && <div className="galleryModal" role="dialog" aria-modal="true" aria-label={`Uniforme ${categories[selected].title}`} onClick={() => setSelected(null)}>
      <button type="button" className="galleryClose" onClick={() => setSelected(null)} aria-label="Fechar imagem"><span /><span /></button>
      <button type="button" className="galleryNav previous" onClick={(event) => { event.stopPropagation(); setSelected((selected - 1 + categories.length) % categories.length); }} aria-label="Imagem anterior"><Chevron direction="left" /></button>
      <div className="galleryModalImage" onClick={(event) => event.stopPropagation()}>
        <div
          className="galleryModalAsset"
          key={categories[selected].image}
          role="img"
          aria-label={`Uniforme ${categories[selected].title}`}
          style={{ backgroundImage: `url("${categories[selected].image}")` }}
        />
        <div className="galleryCaption"><span>0{selected + 1}</span><strong>{categories[selected].title}</strong></div>
      </div>
      <button type="button" className="galleryNav next" onClick={(event) => { event.stopPropagation(); setSelected((selected + 1) % categories.length); }} aria-label="Próxima imagem"><Chevron direction="right" /></button>
      <div className="galleryCount">0{selected + 1} / 0{categories.length}</div>
    </div>}
  </>;
}
