import React from 'react';
import './CapturedCards.css'

function CapturedCards({ cards }) {
  return (
    <div class="captured-cards">
      <h2>Captured Credit Cards</h2>
      <ul>
        {cards.map((card, index) => (
          <li key={index}>
            {card.cardNumber} from {card.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CapturedCards;
