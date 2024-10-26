import Keyboard from './components/Keyboard';
import Guesses from './components/Guesses/Guesses';
import './App.css';
import Header from './components/Header';
import StatsModal from './components/StatsModal';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        <Guesses />
        <Keyboard />
      </main>
      <StatsModal />
    </>
  );
}

export default App;
