  var config = {
    apiKey: "AIzaSyB--GTMUwZW-dtrDszfwHX-gtL1_AF8zlo",
    authDomain: "cbschat-f973a.firebaseapp.com",
    databaseURL: "https://cbschat-f973a.firebaseio.com",
    storageBucket: "cbschat-f973a.appspot.com",
    messagingSenderId: "883207905302"
  };
  firebase.initializeApp(config);
angular.module("cbsChat", ['firebase'])