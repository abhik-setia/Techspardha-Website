importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase.js");
var config = {
    apiKey: "AIzaSyA8E4ugmHy7Uylibf-6DGdpjlrnw2aEg8s",
    authDomain: "techspardha18.firebaseapp.com",
    databaseURL: "https://techspardha18.firebaseio.com",
    projectId: "techspardha18",
    storageBucket: "",
    messagingSenderId: "357922932377"
};
firebase.initializeApp(config);
    
const messaging=firebase.messaging();