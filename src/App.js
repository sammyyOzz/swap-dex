import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Backdrop from './components/UI/Backdrop/Backdrop'


import Exchange from './pages/Exchange/Exchange'
import VerifyRippleWallet from './pages/VerifyRippleWallet/VerifyRippleWallet'
import Landing from './pages/Landing/Landing';
import NotFound from './pages/NotFound/NotFound'


function App() {
  return (
    <Router>
      <Backdrop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
            
          <Route path="/wallet/:option" element={<VerifyRippleWallet />} />
            
          <Route path="/exchange" element={<Exchange />} />
            
          {/* <Route component={NotFound} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
