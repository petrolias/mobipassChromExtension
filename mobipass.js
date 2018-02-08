(function (win) {
    'use strict';
    function showPasswords() {
        var passwordInputs = doc.querySelectorAll('input[type=password]');
        for (var j = 0; j < passwordInputs.length; j++) {
            var passwordInput = passwordInputs[j];
            if (passwordInput.value){
                var pass = passwordInput.value;
                console.log(pass);
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

})(this);