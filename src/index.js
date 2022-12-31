import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"
import firebase from "firebase/compat/app";




const firebaseApp = {
  apiKey: "AIzaSyCwmPbnKX8rJhvmOrZ24FS3etmk7SrcqjI",
  authDomain: "ensarapp.firebaseapp.com",
  projectId: "ensarapp",
  storageBucket: "ensarapp.appspot.com",
  messagingSenderId: "593557553972",
  appId: "1:593557553972:web:2c3eba2c0457d112ab1b61",
  measurementId: "G-ZDG4FSPR8X"
    
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseApp);
}

export {firebase};

