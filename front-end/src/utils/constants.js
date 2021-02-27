import oregonNightSky from "../images/oregon-sky.jpg";
import multnomahFalls from "../images/multnomah-falls.jpg";
import mtHood from "../images/mt-hood.jpg"
import haystackRock from "../images/haystack-rock.jpg";
import ecolaPark from "../images/ecola-park.jpg"
import craterLake from "../images/crater-lake.jpg"

// const popupImage = document.querySelector(".popup_type_image");

const formEditAvatar = document.querySelector(".popup__form_type_edit-avatar")
const formEdit = document.querySelector(".popup__form_type_edit-button");
const formAdd = document.querySelector(".popup__form_type_add-button");

const buttonEdit = document.querySelector(".button__edit");
const buttonAdd = document.querySelector(".button__add");

const inputName = document.querySelector(".popup__input_name");
const inputOccupation = document.querySelector(".popup__input_occupation");

const initialCards = [
  {
      name: "Oregon Night Sky",
      link: oregonNightSky
  },
  {
      name: "Multnomah Falls, Oregon",
      link: multnomahFalls
  },
  {
      name: "Mt. Hood, Oregon",
      link: mtHood
  },
  {
      name: "Haystack Rock, Oregon",
      link: haystackRock
  },
  {
      name: "Ecola State Park, Oregon",
      link: ecolaPark
  },
  {
      name: "Crater Lake, Oregon",
      link: craterLake
  }
];

const defaultConfig = {
  inputSelector: ".popup__input",
  submitButton: ".button__submit",
  inactiveButtonClass: "button__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

const popupConfig = {
  popupEdit: ".popup_type_edit-button",
  popupEditAvatar: ".popup_type_edit-avatar",
  popupAdd: ".popup_type_add-button",
  popupImage: ".popup_type_image",
  popupDelete: ".popup_type_delete"
};

const profileConfig = {
  profileName: "profile__name",
  profileDescription: "profile__occupation"
};

const cardsConfig = {
  placesWrap: ".card__items"
};

const cardSelector = ".card__template";
const profileAvatar = document.querySelector(".profile__image");
const avatarEditButton = document.querySelector(".profile__image_edit-button");
const submitButton = document.querySelector(".button__submit");

export { formEditAvatar, formEdit, formAdd, buttonEdit, buttonAdd, inputName, inputOccupation, initialCards, defaultConfig, popupConfig, profileConfig, cardsConfig, cardSelector, profileAvatar, avatarEditButton, submitButton };