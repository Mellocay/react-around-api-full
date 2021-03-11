import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddCardPopup from './AddCardPopup.js'
import PopupWithImage from './PopupWithImage';
import Footer from './Footer.js';
import Api from '../utils/Api';
import Register from './Register.js';
import Login from './Login.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute.js';
import ResultPopup from './PopupResult.js';
import * as auth from '../utils/authorization.js';

function App() {

  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  const api = React.useMemo(() => {
    return new Api({
      baseUrl: "https://api.caylamello.students.nomoreparties.site",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
  }, [token]);

// Call server for Profile/User Content
React.useEffect(() => {
  if (token) {
  api.getUserInfo().then((res) => {
    setCurrentUser(res);
  })
    .catch(err => console.log(err));

  // Call server to get initial cards
  api.getCardList().then(res => {
    setCards(res.map((card) => ({
      link: card.link,
      name: card.name,
      likes: card.likes,
      _id: card._id,
      owner: card.owner
    })))
  })
    .catch(err => console.log(err));
  }
}, [api, token]);

  function handleCheckToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res.err) {
            console.log('Error!');
          }
          setEmail(res.email);
          setLoggedIn(true);
          setToken(jwt);
          history.push('/');
        })
        .catch(err => console.log(err))
    }
  }

  React.useEffect(() => {
    handleCheckToken();
  },);

  // set state for Cards
  const [cards, setCards] = React.useState([]);

  // set states for Popups
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);

  // handler functions for Popups
  function handleEditAvatarClick(evt) {
    setIsEditAvatarOpen(true);
  }
  function handleEditProfileClick(evt) {
    setIsEditProfileOpen(true);
  }
  function handleAddCardClick(evt) {
    setIsAddCardOpen(true);
  }
  // function handleDeleteCardClick(evt) {
  //   setIsDeletePopupOpen(true);
  // }

  //close popups
  function handleClosePopups(evt) {
    // if(evt.target !== evt.currentTarget) return
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddCardOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsResultPopupOpen(false);
  }

  // set image popup state
  const [selectedLink, setSelectedLink] = React.useState('');
  const [selectedName, setSelectedName] = React.useState('');

  // handler function for image popup
  function handleCardClick(link, name) {
    setSelectedLink(link);
    setSelectedName(name);
    setIsImagePopupOpen(true);
  }

  //control likes and unlikes
  function handleCardLikeStatus(card) {
    // Check one more time if this card was already liked

    const isLiked = card.likes.some((i) => i === currentUser._id);
    let res;

    if (isLiked === false) {
      res = api.cardLikeAdd(card._id)
    } else {
      res = api.cardLikeRemove(card._id)
    }
    res.then((newCard) => {
      // Create a new array based on the existing one and putting a new card into it
      const newCards = cards.map((c) => c._id === card._id ? newCard : c)
      // Update the state
      setCards(newCards);
    })
      .catch(err => console.log(err));
  }

  function handleDeleteCard(card) {
    api.removeCard(card._id).then(() => {
      const cardListCopy = cards.filter(c => c._id !== card._id);
      setCards(cardListCopy);
    })
      .catch(err => console.log(err))
  }

  // update and set Profile
  function handleUpdateProfile(userInfo) {
    api.setUserInfo(userInfo).then(res => {
      setCurrentUser({ ...setCurrentUser, name: res.data.name, about: res.data.about, avatar: res.data.avatar })
    })
      .then(() => { handleClosePopups() })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setUserAvatar({ avatar }).then(res => {
      setCurrentUser({ ...setCurrentUser, avatar: res.data.avatar, name: res.data.name, about: res.data.about })
    })
      .then(() => { handleClosePopups() })
      .catch(err => console.log(err));
  }

  function handleAddNewCard(cardInfo) {
    api.addCard(cardInfo, token).then(newCard =>
      setCards([newCard, ...cards]))
      .then(() => { handleClosePopups() })
      .catch(err => console.log(err));
  }

  // states for Registration and Login
  const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');

  function handleRegistration(email, password) {
    auth.register(email, password)
    .then((res) => {
        if (res.err || !res) {
          setIsSuccessful(false);
          setIsResultPopupOpen(true);
        } else {
          setIsSuccessful(true);
          setIsResultPopupOpen(true);
          history.push('/signin');
        }
      })
      .catch(err => console.log(err))
  }

  function handleSignout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    history.push('/signin');
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        if (!res) {
          setIsSuccessful(false);
          setIsResultPopupOpen(true);
        } if (res.err) {
          setIsSuccessful(false);
          setIsResultPopupOpen(true);
        }
        handleCheckToken();
      })
      .catch((err) => {
        setIsSuccessful(false);
        setIsResultPopupOpen(true);
      })
  };

  // app JSX
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/signup">
            <Header link="/signin" linkName={"Sign in"} />
            <Register handleRegistration={handleRegistration} />
          </Route>
          <Route path="/signin">
            <Header link="/signup" linkName={"Sign up"} />
            <Login handleLogin={handleLogin} />
          </Route>
          <ProtectedRoute path="/"
            component={Main}
            email={email}
            loggedIn={loggedIn}
            onClick={handleSignout}
            onClose={handleClosePopups}
            handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleAddCardClick={handleAddCardClick}
            // handleDeleteCardClick={handleDeleteCardClick}
            handleDeleteCard={(card) => { handleDeleteCard(card) }}
            handleCardClick={(link, name) => { handleCardClick(link, name) }}
            cards={cards}
            handleCardLikeStatus={(card) => handleCardLikeStatus(card)} />
        </Switch>
        {/* Avatar Popup JSX */}
        <EditAvatarPopup isOpen={isEditAvatarOpen} onClose={handleClosePopups} handleUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfileOpen} onClose={handleClosePopups} handleUpdateProfile={handleUpdateProfile} />

        {/* AddCard Popup JSX */}
        <AddCardPopup isOpen={isAddCardOpen} onClose={handleClosePopups} handleAddNewCard={handleAddNewCard} />

        {/* Delete Popup JSX */}
        <PopupWithForm name="delete" title="Are you sure?" buttonText="Yes" isOpen={isDeletePopupOpen} onClose={handleClosePopups} onClick={handleDeleteCard} />

        {/* Image Popup JSX */}
        <PopupWithImage link={selectedLink} name={selectedName} isOpen={isImagePopupOpen} onClose={handleClosePopups} />

        {/* Registration Result Popup JSX */}
        <ResultPopup name="result" title="You are registered!" isOpen={isResultPopupOpen} onClose={handleClosePopups} valid={isSuccessful} />

        <Footer />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
