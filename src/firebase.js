import firebase from "firebase";

var firebaseConfig = {
    //YOUR FIREBASE CODE ,WHICH U GOT WHILE CREATING UR PROJECT
  };
  firebase.initializeApp(firebaseConfig);

//export 
export const auth= firebase.auth();

export const googleAuthProvider=new firebase.auth.GoogleAuthProvider();
