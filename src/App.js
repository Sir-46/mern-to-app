import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

import Header from './components/header.component';

function App() {
  
  return (
    <Router>
      <div>
        <Header />
      </div>
    </Router>
  );
}

export default App;
