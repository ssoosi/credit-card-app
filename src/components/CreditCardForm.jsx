import React, { useState } from 'react';
import './CreditCardForm.css';

function CreditCardForm({ onSubmit, bannedCountries }) {
  const [cardNumber, setCardNumber] = useState('');
  const [country, setCountry] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [capturedCards, setCapturedCards] = useState([]);

  const handleSubmit = () => {
    if (cardNumber.trim() === '' || country.trim() === '') {
      setValidationMessage('Please fill in both fields.');
    } else if (bannedCountries.includes(country)) {
      setValidationMessage('This country is not allowed.');
    } else {
      const newCard = { cardNumber, country };
      if (isDuplicate(newCard)) {
        setValidationMessage('This card is already captured.');
      } else {
        onSubmit(newCard);
        setValidationMessage(''); // Clear any previous validation messages.
        setCardNumber(''); // Clear the card number input.
        setCountry(''); // Clear the country input.
      }
    }
  }

  const isDuplicate = (newCard) => {
    return capturedCards.some((card) => card.cardNumber === newCard.cardNumber && card.country === newCard.country);
  }

  return (
    <div className="credit-card-form">
      <h2>Capture Credit Card</h2>
      {validationMessage && <div className="validation-message">{validationMessage}</div>}
      <div className="input-group">
        <input
          type="tel" // Set the type to "tel" for numeric input
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          maxLength={16}
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default CreditCardForm;
