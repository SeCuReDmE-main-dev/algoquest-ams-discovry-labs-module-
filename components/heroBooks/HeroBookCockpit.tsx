import React, { useState } from 'react';
import {
  HERO_BOOK_DECKS, HERO_BOOK_STAGES, appendMissionJournal, persistHeroBookPanelState, readHeroBookPanelState,
  rollHeroBookDie, type HeroBookPanelStateV1,
} from '../../services/heroBookPanel';

const TABS = ['Mission', 'Héros', 'Inventaire', 'Talents', 'Décisions', 'Atelier', 'Preuves'] as const;
type CockpitTab = typeof TABS[number];

/** A keyboard-accessible, high-contrast fallback cockpit.  Specialist branding
 * can surround it, but cannot replace the durable AlgoQuest hero identity. */
export default function HeroBookCockpit() {
  const [tab, setTab] = useState<CockpitTab>('Mission');
  const [state, setState] = useState<HeroBookPanelStateV1>(() => readHeroBookPanelState());
  const deck = HERO_BOOK_DECKS.find((candidate) => candidate.hero_book_id === state.hero_book_id);
  const update = (next: HeroBookPanelStateV1) => { persistHeroBookPanelState(next); setState(next); };
  const advance = (stage: typeof HERO_BOOK_STAGES[number]) => update(appendMissionJournal(state, state.revision, stage, `Learner opened ${stage}.`));
  const roll = () => { const outcome = rollHeroBookDie(state, state.revision); update(outcome.state); };

  return (
    <section aria-labelledby="hero-book-cockpit-title" className="mt-6 rounded-xl border-2 border-sky-200 bg-slate-950 p-4 text-slate-100 shadow-lg shadow-sky-950/30">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-200">SecuredMe Education · Qbit return channel</p>
          <h3 id="hero-book-cockpit-title" className="mt-1 text-xl font-black text-white">{state.hero_book_id} cockpit</h3>
          <p className="mt-1 text-sm text-slate-200">{state.mission.title} · {state.mission.stage} · revision {state.revision}</p>
        </div>
        <button type="button" onClick={roll} className="rounded-md bg-sky-300 px-3 py-2 text-sm font-black text-slate-950 hover:bg-sky-200 focus:outline-none focus:ring-4 focus:ring-white">
          Roll deterministic die{state.deterministic_die.last_receipt ? ` (${state.deterministic_die.last_receipt.result})` : ''}
        </button>
      </div>
      <div role="tablist" aria-label="Hero Book cockpit sections" className="mt-4 flex flex-wrap gap-2">
        {TABS.map((name) => <button key={name} type="button" role="tab" aria-selected={tab === name} onClick={() => setTab(name)} className={`rounded-md border px-3 py-2 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-white ${tab === name ? 'border-sky-200 bg-sky-200 text-slate-950' : 'border-slate-400 bg-slate-900 text-white hover:bg-slate-800'}`}>{name}</button>)}
      </div>
      <div role="tabpanel" className="mt-4 rounded-lg bg-white p-4 text-slate-950">
        {tab === 'Mission' && <><p className="font-bold">{state.mission.title}</p><p className="mt-1 text-sm">AlgoQuest remains the canonical owner of progression, prompts, evidence and tokens.</p><div className="mt-3 flex flex-wrap gap-2">{HERO_BOOK_STAGES.map((stage) => <button className="rounded border-2 border-slate-800 px-2 py-1 text-xs font-bold hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-700" type="button" key={stage} onClick={() => advance(stage)}>{stage}</button>)}</div></>}
        {tab === 'Héros' && <p><strong>{state.hero.role}</strong> · narrative level {state.hero.narrative_level}; declared preferences: {state.hero.preferences.join(', ') || 'none'}.</p>}
        {tab === 'Inventaire' && <ul className="list-disc pl-5">{state.inventory.map((item) => <li key={item.item_id}>{item.label} — {item.kind} — {item.state}. {item.kind === 'symbolic-weapon' ? 'Symbolic only; no real-world weapon use.' : item.description}</li>)}</ul>}
        {tab === 'Talents' && <p>{state.talents.join(', ') || 'No declared talent yet.'}</p>}
        {tab === 'Décisions' && <p>{state.decisions.length ? `${state.decisions.length} recorded decision(s).` : 'No decision has been committed.'}</p>}
        {tab === 'Atelier' && <><p>Active specialist: {state.specialist.active || 'none'}; every build returns a receipt for AlgoQuest review.</p><p className="mt-2 text-sm">Available cards: {deck?.capabilities.filter((card) => card.status === 'available').map((card) => card.title).join(', ') || 'none'}.</p></>}
        {tab === 'Preuves' && <p>Story points: {state.story_points}. Evidence: {state.learning_evidence.evidence_refs.length}. Tokens: {state.knowledge_tokens.length}. These ledgers are intentionally separate.</p>}
      </div>
    </section>
  );
}
