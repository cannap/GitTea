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
        'js': 'Coffee',
        'coffee': 'JS',
        'html': 'Jade',
        'jade': 'HTML'
    },

    init: function () {
        var language,
            finalPath,
            fileInfo;
//Todo: this is not the rightway
        finalPath = $('strong.final-path');
        fileInfo = $('.file-info');

        if (finalPath.length && fileInfo.length) {
            language = finalPath.text();
            language = language.split('.')[1];
        } else {
            //We are on a file tree or something Start observing
            Tea.detectDomChange();
        }

        this.languages.forEach(function (lang) {
            if (language === lang) {
                console.log(lang);
                Tea.addCompiler(lang);
                //Start observing
                Tea.detectDomChange();
                //Return when we found something
                return;
            }
        });
    },

    addCompiler: function (compileFrom) {
        //Hacky fix
        var button = $('.compile');
        if (button.length) {
            return;
        }

        var action = '.file-actions .btn-group';
        var buttonstyle = 'btn';
        $(action).append('<a href="#" class="' + buttonstyle + ' btn-sm btn-primary compile">Compile to: ' + this.possibleCompiles[compileFrom] + '</a>');
    },


    detectDomChange: function () {


        if (Tea.isObserving) {
            return;
        }

        console.log('Start observing');
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


