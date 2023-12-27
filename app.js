import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8WXGcIrGbX9WF_rpCB7P9NfajJACvWKI",
  authDomain: "encoder-decoder-877ac.firebaseapp.com",
  projectId: "encoder-decoder-877ac",
  storageBucket: "encoder-decoder-877ac.appspot.com",
  messagingSenderId: "920355084103",
  appId: "1:920355084103:web:83eef2a42336995b291e62",
  measurementId: "G-WK0Z95P71Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const lowercaseAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const uppercaseAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', " "];

const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', ';', ':', "'", '"', ',', '.', '/', '?', '<', '>', '|', "\\", '`', '~'];

// Combining all into a single list
const allCharacters = [
  ...lowercaseAlphabet,
  ...uppercaseAlphabet,
  ...numbers,
  ...symbols
];




const conversionMap = new Map() //so that this map can be accessed anywhere at a global scope
function generateConversionMap() {

  var reserveCharacters = [
    ...lowercaseAlphabet,
    ...uppercaseAlphabet,
    ...numbers,
    ...symbols
  ];

  for (var i = 0; i < allCharacters.length; i++){
    var index = Math.floor(Math.random() * reserveCharacters.length)
    conversionMap.set(allCharacters[i],reserveCharacters[index])
    var x = reserveCharacters.splice(index,1)
  }
  
  console.log(conversionMap)

}

generateConversionMap()



var encryptedString = ""
function convertString(){
  document.getElementById("submitTextButton").disabled = true
  const text = document.getElementById("textToEncrypt").value
  const originalString = text


  for (var i = 0; i < originalString.length; i++){
    var char = originalString[i]
    encryptedString = encryptedString + conversionMap.get(char)

  }

  console.log(encryptedString)
}
window.convertString = convertString


Map.prototype.getKey = function(targetValue, map){
  for (const [key, value] of map) {
    if(value === targetValue)
      return key;
  }
}


var decryptedString = ""
function decryptString(){
  for (var i = 0; i < encryptedString.length; i++){
    var char = encryptedString[i]
    decryptedString = decryptedString + conversionMap.getKey(char, conversionMap)

  }
  console.log(decryptedString)

}
