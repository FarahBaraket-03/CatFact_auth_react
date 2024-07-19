import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import {QueryClient,QueryClientProvider} from 'react-query'



const root = ReactDOM.createRoot(document.getElementById('root'));
const client=new QueryClient();
root.render(
  
  <React.StrictMode>
    <QueryClientProvider client={client}>
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<h1 className='text-center'>No Page Found ...</h1>} />
        </Routes>
      </Router>
      </QueryClientProvider>
  </React.StrictMode>
);


