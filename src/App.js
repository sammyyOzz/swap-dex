import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Backdrop from './components/UI/Backdrop/Backdrop'
import { useEffect } from 'react';

import Exchange from './pages/Exchange/Exchange'
import VerifyRippleWallet from './pages/VerifyRippleWallet/VerifyRippleWallet'
import Landing from './pages/Landing/Landing';
import NotFound from './pages/NotFound/NotFound'
import { useDispatch, useSelector } from 'react-redux';
import { setAccountDatails, getAccountInfo } from './app/swift/swiftSlice';
import { Header } from './components/Navigation/header.component';


function App() {
  const dispatch = useDispatch()
  const swiftAccount = useSelector(state => state.swift.swiftAccount)

  useEffect(() => {
    dispatch(setAccountDatails())
  }, [])

  useEffect(() => {
    if (swiftAccount?.account_ID) {
      dispatch(getAccountInfo({ urlParams: `/${swiftAccount?.account_ID}`})).then(res => console.log(res))
    }
  }, [swiftAccount])

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
