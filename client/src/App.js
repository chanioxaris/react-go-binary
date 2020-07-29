import React, { useState} from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const App = () => {
  return (
   <BrowserRouter>
       <Switch>
           <Route exact path='/ping'>
               <Ping />
           </Route>
           <Route exact path='/'>
               <Home />
           </Route>
       </Switch>
   </BrowserRouter>
  );
};

const Home = () => {
    return (
        <div>
            <NavBar />

            <div id='page'>
                <h3>Served by Golang server from a single binary file</h3>
            </div>
        </div>
    );
};

const Ping = () => {
    const [notification, setNotification] = useState('');

    const handlePing = async () => {
        try {
            const response = await axios.get('/api/ping');
            setNotification(`Successful ping with response: ${response.data}`);
        } catch (e) {
            setNotification('Failed to ping');
        }

        setTimeout(() => setNotification(''), 2000);
    }

    return (
        <div>
            <NavBar />

            <div id='page'>
                <p>{notification}</p>

                <button onClick={handlePing}>Ping</button>
            </div>
        </div>
    );
};

const NavBar = () => {
    return (
        <div>
            <ul id='nav'>
                <li><a href='/'>Home</a></li>
                <li><a href='/ping'>Ping</a></li>
            </ul>
        </div>
    );
};

export default App;
