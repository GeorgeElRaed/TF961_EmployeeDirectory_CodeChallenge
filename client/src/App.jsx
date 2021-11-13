import './App.css';
import { useState } from 'react';
import SignIn from './pages/SignIn'
import HideAppBar from './components/HideOnScroll';

function App() {

  const [token, setToken] = useState(localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN));

  if (!token)
    return <SignIn setToken={setToken} />
  else
    localStorage.setItem(process.env.REACT_APP_LOGIN_TOKEN, token)

  return (
    <>
      hello    </>
  );
}

export default App;
