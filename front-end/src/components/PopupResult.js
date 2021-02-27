import React from "react";
import successful from "../images/successful.svg";
import failed from "../images/failed.svg";

export default function PopupResult(props) {
  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? "popup_active" : ""}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button className="button button__close" onClick={props.onClose}></button>
        <img src={props.valid ? successful : failed} alt={props.valid ? "Boom graphic" : "uh oh, turtle on back"} className="popup__image_boom" />
        <h2 className="popup__title popup__title_type_centered">{ props.valid ? "Success! You have now been registered." : "Oops, something went wrong! Please try again." }</h2>
      </div>
    </section>
  );
}
