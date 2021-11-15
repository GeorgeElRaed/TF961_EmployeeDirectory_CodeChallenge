import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeesGrid from './components/EmployeeGrid';
import Home from './components/Home';
import SignIn from './components/SignIn';
import ToolBar from './components/ToolBar';

function App() {
  const [token, setToken] = useState(localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN));



  if (!token)
    return <SignIn setToken={setToken} />
  else
    localStorage.setItem(process.env.REACT_APP_LOGIN_TOKEN, token)


  return (
    <>
      <ToolBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<EmployeesGrid />} />
        <Route path="/employees/:username" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}

export default App;
