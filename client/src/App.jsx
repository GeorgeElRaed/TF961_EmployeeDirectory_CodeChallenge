import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeDetails from './components/EmployeeDetails';
import EmployeesGrid from './components/EmployeeGrid';
import HideAppBar from './components/HideAppBar';
import Home from './components/Home';
import SignIn from './components/SignIn';

function App() {
  const [token, setToken] = useState(localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN));



  if (!token)
    return <SignIn setToken={setToken} />
  else
    localStorage.setItem(process.env.REACT_APP_LOGIN_TOKEN, token)


  return (
    <>
      <HideAppBar style={{ height: '50vh' }}>
        <Button variant="contained" color="secondary" href="/" >
          <Typography>Home</Typography>
        </Button>
        <Button variant="contained" color="secondary" href="/employees" >
          <Typography>Employees</Typography>
        </Button>
      </HideAppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<EmployeesGrid />} />
        <Route path="/employees/:username" element={<EmployeeDetails />} />
      </Routes>
    </>
  );
}

export default App;
