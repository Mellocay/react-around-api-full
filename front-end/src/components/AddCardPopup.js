import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddCardPopup(props) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');
  
  function handleCardNameChange(evt) {
    setCardName(evt.target.value);
  }
  
  function handleCardLinkChange(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.handleAddNewCard({
      name: cardName,
      link: cardLink
    });
    setCardName('');
    setCardLink('');
  }

  return(
    <PopupWithForm name="add-card" title="New Place" buttonText="Create" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
        <input id="card-title" type="text" value={cardName} placeholder="title" className="popup__input popup__input_title" name="name" required minLength="1" maxLength="30" onChange={handleCardNameChange} />
        <span id="card-title-error" className="popup__error popup__error_visible"></span>
        <input id="card-url" type="url" value={cardLink} placeholder="image link" className="popup__input popup__input_image-link" name="link" required onChange={handleCardLinkChange} />
        <span id="card-url-error" className="popup__error popup__error_visible"></span>
      </PopupWithForm>
  )
}