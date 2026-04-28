import { useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import BottomNav from '../../components/BottomNav/BottomNav.jsx';
import { avisosMock } from './avisosMock.js';
import './AvisosPage.css';

const TABS = [
  { id: 'avisos', label: 'Avisos' },
  { id: 'turma', label: 'Turma' },
];

const TAG_VARIANTS = {
  Institucional: 'institutional',
  Evento: 'event',
  Acadêmico: 'academic',
  Biblioteca: 'library',
};

function NoticeCard({ data }) {
  const tagVariant = TAG_VARIANTS[data.tag] ?? 'default';
  return (
    <article className={`notice-card ${data.isImportant ? 'notice-card--important' : ''}`}>
      <div className="notice-card__header">
        <span className={`notice-card__tag notice-card__tag--${tagVariant}`}>{data.tag}</span>
        <span className="notice-card__time">{data.postedAt}</span>
      </div>
      <h3 className="notice-card__title">{data.title}</h3>
      <p className="notice-card__summary">{data.summary}</p>
    </article>
  );
}

function PollCard({ data }) {
  const [voted, setVoted] = useState(data.voted);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState(data.options);
  const [totalVotes, setTotalVotes] = useState(data.totalVotes);

  function handleVote(optionId) {
    if (voted) return;
    setOptions((prev) =>
      prev.map((o) => (o.id === optionId ? { ...o, votes: o.votes + 1 } : o))
    );
    setTotalVotes((t) => t + 1);
    setSelectedOption(optionId);
    setVoted(true);
  }

  return (
    <article className="poll-card">
      <p className="poll-card__label">Votação</p>
      <h3 className="poll-card__question">{data.question}</h3>
      <p className="poll-card__author">Por {data.createdBy}</p>
      <ul className="poll-card__options">
        {options.map((option) => {
          const pct = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
          const isSelected = selectedOption === option.id;
          return (
            <li key={option.id}>
              {voted ? (
                <div className={`poll-option poll-option--result ${isSelected ? 'poll-option--selected' : ''}`}>
                  <div className="poll-option__bar" style={{ width: `${pct}%` }} />
                  <span className="poll-option__label">{option.label}</span>
                  <span className="poll-option__pct">{pct}%</span>
                </div>
              ) : (
                <button
                  type="button"
                  className="poll-option poll-option--vote"
                  onClick={() => handleVote(option.id)}
                >
                  {option.label}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <p className="poll-card__total">{totalVotes} votos</p>
    </article>
  );
}

function ChatBubble({ data }) {
  return (
    <div className={`chat-bubble-wrap ${data.isMine ? 'chat-bubble-wrap--mine' : ''}`}>
      {!data.isMine && (
        <div className="chat-avatar" aria-hidden="true">{data.initials}</div>
      )}
      <div className="chat-bubble">
        {!data.isMine && (
          <p className="chat-bubble__author">{data.author}</p>
        )}
        <p className="chat-bubble__message">{data.message}</p>
        <p className="chat-bubble__time">{data.time}</p>
      </div>
    </div>
  );
}

function AvisosPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('avisos');

  return (
    <div className="page avisos-page">
      <PageHeader title="Avisos" />

      <div className="seg-tabs" role="tablist" aria-label="Seções de avisos">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            className={`seg-tab ${activeTab === tab.id ? 'seg-tab--active' : ''}`}
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'avisos' && (
        <main className="page__main" id="conteudo">
          <ul className="notices-list">
            {avisosMock.notices.map((notice) => (
              <li key={notice.id}>
                <NoticeCard data={notice} />
              </li>
            ))}
          </ul>
        </main>
      )}

      {activeTab === 'turma' && (
        <main className="page__main page__main--chat" id="conteudo">
          <PollCard data={avisosMock.poll} />

          <section aria-label="Chat da turma" className="chat-section">
            <h2 className="chat-section__title">Chat da turma</h2>
            <ul className="chat-list">
              {avisosMock.chat.map((msg) => (
                <li key={msg.id}>
                  <ChatBubble data={msg} />
                </li>
              ))}
            </ul>
          </section>

          <div className="chat-input-bar" role="form" aria-label="Enviar mensagem">
            <input
              type="text"
              className="chat-input"
              placeholder="Mensagem para a turma..."
              aria-label="Mensagem"
              readOnly
            />
            <button type="button" className="chat-send" aria-label="Enviar" disabled title="Envio de mensagem em breve">
              ➤
            </button>
          </div>
        </main>
      )}

      <BottomNav active="avisos" onNavigate={onNavigate} />
    </div>
  );
}

export default AvisosPage;
