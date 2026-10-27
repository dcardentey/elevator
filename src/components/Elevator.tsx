import { useEffect, useRef, useState, type AnimationEvent } from 'react';
import { apps, type DailyApp } from '../apps';
import { ElevatorDoors } from './ElevatorDoors';
import { FloorPanel } from './FloorPanel';

type Phase = 'idle' | 'selected' | 'moving' | 'arriving' | 'opening' | 'redirecting';

export function FloorIndicator({ app, busy }: { app: DailyApp | null; busy: boolean }) {
  return <div className="indicator" aria-label={app ? `Destino: piso ${app.floor}` : 'Planta baja'}><span className={busy ? 'direction active' : 'direction'} aria-hidden="true">▲</span><span className="indicator-number">{app ? String(app.floor).padStart(2, '0') : 'PB'}</span><span className="indicator-caption">{busy ? 'DESTINO' : 'VESTÍBULO'}</span></div>;
}

export default function Elevator() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [selected, setSelected] = useState<DailyApp | null>(null);
  const locked = useRef(false);
  const navigated = useRef(false);
  const busy = phase !== 'idle';

  function navigate(app: DailyApp) {
    if (navigated.current) return;
    navigated.current = true;
    setPhase('redirecting');
    window.location.assign(app.url);
  }

  function selectFloor(app: DailyApp) {
    if (locked.current) return;
    locked.current = true;
    setSelected(app);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) navigate(app);
    else setPhase('selected');
  }

  // The CSS animation clock advances the state machine; the timeout only
  // recovers from a missing animationend (for example a browser extension).
  useEffect(() => {
    if (!selected || phase === 'idle' || phase === 'redirecting') return;
    const recovery = window.setTimeout(() => navigate(selected), 3500);
    return () => window.clearTimeout(recovery);
  }, [phase, selected]);

  useEffect(() => {
    function resetOnReturn() { locked.current = false; navigated.current = false; setPhase('idle'); setSelected(null); }
    window.addEventListener('pageshow', resetOnReturn);
    return () => window.removeEventListener('pageshow', resetOnReturn);
  }, []);

  function advance(event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.animationName === 'floor-selected' && phase === 'selected') setPhase('moving');
    if (event.animationName === 'elevator-moving' && phase === 'moving') setPhase('arriving');
    if (event.animationName === 'elevator-arriving' && phase === 'arriving') setPhase('opening');
    if (event.animationName === 'door-open-left' && phase === 'opening' && selected) navigate(selected);
  }

  return <div className={`experience phase-${phase}`}>
    <div className="cabin-architecture" aria-hidden="true">
      <div className="cabin-ceiling"><div className="ceiling-lamp" /></div>
      <div className="cabin-wall cabin-wall-left"><div className="wall-mirror" /><div className="handrail" /></div>
      <div className="cabin-wall cabin-wall-right"><div className="handrail" /></div>
      <div className="cabin-floor" />
    </div>
    <div className="cabin-front">
    <header className="cabin-brand"><span className="eyebrow">DEPARTAMENTO DE VIAJES ENTRE DAILIES</span><h1>The <em>Dailyverse</em></h1><p>Cinco pisos. Cinco universos. Una daily de dudosa cordura.</p></header>
    <div className="elevator-stage">
      <div className="elevator" onAnimationEnd={advance}>
        <div className="elevator-crown"><span /> <span className="crown-symbol" aria-hidden="true">✦</span> <span /></div>
        <div className="elevator-header"><span className="header-flourish" aria-hidden="true">⌜</span><FloorIndicator app={selected} busy={busy} /><span className="header-flourish" aria-hidden="true">⌝</span></div>
        <div className="door-frame"><ElevatorDoors app={selected} onAnimationEnd={advance} /></div>
        <div className="elevator-base" />
      </div>
      <div className="capacity">CAPACIDAD: UN EQUIPO · PESO MÁXIMO: EL DEL SPRINT</div>
    </div>
    <div className="control-column"><FloorPanel apps={apps} selected={selected} busy={busy} onSelect={selectFloor} />
      <div className="travel-status" role="status" aria-live="polite" aria-atomic="true"><span className={`status-light ${busy ? 'busy' : ''}`} /><p>{selected ? phase === 'redirecting' ? 'Has llegado. Abriendo tu universo…' : selected.travelMessage : 'El ascensor está listo. Tu daily, ya veremos.'}</p></div>
      {phase === 'redirecting' && selected && <a className="fallback-link" href={selected.url}>Entrar en {selected.name} ↗</a>}
      <div className="concierge-note"><span aria-hidden="true">✧</span><p>Deja los bloqueos en recepción.<br /><em>O llévatelos. Aquí no juzgamos.</em></p></div>
    </div>
    </div>
    <div className="cabin-floor-label"><span aria-hidden="true">DISFRUTA DEL TRAYECTO</span><small className="cabin-copyright">© 2026 Dianette Cardentey Chaple</small></div>
  </div>;
}
