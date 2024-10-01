

  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
  import { getAuth,GoogleAuthProvider ,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDO7yFIllU3udhAtJP0f6wFu7QvsXXzP1o",
    authDomain: "ksp-traffic-control-ff5ac.firebaseapp.com",
    databaseURL: "https://ksp-traffic-control-ff5ac-default-rtdb.firebaseio.com",
    projectId: "ksp-traffic-control-ff5ac",
    storageBucket: "ksp-traffic-control-ff5ac.appspot.com",
    messagingSenderId: "307072623604",
    appId: "1:307072623604:web:62ee9977aa9634bece0fa1",
    measurementId: "G-TYW5L6YZNW"
  };


  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  const auth = getAuth(app);
  auth.languageCode = 'en';

const googlelogin = document.getElementById("google");
googlelogin.addEventListener("click", function()
{
    const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
    window.location.href="./afterlogin/index.html";




  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

})


  const analytics = getAnalytics(app);
