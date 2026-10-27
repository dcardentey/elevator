import Elevator from './components/Elevator';

export default function App() {
  return <>
    <a className="skip-link" href="#floor-title">Saltar a los pisos</a>
    <main id="main" className="cabin-view" aria-label="Interior del ascensor Dailyverse">
      <Elevator />
    </main>
  </>;
}
