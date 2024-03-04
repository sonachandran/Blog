import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Bloghome from './Bloghome';
import Registration from './Registration';
import Appnav from './Appnav';
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import Profile from './Createblog';
import Createblog from './Createblog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route>
        <Route path='/'element={<Appnav/>}>
         <Route index element={<Bloghome/>}/>
         <Route path='/bloghome' element={<Bloghome/>}/>
         <Route path='/registration'element={<Registration/>}/> 
         <Route path='/login' element={<Login/>}/>
         <Route path='/createblog' element={<Createblog/>}/>
        
   </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
