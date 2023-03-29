import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './Context/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';


function App() {

  // for dark mode and light mode
  const [theme, setTheme] = useState('light');

  const toggleMode = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.body.style.backgroundColor = '#0b3441'
      
    }
    else  {
      setTheme('light');
      document.body.style.backgroundColor = 'white'
    }
  }

  //for Alert
  const[alert, setAlert] = useState(null);

const showAlert = (message, type)=>{
  setAlert({
    msg:message,
    type:type
  })
  setTimeout(()=>{
    setAlert(null);
  },2000);
}

  return (
    <>
    <NoteState>
      <Router>
        <Navbar theme={theme} toggleMode={toggleMode} />
        <Alert alert={alert}/>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} theme={theme}/>} >
          </Route>
          <Route exact path="/about" element={<About />}>
          </Route>
          <Route exact path="/login" element={<Login showAlert={showAlert} theme={theme} />}  >
          </Route>
          <Route exact path="/signup" element={<Signup showAlert={showAlert} theme={theme} />} >
          </Route>
        </Routes>
      </Router>
    </NoteState>

    </>

  );
}

export default App;
