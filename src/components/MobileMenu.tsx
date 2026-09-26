"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Início", href: "#inicio" },
  { label: "Coleções", href: "#colecoes" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Clientes", href: "#clientes" },
  { label: "Localização", href: "/localizacao" },
  { label: "Orçamento", href: "/orcamento" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobileMenuOpen", open);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("mobileMenuOpen");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className={`mobileNav ${open ? "isOpen" : ""}`}>
      <button
        className="menuToggle"
        type="button"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div className="mobileMenuPanel" id="mobile-navigation" aria-hidden={!open}>
        <nav aria-label="Navegação para celular">
          {links.map((link, index) => (
            <a href={link.href} key={link.label} onClick={() => setOpen(false)}>
              <small>0{index + 1}</small>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <p>Uniformes que vestem marcas<br />e inspiram pessoas.</p>
      </div>
    </div>
  );
}
