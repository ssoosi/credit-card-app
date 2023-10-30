import React, { useState } from 'react';
import CreditCardForm from './components/CreditCardForm';
import CapturedCards from './components/CapturedCards';
import './App.css'

function App() {
  const [capturedCards, setCapturedCards] = useState([]);
  const bannedCountries = ['South Africa', 'France']; // Add your banned countries here.

  const addCapturedCard = (card) => {
    if (!capturedCards.some((c) => c.cardNumber === card.cardNumber)) {
      setCapturedCards([...capturedCards, card]);
    }
  };

  return (
    <div className="App">
      <CreditCardForm onSubmit={addCapturedCard} bannedCountries={bannedCountries} />
      <CapturedCards cards={capturedCards} />
    </div>
  );
}

export default App;
