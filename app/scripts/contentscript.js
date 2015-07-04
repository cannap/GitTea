'use strict';
var Tea;
Tea = {
    currentLang: null,
    languages: [
        'js',
        'coffee',
        'html',
        'jade'
    ],
    possibleCompiles: [
        ['js', 'coffee'],
        ['coffee', 'js'],
        ['html', 'jade'],
        ['jade', 'html']
    ],

    init: function () {
        var language = $('strong.final-path').text();
        language = language.split('.')[1];
        //Check if language is supported
       if(!language) return;
        this.languages.forEach(function (lang) {
            if (language === lang) {
                Tea.currentLang = lang;
                Tea.compile(lang);
                return;
            }
        });
    },


    compile: function (lang) {

    },

    detectDomChange: function () {

        Tea.init();
        var target = document.querySelector('#js-repo-pjax-container');
        var observer = new MutationObserver(function (mutation) {
            console.log(mutation);
            Tea.init();
        });
        var config = {attributes: false, childList: true, characterData: false};
        observer.observe(target, config);
    }
    
};


//Fire
Tea.detectDomChange();


