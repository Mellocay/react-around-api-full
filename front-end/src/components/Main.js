import React from 'react';
import Card from './Card.js';
import Header from './Header';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);
  
  // JSX for Main section
  return (
    <main className="main">
      <Header email={props.email} link='/signin' linkName='Logout' onClick={props.onClick} />
  {/* Profile JSX */}
      <section className="profile">
        <div className="profile__image-section">
          <img src={currentUser.avatar} className = "profile__image" alt={currentUser.name} />
          <button className="profile__image_edit-button" onClick={props.handleEditAvatarClick}></button>
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{currentUser.name}</h2>
          <p className="profile__occupation">{currentUser.about}</p>
        </div>
        <button className="button button__edit" onClick={props.handleEditProfileClick} aria-label="Edit Profile"></button>
        <button className="button button__add" aria-label="Add Picture Card" onClick={props.handleAddCardClick}></button>
      </section>

  {/* Card JSX */}
      <section className="card">
        <ul className="card__items">
          {props.cards.map((card, index) => {
            return (
            <Card 
              key={index}
              card={card}
              src={card.link}
              name={card.name} 
              likes={card.likes}
              _id={card._id}
              owner={card.owner}
              // handleDeleteCardClick={props.handleDeleteCardClick}
              handleDeleteCard={(card) => {props.handleDeleteCard(card)}}
              handleCardClick={() => props.handleCardClick(card.link, card.name)}
              handleCardLikeStatus={(card) => {props.handleCardLikeStatus(card)}}/>
            )
          })}
        </ul>
      </section>
        
    </main>
  );
}

export default Main;