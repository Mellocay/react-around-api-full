import React from 'react';

function PopupWithImage(props) {
  return (
    <section className={`popup popup_type_image ${props.isOpen ? "popup_active" : ""}`} onClick={props.onClose}>
        <div className="popup__container popup__container_type_image">
          <button className="button button__close" onClick={props.onClose}></button>
          <figure className="popup__figure">
            <img className="popup__image" alt={props.name} src={props.link}/>
            <figcaption className="popup__caption">{props.name}</figcaption>
          </figure>
        </div>
      </section>
  );
}

export default PopupWithImage;