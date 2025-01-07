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
  conversionMap.set("\n", "\n")
  console.log(conversionMap)

}
generateConversionMap()


var textFile = null
function makeTextFile(text) {
  var data = new Blob([JSON.stringify(Object.fromEntries(text))], { type: 'text/plain' }); //convert the map into an object then into json string and save it as a blob
  // If we are replacing a previously generated file we need to
  // manually revoke the object URL to avoid memory leaks.
  if (textFile !== null) {
    window.URL.revokeObjectURL(textFile);
  }

  textFile = window.URL.createObjectURL(data); //text link for the file

  // returns a URL you can use as a href
  return textFile;
};

function downloadKey() {

  var link = document.createElement("a");
  link.setAttribute('download', "conversion_key");

  link.href = makeTextFile(conversionMap); //make the text file of the map

  document.body.appendChild(link);
  link.click();
  link.remove();
}


function uploadKey() {
  document.getElementById("decryptionKey").click()
}

function uploadedKeyToMap() {

  const [file] = document.getElementById("decryptionKey").files; //get file from the input
  r = new FileReader();
  if (file) {
    r.readAsText(file);
  }
  r.addEventListener("load", () => { //after file is read then this run

    obj = JSON.parse(r.result) //convert json string to a obj 
    for (i in obj) {
      conversionMap.set(i, obj[i]) //normal to coded
    }
  },
    false,
  )


}

inputText = {
  "encrypt": "",
  "decrypt": "",
}

outputText = {
  "encrypt": "",
  "decrypt": "",
}

mode = "encrypt"

function selectMode(modeToBeSelected) {

  document.getElementById("outputDiv").classList.remove("d-none")//show output box so can hide later

  document.getElementById(modeToBeSelected + "Select").classList.add("functionTabSelected")
  document.getElementById(mode + "Select").classList.remove("functionTabSelected")
  inputText[mode] = document.getElementById("textInput").value //save current input text showing
  outputText[mode] = document.getElementById("outputArea").innerText //save current output text showing

  mode = modeToBeSelected // change the mode

  mode == "decrypt" && outputText[mode] == "" ? document.getElementById("outputDiv").classList.add("d-none") : null //hide output box is decrupt text == nothing
  mode == "encrypt" && outputText[mode] == "" ? document.getElementById("outputDiv").classList.add("d-none") : null //hide output box is encrypt text == nothing
  document.getElementById("convertButton").innerText = mode[0].toUpperCase() + mode.slice(1); // convertbutton text change
  document.getElementById("textInput").placeholder = "Enter text to " + mode //input placeholder
  document.getElementById("textInput").value = inputText[mode] //show last input text showing
  document.getElementById("outputArea").innerText = outputText[mode] //show last output text showing
  document.getElementById("outputTitle").innerText = mode[0].toUpperCase() + mode.slice(1) + "ed Text"; // output box title

}

function buttonClick(btn) {
  btn.classList.add('buttonClick')
  setTimeout(() => {
    btn.classList.remove('buttonClick')
  }, 400);
}

Map.prototype.getKey = function (targetValue, map) {
  for (const [key, value] of map) {
    if (value === targetValue)
      return key;
  }
}

var encryptedString = ""
var decryptedString = ""

function convertString() {
  const text = document.getElementById("textInput").value

  if (mode == "encrypt") {
    encryptedString = ""
    const originalString = text

    if (text != "") {
      for (var i = 0; i < originalString.length; i++) {
        encryptedString = encryptedString + conversionMap.get(originalString[i])
      }

      document.getElementById("outputDiv").classList.remove("d-none")
      document.getElementById("outputArea").innerText = encryptedString
    }
    else {
      document.getElementById("textInput").placeholder = "Enter some text first!!!"
    }


  }
  else if (mode == "decrypt") {

    decryptedString = ""
    for (var i = 0; i < text.length; i++) {
      var char = text[i]
      decryptedString = decryptedString + conversionMap.getKey(char, conversionMap)

    }
    document.getElementById("outputDiv").classList.remove("d-none")
    document.getElementById("outputArea").innerText = decryptedString
  }
}

alertShown = false
function copyToClipboard() {

  navigator.clipboard.writeText(encryptedString).then(
    (e) => {
      if (!alertShown) {
        document.getElementById("alertContaingBox").insertAdjacentHTML("beforeend",
          `
              <div id="alertCopy"  class="alertCardTextCopied d-flex px-3 py-2 rounded-3 align-items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" fill="currentColor"
                  class="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path
                      d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
  
              <text class="mx-1">Text copied to clipboard</text>
          </div>
          `
        )
        alertShown = true
        setTimeout(() => {
          document.getElementById("alertCopy").classList.add("exitAnimation")
          alertShown = false
          setTimeout(() => {
            document.getElementById("alertContaingBox").innerHTML = ""
          }, 450);

        }, 3000);
      }
      else {
        document.getElementById("alertContaingBox").innerHTML = ""
        document.getElementById("alertContaingBox").insertAdjacentHTML("beforeend",
          `
            <div id="alertCopy"  class="alertCardTextCopied d-flex px-3 py-2 rounded-3 align-items-center ">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" fill="currentColor"
                  class="bi bi-check-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path
                      d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
              </svg>
  
              <text class="mx-1">Text copied to clipboard</text>
          </div>
          `
        )
        alertShown = true

      }



    },
    (re) => {
      console.log(re)
    },
  );
}