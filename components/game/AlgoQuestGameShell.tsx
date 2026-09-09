import React, { useEffect, useMemo, useState } from 'react';
import HeroBookCockpit from '../heroBooks/HeroBookCockpit';
import logoIconDark from '../../assets/landing/logo-icon-dark.png';
import './game-shell.css';

type GameShellProps = {
  state: Record<string, any>;
  projection: Record<string, any>;
  prompt: Record<string, any>;
  busy: boolean;
  error: string | null;
  onCommand: (type: string, payload?: Record<string, unknown>) => Promise<unknown>;
  onReset: () => Promise<void>;
  onExit?: () => void;
};

const actionCards = [
  { id: 'observe', eyebrow: 'Instinct', title: 'Observer', copy: 'Qbit éclaire un détail sans changer ta mission.', command: 'REQUEST_HINT', sigil: '◉' },
  { id: 'forge', eyebrow: 'Technique', title: 'Forger', copy: 'Ouvre Algorithm Builder et règle ta prochaine trajectoire.', command: 'OPEN_SHEET', sigil: '⌁' },
  { id: 'simulate', eyebrow: 'Action', title: 'Déployer', copy: 'Lance la force équipée et révèle sa conséquence.', command: 'RUN_SIMULATION', sigil: '➶' },
  { id: 'seal', eyebrow: 'Décision', title: 'Sceller', copy: 'Valide cette étape et poursuis l’aventure.', command: 'COMPLETE_ACTIVITY', sigil: '✦' },
] as const;

function branchLabel(branch?: string | null) {
  if (branch === 'near-horizon') return 'Horizon proche';
  if (branch === 'far-horizon') return 'Horizon lointain';
  return 'Voie indécise';
}

