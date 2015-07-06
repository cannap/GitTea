'use strict';
var Tea;
Tea = {
    isObserving: false,
    compileFrom: null,
    languages: [
        'js',
        'coffee',
       /* 'html',
        'jade'*/
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


        finalPath = $('strong.final-path');
        fileInfo = $('.file-info');

        if (finalPath.length && fileInfo.length) {
            language = finalPath.text();
            language = language.split('.')[1];
        } else {
            //We are on a file tree or something Start observing
            Tea._detectDomChange();

        }

        Tea.languages.forEach(function (lang) {
            if (language === lang) {
                Tea._addCompiler(lang);
                //Start observing
                Tea._detectDomChange();
                //Return when we found something
                return false;
            }
        });
    },

    _addCompiler: function (compileFrom) {
        $('.file-actions .btn-group').append('<a href="#" class="btn btn-sm btn-primary compile">Compile to: ' + Tea.possibleCompiles[compileFrom] + '</a>');
        Tea.compileFrom = Tea.possibleCompiles[compileFrom].toLowerCase();
        console.log(Tea.compileFrom);
    },

    compile: function (compileFrom) {


        var compileFrom = Tea.possibleCompiles[compileFrom].toLowerCase();

        var sourceURL = $('#raw-url').attr('href');
        var source;

        $.get(sourceURL, function (data) {
            source = data;

        switch (compileFrom) {
            case 'coffee':
                console.log('Compile to JS');

                break;
            case 'js':
                var result = js2coffee.build(source);
                source = result.code;
                break;
            case 'html':
                console.log('Compile to Jade');
                break;
            case 'jade':
                console.log('Compile to HTML');
                break;
            default:
                console.log('No Compiler found');
                break;

        }

            return source;
        });
    },
    _detectDomChange: function () {
        //Check Observing
        if (Tea.isObserving) {
            return false;
        }
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

$(document.body).on('click', '.compile', function () {
   var source = Tea.compile(Tea.compileFrom);

    

});

