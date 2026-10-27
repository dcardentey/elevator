import type { AnimationEvent, CSSProperties } from 'react';
import type { DailyApp } from '../apps';

export function DestinationPreview({ app }: { app: DailyApp | null }) {
  return <div className="destination" style={{ '--destination-color': app?.themeColor ?? '#715c36' } as CSSProperties} aria-hidden="true">
    <div className="orbit orbit-one" /><div className="orbit orbit-two" />
    <span className="destination-emoji">{app?.emoji ?? '✧'}</span>
    <span className="eyebrow">BIENVENIDO AL PISO {app?.floor}</span><span className="destination-name">{app?.name}</span>
  </div>;
}

export function ElevatorDoors({ app, onAnimationEnd }: { app: DailyApp | null; onAnimationEnd: (event: AnimationEvent<HTMLDivElement>) => void }) {
  return <div className="doorway">
    <DestinationPreview app={app} />
    <div className="door door-left" onAnimationEnd={onAnimationEnd}><div className="door-inlay" /><div className="door-medallion">D</div></div>
    <div className="door door-right"><div className="door-inlay" /><div className="door-medallion">V</div></div>
    <div className="door-seam" /><div className="threshold" />
  </div>;
}
