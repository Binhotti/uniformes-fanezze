"use client";

import { useMemo, useState } from "react";

const garments = {
  "Camiseta": 49.9,
  "Polo": 69.9,
  "Camisa social": 94.9,
  "Jaleco": 89.9,
  "Calça operacional": 99.9,
};

const fabrics = {
  "Essencial": { multiplier: 1, description: "Conforto e ótimo custo-benefício" },
  "Premium": { multiplier: 1.18, description: "Toque superior e maior durabilidade" },
  "Tecnológico": { multiplier: 1.32, description: "Performance, respirabilidade e proteção" },
};

const customizations = {
  "Sem personalização": 0,
  "Bordado": 12,
  "Silk screen": 7,
  "Bordado + Silk": 17,
};

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function volumeDiscount(quantity: number) {
  if (quantity >= 100) return .15;
  if (quantity >= 50) return .1;
  if (quantity >= 20) return .05;
  return 0;
}

export default function QuoteSimulator() {
  const [garment, setGarment] = useState<keyof typeof garments>("Polo");
  const [fabric, setFabric] = useState<keyof typeof fabrics>("Premium");
  const [customization, setCustomization] = useState<keyof typeof customizations>("Bordado");
  const [quantity, setQuantity] = useState(30);
  const [urgency, setUrgency] = useState(false);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [sizes, setSizes] = useState("");
  const [notes, setNotes] = useState("");

  const quote = useMemo(() => {
    const base = garments[garment] * fabrics[fabric].multiplier + customizations[customization];
    const discount = volumeDiscount(quantity);
    const urgencyMultiplier = urgency ? 1.15 : 1;
    const unit = base * (1 - discount) * urgencyMultiplier;
    return { unit, total: unit * quantity, discount };
  }, [garment, fabric, customization, quantity, urgency]);

  const message = [
    "Olá, vim pelo site e gostaria de solicitar este orçamento:",
    "",
    `Empresa: ${company || "Não informada"}`,
    `Responsável: ${name || "Não informado"}`,
    `Peça: ${garment}`,
    `Quantidade: ${quantity} unidades`,
    `Tecido: ${fabric}`,
    `Personalização: ${customization}`,
    `Grade de tamanhos: ${sizes || "A definir"}`,
    `Prazo prioritário: ${urgency ? "Sim" : "Não"}`,
    `Observações: ${notes || "Nenhuma"}`,
    "",
    `Estimativa unitária: ${money.format(quote.unit)}`,
    `Estimativa total: ${money.format(quote.total)}`,
    "",
    "Entendo que os valores são estimados e estão sujeitos à confirmação técnica.",
  ].join("\n");

  const whatsappUrl = `https://wa.me/554734265137?text=${encodeURIComponent(message)}`;

  return <div className="quoteLayout">
    <form className="quoteForm" onSubmit={(event) => event.preventDefault()}>
      <div className="formBlock">
        <span className="formStep">01</span><div><h2>Identificação</h2><p>Para quem estamos criando?</p></div>
        <label><span>Empresa</span><input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nome da empresa"/></label>
        <label><span>Seu nome</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do responsável"/></label>
      </div>

      <div className="formBlock">
        <span className="formStep">02</span><div><h2>Escolha a peça</h2><p>Selecione o modelo principal.</p></div>
        <div className="optionGrid garmentOptions">{Object.keys(garments).map((item) => <button type="button" className={garment === item ? "selected" : ""} onClick={() => setGarment(item as keyof typeof garments)} key={item}>{item}<small>A partir de {money.format(garments[item as keyof typeof garments])}</small></button>)}</div>
      </div>

      <div className="formBlock">
        <span className="formStep">03</span><div><h2>Material e acabamento</h2><p>Personalize a experiência da peça.</p></div>
        <div className="optionGrid">{Object.entries(fabrics).map(([item, data]) => <button type="button" className={fabric === item ? "selected" : ""} onClick={() => setFabric(item as keyof typeof fabrics)} key={item}>{item}<small>{data.description}</small></button>)}</div>
        <label><span>Personalização</span><select value={customization} onChange={(e) => setCustomization(e.target.value as keyof typeof customizations)}>{Object.keys(customizations).map(item => <option key={item}>{item}</option>)}</select></label>
      </div>

      <div className="formBlock">
        <span className="formStep">04</span><div><h2>Quantidade e grade</h2><p>Informe o volume aproximado.</p></div>
        <label className="quantityField"><span>Quantidade</span><div><button type="button" onClick={() => setQuantity(Math.max(10, quantity - 10))}>−</button><input type="number" min="10" max="5000" value={quantity} onChange={(e) => setQuantity(Math.max(10, Number(e.target.value)))} /><button type="button" onClick={() => setQuantity(quantity + 10)}>+</button></div></label>
        <label><span>Tamanhos</span><input value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="Ex.: 5P, 10M, 10G e 5GG"/></label>
        <label className="checkField"><input type="checkbox" checked={urgency} onChange={(e) => setUrgency(e.target.checked)}/><span><strong>Produção prioritária</strong>Aplicar estimativa para prazo reduzido.</span></label>
        <label><span>Observações</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Cores, detalhes, necessidades específicas..." rows={4}/></label>
      </div>
    </form>

    <aside className="quoteSummary">
      <p className="eyebrow">Sua estimativa</p>
      <h2>{garment}</h2>
      <dl><div><dt>Quantidade</dt><dd>{quantity} peças</dd></div><div><dt>Tecido</dt><dd>{fabric}</dd></div><div><dt>Personalização</dt><dd>{customization}</dd></div>{quote.discount > 0 && <div className="discount"><dt>Desconto por volume</dt><dd>−{quote.discount * 100}%</dd></div>}</dl>
      <div className="quoteTotal"><span>Estimativa total</span><strong>{money.format(quote.total)}</strong><small>{money.format(quote.unit)} por peça</small></div>
      <a className="quoteSubmit" href={whatsappUrl} target="_blank" rel="noreferrer">Enviar orçamento completo <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
      <p className="quoteDisclaimer">Simulação inicial sujeita à validação de materiais, arte, disponibilidade e prazo de produção.</p>
    </aside>
  </div>;
}
