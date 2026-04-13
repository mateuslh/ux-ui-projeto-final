import './FinancialSummary.css';

function FinancialSummary({ bill }) {
  const isPending = bill.status === 'pending';

  return (
    <article className="financial">
      <div className="financial__info">
        <p className="financial__reference">{bill.reference}</p>
        <p className="financial__amount">{bill.amount}</p>
        <p className={`financial__due financial__due--${bill.status}`}>{bill.dueLabel}</p>
      </div>
      <button type="button" className="financial__action">
        {isPending ? 'Pagar agora' : 'Ver detalhes'}
      </button>
    </article>
  );
}

export default FinancialSummary;
