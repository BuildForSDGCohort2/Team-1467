import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2LdlS7M4KMwnbbZhOg1PVH1YCiEKE-Xw",
  authDomain: "kinder-farms-project.firebaseapp.com",
  databaseURL: "https://kinder-farms-project.firebaseio.com",
  storageBucket: "kinder-farms-project.appspot.com",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
