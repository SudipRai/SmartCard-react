import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from 'react-router-dom'
import Container from './Pages/Container';


function App() {

  return (
  <BrowserRouter>
    <div className="App">
      <Container></Container>
    </div>
    </BrowserRouter>
  );
}

export default App;
