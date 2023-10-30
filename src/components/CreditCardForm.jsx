import React, { useState } from 'react';
import './CreditCardForm.css';

function CreditCardForm({ onSubmit, bannedCountries }) {
  const [name, setName] = useState(''); // Add state for the name input
  const [cardNumber, setCardNumber] = useState('');
  const [country, setCountry] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [capturedCards, setCapturedCards] = useState([]);

 // Function to format the credit card number
 const formatCardNumber = (inputValue) => {
  // Remove non-numeric characters and spaces
  const numericValue = inputValue.replace(/\D/g, '');

  // Use regex to split into groups of 4 digits
  const formattedValue = numericValue.replace(/(\d{4})/g, '$1 ').trim();

  return formattedValue;
};  

const handleCardNumberChange = (e) => {
  const inputText = e.target.value;
  const formattedNumber = formatCardNumber(inputText);
  setCardNumber(formattedNumber);
};

  const handleSubmit = () => {
    if (cardNumber.trim() === '' || country.trim() === '' || name.trim() === '') {
      setValidationMessage('Please fill in the fields.');
    } else if (bannedCountries.includes(country)) {
      setValidationMessage('This country is not allowed.');
    } else {
      const newCard = { cardNumber, country, name };
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
    return capturedCards.some((card) =>
      card.cardNumber === newCard.cardNumber && card.country === newCard.country
    );
  }

  return (
    <div className="credit-card-form">
      <h2>Capture Credit Card</h2>
      {validationMessage && <div className="validation-message">{validationMessage}</div>}
      <div className="input-group">
      <input
          type="text"
          placeholder="Card Holder's Name" // Add the name input
          value={name} // Bind it to the state
          onChange={(e) => setName(e.target.value)} // Handle changes
        />
        <input
          type="text" 
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange} // Handle card number changes
          maxLength={19} // Adjust the maximum length considering spaces
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
