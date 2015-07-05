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
        var language,
            finalPath;

        finalPath = $('strong.final-path');

        if (finalPath.length) {
            language = finalPath.text();
            language = language.split('.')[1];
        } else {
            if (!Tea.isObserving) {
                Tea.detectDomChange();
            }
        }

        this.languages.forEach(function (lang) {
            if (language === lang) {
                console.log(lang);
                return;
            }
        });
    }
    ,


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


