import logo from './logo.svg';
import './App.css';
import Chatbot from './components/chatbot';
import React, { Suspense } from 'react';
import { useState, createContext, useContext } from "react";

export const LanguageContext = createContext()
export const VoiceContext = createContext()

function App() {
  const [language, setLanguage] = useState({en: "en-US"});
  const [isVoiceOn, setIsVoiceOn] = useState(false);
  

  return (
    <LanguageContext.Provider value={language}>
    <VoiceContext.Provider value={isVoiceOn}>
      <Suspense fallback="loading">
        <div className="App bg-white">
            <Chatbot setLanguage={setLanguage} setIsVoiceOn={setIsVoiceOn} />
        </div>
      </Suspense>
    </VoiceContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;