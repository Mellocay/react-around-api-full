import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {
  // subscribing to UserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Checking if you are the owner of the current card
  const isOwn = props.card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = (
    ` button button__remove ${isOwn ? ' button__remove_visible' : ' button__remove_hidden'}`
  ); 

  // Check if the card was liked by the current user
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = (
    `button button__like ${isLiked ? ' button__like_activated' :''}`
  ); 

  function handleLikeClick() {
    props.handleCardLikeStatus(props.card);
  }

function handleDeleteClick() {
  props.handleDeleteCard(props.card);
}

  return (
    <li className="card__item">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <div className="card__image" onClick={props.handleCardClick} style={{backgroundImage: `url(${props.src})`}}>
      </div>
      <div className="card__base">
        <h3 className="card__title">{props.name}</h3>
        <div className="card__likes">  
          <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="card__like-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;