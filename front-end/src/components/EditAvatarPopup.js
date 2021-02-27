import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const avatarInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.handleUpdateAvatar(
      avatarInput.current.value
    )
  } 

  return (
    <PopupWithForm name="edit-avatar" title="Change Profile Picture" buttonText="Save" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
      <input ref={avatarInput} id="avatar-URL" type="url"  placeholder="enter avatar link here" className="popup__input popup__input_avatar-URL" name="avatarURL" required minLength="2" />
      <span id="avatar-URL-error" className="popup__error popup__error_visible"></span>
    </PopupWithForm>
  )
}