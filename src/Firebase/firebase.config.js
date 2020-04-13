import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDt2YpZ4rzIIfYkbWqEp5HBbzGwOz0akmE",
    authDomain: "home-pantry-cfb00.firebaseapp.com",
    databaseURL: "https://home-pantry-cfb00.firebaseio.com",
    projectId: "home-pantry-cfb00",
    storageBucket: "home-pantry-cfb00.appspot.com",
    messagingSenderId: "671326717697",
    appId: "1:671326717697:web:4d2dda277f4b2cedf5fd00",
    measurementId: "G-WMN2QSFM63"
  }
 
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** Resources API ***
  getCategories = () => this.db.ref('categories');

  }
  
export default Firebase;