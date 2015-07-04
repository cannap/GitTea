'use strict';
var Tea;
Tea = {
    isObserving: false,

    languages: [
        'js',
        'coffee',
        'html',
        'jade'
    ],

    possibleCompiles: {
        'js': 'coffee',
        'coffee': 'js',
        'html': 'jade',
        'jade': 'html'
    },

    init: function () {
        var language = $('strong.final-path').text();
        language = language.split('.')[1];
        //Check if not Running or and it has no language then we can determine this is not a Singlefile
        if (!language && !Tea.isObserving) {
            Tea.detectDomChange();
        }

        //Check if language is supported
        this.languages.forEach(function (lang) {
            if (language === lang) {
                console.log(lang);
                Tea.currentLang = lang;
                return true;
            }
        });
    },

    detectDomChange: function () {

        Tea.isObserving = true;

        var target = document.querySelector('#js-repo-pjax-container');
        var observer = new MutationObserver(function (mutation) {
            Tea.init();
        });
        var config = {
            attributes: false,
            childList: true,
            characterData: false
        };
        observer.observe(target, config);
    }

};


//Fire
Tea.init();


