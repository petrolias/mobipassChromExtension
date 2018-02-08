(function (win) {
    'use strict';
   
    function showPasswords() {
        var passwordInputs = doc.querySelectorAll('input[type=password]');
        for (var j = 0; j < passwordInputs.length; j++) {
            var passwordInput = passwordInputs[j];
            if (passwordInput.value) {
                var pass = passwordInput.value;
                //console.log(pass);
                //has found a pass request access
                //use encryption based on stored key data
            }
        }
    }

    function setPassword(value) {
        var passwordInputs = doc.querySelectorAll('input[type=password]');
        for (var j = 0; j < passwordInputs.length; j++) {
            var passwordInput = passwordInputs[j];
            if (passwordInput.value) {
                var pass = passwordInput.value;
                setTimeout(function () {
                    passwordInput.value = value;
                }, 1000);
            }
        }
    }

    var doc = win.document;
    //provides developers with a way to react to changes in a DOM
    //https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    var MutationObserver = win.MutationObserver || win.WebKitMutationObserver;
    var observer = new MutationObserver(showPasswords);
    observer.observe(doc.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

    var m_socket;
    chrome.runtime.onMessage.addListener(
        (req, sender, sendResponse)=> {
            //setPassword(request.data);
            //update encryption
            //alert(JSON.stringify(request));

            //fetch action from popup
            if (req.action == 'connect'){
                if (m_socket && m_socket.connected) {return;}
                setTimeout(()=> { m_socket.disconnect(); }, 15 * 1000); //disconect after 10 seconds
                m_socket = io.connect(req.endpoint);
                m_socket.emit('request', {
                    key: req.key,
                    domain: window.location.hostname
                });
                m_socket.on('response', function (data) {
                    console.log(data);
                });
            } else if (req.action == 'disconect'){
                m_socket.disconnect();
            }
        });

})(this);


// var MOBIPASS = MOBIPASS || {};
// (function (win, content_script) {
//     'use strict';

//     chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log(sender.tab ?
//                     "from a content script:" + sender.tab.url :
//                     "from the extension");
//         if (request.greeting == "hello")
//         sendResponse({farewell: "goodbye"});
//         alert(request.greeting);
//     });

//     //  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
//     //     console.log(response.farewell);
//     //   });

//     content_script.test = function () {
//         alert('test');
//     }
// }(this, window.MOBIPASS.content_script = window.MOBIPASS.content_script || {}));
