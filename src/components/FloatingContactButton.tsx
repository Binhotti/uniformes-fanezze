"use client";

import { useEffect, useState } from "react";

function WhatsAppIcon() {
  return <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path fill="currentColor" d="M16.04 3.2A12.77 12.77 0 0 0 5.1 22.57L3.2 29.5l7.09-1.86A12.79 12.79 0 1 0 16.04 3.2Zm0 23.4c-1.9 0-3.76-.51-5.38-1.48l-.39-.23-4.2 1.1 1.12-4.1-.25-.42a10.63 10.63 0 1 1 9.1 5.13Zm5.83-7.95c-.32-.16-1.9-.94-2.2-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.57-1.59a9.62 9.62 0 0 1-1.78-2.21c-.18-.32-.02-.5.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.22.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.3.32-1.12 1.1-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.6-.09 1.89-.77 2.15-1.51.27-.75.27-1.4.19-1.52-.08-.14-.3-.22-.62-.38Z"/></svg>;
}

function ArrowUp() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function FloatingContactButton({ whatsappUrl }: { whatsappUrl: string }) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateForScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
      setShowBackToTop(scrollPosition > 120);
    };
    updateForScroll();
    window.addEventListener("scroll", updateForScroll, { passive: true });
    document.addEventListener("scroll", updateForScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", updateForScroll);
      document.removeEventListener("scroll", updateForScroll, { capture: true });
    };
  }, []);

  return <>
    <a className="whatsappFloat contactPrimary isVisible" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar com a Fanezze pelo WhatsApp"><WhatsAppIcon/><span>Fale conosco</span></a>
    <button type="button" className={`whatsappFloat backToTop ${showBackToTop ? "isVisible" : "isHidden"}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Voltar ao início"><ArrowUp/><span>Voltar ao início</span></button>
  </>;
}
