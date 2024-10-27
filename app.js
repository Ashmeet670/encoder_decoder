const lowercaseAlphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const uppercaseAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', " "];

const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', ';', ':', "'", '"', ',', '.', '/', '?', '<', '>', '|', "\\", '`', '~'];

// Combining all into a single list
// const allAlphabets = [
//   ...lowercaseAlphabet,
//   ...uppercaseAlphabet,

// ];
// const allSymboles = [
//   ...numbers,
//   ...symbols
// ];

const allCharacters = [
  ...lowercaseAlphabet,
  ...uppercaseAlphabet,
  ...numbers,
  ...symbols
];

const conversionMap = new Map()
function generateConversionMap() {

  // var reserveAlphabets = [
  //   ...lowercaseAlphabet,
  //   ...uppercaseAlphabet,

  // ];
  // var reserveSymboles = [
  //   ...numbers,
  //   ...symbols
  // ];

  // for (var i = 0; i < allAlphabets.length; i++) {
  //   var index = Math.floor(Math.random() * reserveAlphabets.length)
  //   conversionMap.set(allAlphabets[i], reserveAlphabets[index])
  //   var x = reserveAlphabets.splice(index, 1)
  // }

  // for (var i = 0; i < allSymboles.length; i++) {
  //   var index = Math.floor(Math.random() * reserveSymboles.length)
  //   conversionMap.set(allSymboles[i], reserveSymboles[index])
  //   var x = reserveSymboles.splice(index, 1)
  // }



  var reserveCharacters = [
    ...lowercaseAlphabet,
    ...uppercaseAlphabet,
    ...numbers,
    ...symbols
  ];

  for (var i = 0; i < allCharacters.length; i++) {
    var index = Math.floor(Math.random() * reserveCharacters.length)
    conversionMap.set(allCharacters[i], reserveCharacters[index])
    var x = reserveCharacters.splice(index, 1)
  }
  console.log(conversionMap)

}
generateConversionMap()


mode = "encrypt"


function selectMode(modeToBeSelected) {
  document.getElementById(modeToBeSelected + "Select").classList.add("functionTabSelected")
  document.getElementById(mode + "Select").classList.remove("functionTabSelected")

  mode = modeToBeSelected

}

function buttonClick(btn) {
  btn.classList.add('buttonClick')
  setTimeout(() => {
    btn.classList.remove('buttonClick')
  }, 400);
}

var encryptedString = ""
function encryptString() {

  const text = document.getElementById("textToEncrypt").value
  const originalString = text

  if (text != "") {
    for (var i = 0; i < originalString.length; i++) {
      encryptedString = encryptedString + conversionMap.get(originalString[i])
    }

    document.getElementById("outputDiv").classList.remove("d-none")
    document.getElementById("outputArea").innerText = encryptedString
    console.log(encryptedString)
  }
  else{
    document.getElementById("textToEncrypt").placeholder = "Enter some text first!!!"
  }

}


Map.prototype.getKey = function (targetValue, map) {
  for (const [key, value] of map) {
    if (value === targetValue)
      return key;
  }
}


var decryptedString = ""
function decryptString() {
  for (var i = 0; i < encryptedString.length; i++) {
    var char = encryptedString[i]
    decryptedString = decryptedString + conversionMap.getKey(char, conversionMap)

  }
  console.log(decryptedString)

}
