import React, { useState, useEffect, useRef } from 'react';

const qa = {
  'emergency call': 'For immediate emergency assistance for flood relief, dial 112',
  'nearest relief camp': 'Please move to Government Model School Thrissur',
  'water enters home': 'Please move to nearest relief camp.',
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const listRef = useRef(null);

  useEffect(() => {
    setMessages([{ text: 'Hello — I am the Helpr offline bot. Ask one of the quick questions or type your query.', isBot: true }]);
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  function addUserMessage(text) {
    setMessages(prev => [...prev, { text, isBot: false }]);
  }

  function addBotMessage(text) {
    setMessages(prev => [...prev, { text, isBot: true }]);
  }

  function findAnswer(text) {
    const t = text.toLowerCase();
    if (t.includes('emerg') || t.includes('112') || t.includes('call')) return qa['emergency call'];
    if (t.includes('relief') || t.includes('camp') || t.includes('nearest')) return qa['nearest relief camp'];
    if (t.includes('water') && (t.includes('enter') || t.includes('home') || t.includes('inside'))) return qa['water enters home'];
    return "Sorry I don't have a precise answer for that. Try one of the quick options below.";
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    addUserMessage(text);
    setInput('');
    setTimeout(() => {
      addBotMessage(findAnswer(text));
    }, 200);
  }

  return (
    <div className="chat-root">
      <h2>Offline Chatbot</h2>
      <div className="chat-window" ref={listRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.isBot ? 'bot' : 'user'}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-controls">
        <input
          type="text"
          placeholder="Type your question (offline)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
        />
        <button className="primary" onClick={handleSend}>Send</button>
      </div>

      <div className="quick-buttons">
        <button className="secondary" onClick={() => { addUserMessage('emergency call'); setTimeout(() => addBotMessage(qa['emergency call']), 200); }}>Emergency call</button>
        <button className="secondary" onClick={() => { addUserMessage('nearest relief camp'); setTimeout(() => addBotMessage(qa['nearest relief camp']), 200); }}>Nearest relief camp</button>
        <button className="secondary" onClick={() => { addUserMessage('What should I do if water enters my home'); setTimeout(() => addBotMessage(qa['water enters home']), 200); }}>If water enters my home</button>
      </div>
    </div>
  );
}

export default Chatbot;
