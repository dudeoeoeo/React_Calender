import logo from './logo.svg';
import './App.css';
import Calender from './components/Calender';

const date = new Date();

function App() {
  return (
    <div className="App">
      <Calender date={date}/>
    </div>
  );
}

export default App;