export default function AlgoQuestGameShell({ state, projection, prompt, busy, error, onCommand, onReset, onExit }: GameShellProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const lastSimulation = state.simulations?.at(-1);
  const points = useMemo(() => lastSimulation?.points?.map((point: { x: number; y: number }) => `${18 + point.x * 7.5},${128 - point.y * 5.4}`).join(' ') || '', [lastSimulation]);
  const act = String(prompt?.act_id || 'act-1').replace('act-', '');
  const progress = Math.round((state.completed_prompt_ids.length / Math.max(1, state.assigned_prompt_ids.length)) * 100);

  useEffect(() => {
    document.documentElement.classList.add('aq-game-active');
    return () => document.documentElement.classList.remove('aq-game-active');
  }, []);

  const play = async (command: string) => {
    if (command === 'OPEN_SHEET') {
      setSheetOpen(true);
      return;
    }
    setNotice(null);
    try {
      await onCommand(command);
      setNotice(command === 'RUN_SIMULATION' ? 'Trajectoire révélée' : command === 'COMPLETE_ACTIVITY' ? 'Étape scellée' : 'Qbit a répondu');
    } catch {
      // The canonical host exposes the actionable error through the shared projection.
    }
  };

  return (
    <main className="aq-game" data-testid="immersive-game" data-run-id={state.run_id}>
      <div className="aq-game__grain" aria-hidden="true" />
      <header className="aq-game__hud">
        <div className="aq-game__identity">
          <img src={logoIconDark} alt="" />
          <div><span>AlgoQuest</span><strong>Le Mage des Deux Horizons</strong></div>
        </div>
        <div className="aq-game__chapter" aria-label={`Acte ${act}, progression ${progress} pour cent`}>
          <span>ACTE {act}</span><i><b style={{ width: `${progress}%` }} /></i><em>{state.completed_prompt_ids.length}/{state.assigned_prompt_ids.length}</em>
        </div>
        <div className="aq-game__resources" aria-label="Ressources">
          <span title="Intuition"><i className="aq-orb aq-orb--cyan" />{state.resources.insight}</span>
          <span title="Volonté"><i className="aq-orb aq-orb--red" />{state.resources.resolve}</span>
          <button type="button" onClick={() => setSheetOpen(true)} aria-label="Ouvrir la fiche du héros"><i className="aq-portrait">M</i><b>Niv. {1 + state.upgrades.length}</b></button>
        </div>
      </header>

      <section className="aq-game__arena" aria-labelledby="encounter-title">
        <div className="aq-game__sky" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        <div className="aq-game__horizon aq-game__horizon--far" aria-hidden="true" />
        <div className="aq-game__horizon aq-game__horizon--near" aria-hidden="true" />
        <div className="aq-game__astrolabe" aria-hidden="true"><i /><b>✦</b></div>
        <div className="aq-game__encounter">
          <p>ÉPREUVE · {branchLabel(state.branch_id)}</p>
          <h1 id="encounter-title">{prompt?.title || 'La première ouverture'}</h1>
          <div className="aq-game__threat"><span>Faille de trajectoire</span><b>{state.activity_status === 'result-ready' ? 'OBSERVÉE' : 'INCONNUE'}</b></div>
          <blockquote>{prompt?.prompt_text}</blockquote>
          {!state.branch_id && <div className="aq-game__branches" aria-label="Choisir une voie">
            <button disabled={busy} onClick={() => { onCommand('CHOOSE_INTENT', { choice: 'near-horizon' }).catch(() => undefined); }}><span>Voie I</span><b>Approcher l’horizon</b><small>Observer ce qui est mesurable maintenant</small></button>
            <button disabled={busy} onClick={() => { onCommand('CHOOSE_INTENT', { choice: 'far-horizon' }).catch(() => undefined); }}><span>Voie II</span><b>Viser au-delà</b><small>Tester une hypothèse plus ambitieuse</small></button>
          </div>}
        </div>

        <div className={`aq-game__result ${lastSimulation ? 'is-visible' : ''}`} aria-live="polite">
          {lastSimulation && <svg viewBox="0 0 410 150" role="img" aria-label="Trajectoire calculée">
            <defs><linearGradient id="aq-path-glow" x1="0" x2="1"><stop stopColor="#71f2f0"/><stop offset="1" stopColor="#f0bf5e"/></linearGradient></defs>
            <path d="M18 128 H392 M18 18 V128" stroke="#496477" strokeWidth="1" fill="none" />
            <polyline points={points} fill="none" stroke="url(#aq-path-glow)" strokeWidth="4" strokeLinecap="round" />
            {lastSimulation.points.map((point: { t: number; x: number; y: number }) => <circle key={point.t} cx={18 + point.x * 7.5} cy={128 - point.y * 5.4} r="3.5" fill="#fff6d7" />)}
          </svg>}
        </div>
      </section>

      <section className="aq-game__command-deck" aria-label="Main d’actions">
        <button className="aq-game__sheet-tab" type="button" onClick={() => setSheetOpen(true)}><i>⌘</i><span>Fiche du héros</span><small>Algorithm Builder</small></button>
        <div className="aq-game__hand">
          {actionCards.map((card, index) => <button key={card.id} className={`aq-card aq-card--${card.id}`} type="button" disabled={busy || (card.command === 'COMPLETE_ACTIVITY' && state.pending_upgrade)} onClick={() => play(card.command)}>
            <span className="aq-card__cost">{index + 1}</span><i className="aq-card__sigil">{card.sigil}</i><small>{card.eyebrow}</small><b>{card.title}</b><em>{card.copy}</em>
          </button>)}
        </div>
        <div className="aq-game__status">
          <span>{state.force.x}/{state.force.y}</span><b>Force équipée</b><button type="button" onClick={() => setSheetOpen(true)}>Modifier</button>
        </div>
      </section>

      {(error || notice) && <div className={`aq-game__toast ${error ? 'is-error' : ''}`} role={error ? 'alert' : 'status'}>{error || notice}</div>}

      <div className={`aq-game__drawer ${sheetOpen ? 'is-open' : ''}`} aria-hidden={!sheetOpen}>
        <button className="aq-game__backdrop" type="button" aria-label="Fermer la fiche" onClick={() => setSheetOpen(false)} />
        <div className="aq-game__sheet">
          <div className="aq-game__sheet-controls"><button type="button" onClick={() => setSheetOpen(false)}>Retour au combat</button><button type="button" onClick={() => void onReset()}>Nouvelle partie</button>{onExit && <button type="button" onClick={onExit}>Quitter</button>}</div>
          <HeroBookCockpit projection={projection} onCommand={onCommand} busy={busy} error={error} />
        </div>
      </div>
    </main>
  );
}
