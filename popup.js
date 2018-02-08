var m_data = {};

document.addEventListener('DOMContentLoaded', () => {
  //chrome.tabs.executeScript(null, {file: "mobipass.inject.js"});
  //chrome.tabs.executeScript(null, {code: 'var name1 = "property"'}, function() {
  //});
  document.getElementById('btnSendMsg').addEventListener('click', SendMessage);
  document.getElementById('btnRequester').addEventListener('click', Requester);
  document.getElementById('btnDisconect').addEventListener('click', Disconect);

  Load();
});

function GenerateQR(id, key) {
  //https://davidshimjs.github.io/qrcodejs/
  var qrcode = new QRCode(id, {
    text: key,
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

function GenerateKey() {
  return Math.random().toString(36).substring(7);
}
function saveKey(value, encryptionKey) {
  var data = {};
  data['key'] = value;
  data['encryptionKey'] = encryptionKey;
  chrome.storage.sync.set(data);
}

function LoadData(cb){
  chrome.storage.sync.get((data) => {
    var key = chrome.runtime.lastError ? null : data['key'];
    if (!key) {
      key = GenerateKey();
      saveKey(key,GenerateKey());
    }
    m_data.key = key;
    if(cb) {cb();}
  });
}

function Refresh(){
  saveKey(GenerateKey(),GenerateKey());
  Load();
}

function Load(){
  LoadData(()=>{
    document.getElementById('key').innerHTML += m_data.key;
    GenerateQR('qrcode', m_data.key);
      // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //   chrome.tabs.sendMessage(tabs[0].id, {data: key}, function(response) {
      //     console.log(response.farewell);
      //   });
      // });
     // SendMessage();

  });
}


function SendMessage(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: m_data.key}, function(response) {
    });
  });
}

function Disconect(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action:'disconect',data: m_data.key}, function(response) {
    });
  });
}
function Requester() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id,
      {
        action: 'connect',
        key: m_data.key,
        //endpoint: 'http://localhost:4200'
        endpoint: 'https://aqueous-earth-55922.herokuapp.com'
      }, (response)=> {});
  });
  // var socket = io.connect('http://localhost:4200');
  // socket.on('connect', function (data) {
  //   //alert('test2');
  // });

  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, 
  //     {data: key}
  //   , function(response) {
  //   });
  // });
}


/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
// INIT
// var myString   = "https://www.titanesmedellin.com/";
// var myPassword = "myPassword";

// // PROCESS
// var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
// var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
// document.getElementById("demo0").innerHTML = myString;
// document.getElementById("demo1").innerHTML = encrypted;
// document.getElementById("demo2").innerHTML = decrypted;
// document.getElementById("demo3").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);