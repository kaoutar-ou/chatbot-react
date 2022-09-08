import logo from './logo.svg';
import './App.css';
import Chatbot from './components/chatbot';
import React, { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback="loading">
      <div className="App">
          <Chatbot />
      </div>
    </Suspense>
  );
}

export default App;
