import React from 'react'
import Header from './components/Header';
import Log from './pages/Log';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import { useSelector } from 'react-redux';
import NotFound from './pages/NotFound';

const App = () => {

  const isUserLoggedIn = useSelector(state => state.isLoggedIn);

  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path='/react-auth-app' element={<Dashboard />} />
        {!isUserLoggedIn && <Route path='/react-auth-app/login' element={<Log />} />}
        {isUserLoggedIn && <Route path='/react-auth-app/profile' element={<Profile />} />}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
