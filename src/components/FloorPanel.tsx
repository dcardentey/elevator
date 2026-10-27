import type { DailyApp } from '../apps';

interface FloorButtonProps { app: DailyApp; selected: boolean; disabled: boolean; onSelect: (app: DailyApp) => void }

export function FloorButton({ app, selected, disabled, onSelect }: FloorButtonProps) {
  return <button className={`floor-button ${selected ? 'is-selected' : ''}`} disabled={disabled} onClick={() => onSelect(app)} aria-label={`Piso ${app.floor}: ${app.name}`} aria-pressed={selected}>
    <span className="floor-number" aria-hidden="true">{app.floor}</span>
    <span className="floor-copy"><span className="floor-name">{app.name}</span><span className="floor-description">{app.shortDescription}</span></span>
    <span className="floor-emoji" aria-hidden="true">{app.emoji}</span>
  </button>;
}

export function FloorPanel({ apps, selected, busy, onSelect }: { apps: DailyApp[]; selected: DailyApp | null; busy: boolean; onSelect: (app: DailyApp) => void }) {
  return <section className="floor-panel" aria-labelledby="floor-title">
    <span className="screw screw-tl" aria-hidden="true" /><span className="screw screw-tr" aria-hidden="true" />
    <div className="panel-heading"><span className="eyebrow">DIRECTORIO DE UNIVERSOS</span><h2 id="floor-title">¿A qué piso vamos?</h2><p>Elige tu destino. Lo demás es cosa del ascensor.</p></div>
    <div className="floor-list">{[...apps].sort((a, b) => b.floor - a.floor).map(app => <FloorButton key={app.id} app={app} selected={selected?.id === app.id} disabled={busy} onSelect={onSelect} />)}</div>
    {apps.length === 0 && <p className="empty-state">El edificio está de reformas. Pronto habrá nuevos destinos.</p>}
    <div className="panel-bottom"><span aria-hidden="true">↗</span> Un botón. Otro universo.</div>
    <span className="screw screw-bl" aria-hidden="true" /><span className="screw screw-br" aria-hidden="true" />
  </section>;
}
