 import firebase from 'firebase';
  const config = {
    apiKey: "AIzaSyB2o8UtHNBexSNE2r9RAaP9SBKS0MYVK4c",
    authDomain: "chat-c246b.firebaseapp.com",
    databaseURL: "https://chat-c246b.firebaseio.com",
    projectId: "chat-c246b",
    storageBucket: "chat-c246b.appspot.com",
    messagingSenderId: "482800601657"
  };
  firebase.initializeApp(config);
  export default firebase;