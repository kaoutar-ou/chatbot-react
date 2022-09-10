import logo from './logo.svg';
import './App.css';
import Chatbot from './components/chatbot';
import React, { Suspense } from 'react';
import { useState, createContext, useContext } from "react";

export const LanguageContext = createContext()

function App() {
  const [language, setLanguage] = useState({en: "en-US"});
  

  return (
    <LanguageContext.Provider value={language}>
      <Suspense fallback="loading">
        <div className="App">
            <Chatbot setLanguage={setLanguage} />
        </div>
      </Suspense>
    </LanguageContext.Provider>
  );
}

export default App;
