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
  const [quantityInput, setQuantityInput] = useState("10");
  const [urgency, setUrgency] = useState(false);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [sizes, setSizes] = useState("");
  const [notes, setNotes] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const quantity = Number(quantityInput) || 0;
  const requiredFieldsValid = company.trim() !== "" && name.trim() !== "" && sizes.trim() !== "" && Number.isInteger(quantity) && quantity >= 10;

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

  const submitQuote = () => {
    setAttemptedSubmit(true);
    if (!requiredFieldsValid) {
      const firstInvalid = document.querySelector<HTMLElement>(".quoteForm [aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return <div className="quoteLayout">
    <form className="quoteForm" onSubmit={(event) => event.preventDefault()}>
      <div className="formBlock">
        <span className="formStep">01</span><div><h2>Identificação</h2><p>Para quem estamos criando?</p></div>
        <label><span>Empresa *</span><input required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Nome da empresa" aria-invalid={attemptedSubmit && !company.trim()}/>{attemptedSubmit && !company.trim() && <small className="fieldError">Informe o nome da empresa.</small>}</label>
        <label><span>Seu nome *</span><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do responsável" aria-invalid={attemptedSubmit && !name.trim()}/>{attemptedSubmit && !name.trim() && <small className="fieldError">Informe o nome do responsável.</small>}</label>
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
        <label className="quantityField"><span>Quantidade *</span><div><button type="button" onClick={() => setQuantityInput(String(Math.max(10, quantity - 1)))} aria-label="Diminuir quantidade">−</button><input type="number" min="10" step="1" inputMode="numeric" value={quantityInput} onChange={(e) => setQuantityInput(e.target.value)} onBlur={() => { if (!Number.isInteger(quantity) || quantity < 10) setQuantityInput("10"); }} aria-invalid={attemptedSubmit && (!Number.isInteger(quantity) || quantity < 10)} /><button type="button" onClick={() => setQuantityInput(String(Math.max(10, quantity + 1)))} aria-label="Aumentar quantidade">+</button></div>{attemptedSubmit && (!Number.isInteger(quantity) || quantity < 10) && <small className="fieldError">A quantidade mínima é 10 peças.</small>}</label>
        <label><span>Tamanhos *</span><input required value={sizes} onChange={(e) => setSizes(e.target.value)} placeholder="Ex.: 5P, 10M, 10G e 5GG" aria-invalid={attemptedSubmit && !sizes.trim()}/>{attemptedSubmit && !sizes.trim() && <small className="fieldError">Informe a grade de tamanhos.</small>}</label>
        <label className="checkField"><input type="checkbox" checked={urgency} onChange={(e) => setUrgency(e.target.checked)}/><span><strong>Produção prioritária</strong>Aplicar estimativa para prazo reduzido.</span></label>
        <label><span>Observações</span><textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Cores, detalhes, necessidades específicas..." rows={4}/></label>
      </div>
    </form>

    <aside className="quoteSummary">
      <p className="eyebrow">Sua estimativa</p>
      <h2>{garment}</h2>
      <dl><div><dt>Quantidade</dt><dd>{quantity} peças</dd></div><div><dt>Tecido</dt><dd>{fabric}</dd></div><div><dt>Personalização</dt><dd>{customization}</dd></div>{quote.discount > 0 && <div className="discount"><dt>Desconto por volume</dt><dd>−{quote.discount * 100}%</dd></div>}</dl>
      <div className="quoteTotal"><span>Estimativa total</span><strong>{money.format(quote.total)}</strong><small>{money.format(quote.unit)} por peça</small></div>
      <button type="button" className="quoteSubmit" onClick={submitQuote} aria-disabled={!requiredFieldsValid}>Enviar orçamento completo <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
      {attemptedSubmit && !requiredFieldsValid && <p className="quoteValidation" role="alert">Preencha os campos obrigatórios destacados antes de enviar.</p>}
      <p className="quoteDisclaimer">Simulação inicial sujeita à validação de materiais, arte, disponibilidade e prazo de produção.</p>
    </aside>
  </div>;
}
