import React from "react";

function PopupWithForm(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_active" : ""}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button className="button button__close" onClick={props.onClose}></button>
        <form action="submit" onSubmit={props.onSubmit} className={`popup__form popup__form_type_${props.name}`} noValidate>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="button button__submit button__submit_disabled">{props.buttonText}</button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;