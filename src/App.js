import React, { useState } from 'react';
import './App.css';
import Checklist from './components/Checklist';
import Chatbot from './components/Chatbot';
import Volunteers from './components/Volunteers';
import Donation from './components/Donations';
import RequestHelp from './components/RequestHelp';
import RequestResource from './components/RequestResource';

function App() {
  const [page, setPage] = useState('checklist');

  return (
    <div className="App">
      <header className="app-header">
        <div className="left">
          <h1>Helpr</h1>
          <div className="tag">Offline emergency helper</div>
        </div>

        <nav className="nav">
          <button onClick={() => setPage('checklist')}>Checklist</button>
          <button onClick={() => setPage('chatbot')}>Chatbot</button>
          <button onClick={() => setPage('volunteers')}>Volunteers</button>
          <button onClick={() => setPage('donation')}>Donate</button>
          <button onClick={() => setPage('request')}>Request Help</button>
          <button onClick={() => setPage('RequestResource')}>Request Resources</button>
        </nav>
      </header>

      <main className="main">
        {page === 'checklist' && <Checklist />}
        {page === 'chatbot' && <Chatbot />}
        {page === 'volunteers' && <Volunteers />}
        {page === 'donation' && <Donation />}
        {page === 'request' && <RequestHelp />}
        {page === 'RequestResource' && <RequestResource />}
      </main>

      <footer className="app-footer">Helpr — built to work offline for critical info</footer>
    </div>
  );
}

export default App;

