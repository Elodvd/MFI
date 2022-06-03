import MapWrapper from './components/MapWrapper/MapWrapper';
import Chart from './components/Chart/Chart';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1 className='text-red-600'>My app</h1>
      <MapWrapper />
    <Chart chartOptions={[10,15,25]} />
    
    </div>
  );
}

export default App;
