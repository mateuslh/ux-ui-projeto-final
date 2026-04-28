import { useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import BottomNav from '../../components/BottomNav/BottomNav.jsx';
import { financeiroMock } from './financeiroMock.js';
import './FinanceiroPage.css';

const STATUS_LABEL = {
  paid: 'Pago',
  pending: 'Pendente',
  overdue: 'Vencido',
};

function getTodayLabel() {
  return new Date().toLocaleDateString('pt-BR');
}

function FinanceiroPage({ onNavigate }) {
  const { currentBill, enrollment, history } = financeiroMock;
  const [billStatus, setBillStatus] = useState(currentBill.status);
  const [paidOn, setPaidOn] = useState(currentBill.paidOn ?? null);
  const [showBillPanel, setShowBillPanel] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentsHistory, setPaymentsHistory] = useState(history);

  const isPending = billStatus === 'pending';
  const enrollmentOpen = enrollment.status === 'open';
  const line = currentBill.boleto.linhaDigitavel;

  function handleCopyLine() {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(line);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleMarkAsPaid() {
    if (!isPending) return;
    const today = getTodayLabel();
    setBillStatus('paid');
    setPaidOn(today);
    setShowBillPanel(true);

    setPaymentsHistory((prev) => [
      {
        id: `paid-${Date.now()}`,
        reference: currentBill.reference,
        amount: currentBill.amount,
        paidOn: today,
        status: 'paid',
      },
      ...prev,
    ]);
  }

  return (
    <div className="page">
      <PageHeader title="Financeiro" />

      <main className="page__main" id="conteudo">
        <section aria-labelledby="sec-mensalidade">
          <h2 id="sec-mensalidade" className="section-title t1">Mensalidade atual</h2>
          <article className={`bill-card bill-card--${billStatus}`}>
            <div className="bill-card__header">
              <p className="bill-card__reference">{currentBill.reference}</p>
              <span className={`bill-card__status-tag bill-card__status-tag--${billStatus}`}>
                {STATUS_LABEL[billStatus]}
              </span>
            </div>
            <p className="bill-card__amount">{currentBill.amount}</p>
            <p className="bill-card__due">
              {isPending ? currentBill.dueLabel : `Pago em ${paidOn ?? currentBill.paidOn ?? '—'}`}
            </p>
            <button
              type="button"
              className={`bill-card__action ${isPending ? 'bill-card__action--primary' : 'bill-card__action--secondary'}`}
              onClick={() => setShowBillPanel((v) => !v)}
            >
              {isPending
                ? (showBillPanel ? 'Fechar boleto' : 'Pagar boleto')
                : (showBillPanel ? 'Fechar comprovante' : 'Ver comprovante')}
            </button>

            {showBillPanel && isPending && (
              <div className="boleto-panel" aria-label="Dados do boleto">
                <div className="boleto-panel__row">
                  <span className="boleto-panel__label">Banco</span>
                  <span className="boleto-panel__value">{currentBill.boleto.bank}</span>
                </div>
                <div className="boleto-panel__row">
                  <span className="boleto-panel__label">Beneficiário</span>
                  <span className="boleto-panel__value">{currentBill.boleto.beneficiary}</span>
                </div>
                <div className="boleto-panel__row">
                  <span className="boleto-panel__label">CNPJ</span>
                  <span className="boleto-panel__value">{currentBill.boleto.cnpj}</span>
                </div>
                <div className="boleto-panel__line-wrap">
                  <p className="boleto-panel__line-label">Linha digitável</p>
                  <p className="boleto-panel__line">{line}</p>
                </div>

                <div className="boleto-panel__actions">
                  <button type="button" className="boleto-panel__btn boleto-panel__btn--ghost" onClick={handleCopyLine}>
                    {copied ? 'Linha copiada' : 'Copiar linha'}
                  </button>
                  <button type="button" className="boleto-panel__btn boleto-panel__btn--primary" onClick={handleMarkAsPaid}>
                    Marcar como pago
                  </button>
                </div>

                <p className="boleto-panel__hint">
                  Pagamento simulado para protótipo. No produto final, abrirá integração bancária.
                </p>
              </div>
            )}

            {showBillPanel && !isPending && (
              <div className="receipt-panel" aria-label="Comprovante de pagamento">
                <div className="receipt-panel__row">
                  <span className="receipt-panel__label">Status</span>
                  <span className="receipt-panel__value receipt-panel__value--ok">Pagamento confirmado</span>
                </div>
                <div className="receipt-panel__row">
                  <span className="receipt-panel__label">Data de pagamento</span>
                  <span className="receipt-panel__value">{paidOn ?? currentBill.paidOn ?? '—'}</span>
                </div>
                <div className="receipt-panel__row">
                  <span className="receipt-panel__label">Protocolo</span>
                  <span className="receipt-panel__value receipt-panel__value--mono">{currentBill.receipt.protocol}</span>
                </div>
                <div className="receipt-panel__row">
                  <span className="receipt-panel__label">Autenticação</span>
                  <span className="receipt-panel__value receipt-panel__value--mono">{currentBill.receipt.auth}</span>
                </div>
              </div>
            )}
          </article>
        </section>

        <section aria-labelledby="sec-matricula">
          <h2 id="sec-matricula" className="section-title t1">Reserva de matrícula</h2>
          <article className={`enrollment-card enrollment-card--${enrollment.status}`}>
            <div className="enrollment-card__info">
              <p className="enrollment-card__semester">Semestre {enrollment.semester}</p>
              <span className={`enrollment-card__status enrollment-card--badge-${enrollment.status}`}>
                {enrollment.statusLabel}
              </span>
            </div>
            <p className="enrollment-card__deadline">Prazo até {enrollment.deadline}</p>
            <button
              type="button"
              className="enrollment-card__action"
              onClick={() => onNavigate('matricula')}
            >
              {enrollmentOpen ? 'Reservar matrícula' : 'Ver status'}
            </button>
          </article>
        </section>

        <section aria-labelledby="sec-historico">
          <h2 id="sec-historico" className="section-title t1">Histórico de pagamentos</h2>
          <ul className="payment-list">
            {paymentsHistory.map((item) => (
              <li key={item.id} className="payment-item">
                <div className="payment-item__info">
                  <p className="payment-item__reference">{item.reference}</p>
                  <p className="payment-item__paid-on">Pago em {item.paidOn}</p>
                </div>
                <div className="payment-item__right">
                  <p className="payment-item__amount">{item.amount}</p>
                  <span className="payment-item__status">Pago</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <BottomNav active="financeiro" onNavigate={onNavigate} />
    </div>
  );
}

export default FinanceiroPage;
