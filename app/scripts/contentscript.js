'use strict';

var Tea = {

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
        //Detect Language
        var language = $('strong.final-path').text();
        language = language.split('.')[1];
        //Check if language is supported
        this.languages.forEach(function (lang) {
            if (language === lang) {
                this.currentLang = lang;
                return;
            }
        });
    }
};


//Fire
Tea.init();






