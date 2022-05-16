import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Backdrop from './components/UI/Backdrop/Backdrop'
import { useEffect } from 'react';

import Exchange from './pages/Exchange/Exchange'
import VerifyRippleWallet from './pages/VerifyRippleWallet/VerifyRippleWallet'
import Landing from './pages/Landing/Landing';
import NotFound from './pages/NotFound/NotFound'
import { useDispatch } from 'react-redux';
import { setAccountDatails } from './app/swift/swiftSlice';
import { Header } from './components/Navigation/header.component';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAccountDatails())
  }, [])

  return (
    <Router>
      <Backdrop />
      <Header />
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
