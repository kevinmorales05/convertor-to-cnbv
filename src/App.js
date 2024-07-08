import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header.tsx';
import Convertidor from './pages/Convertidor/Convertidor.tsx';

function App() {
  return (
    <div className="App">
      <Header />
      <Convertidor />

    </div>
  );
}

export default App;
