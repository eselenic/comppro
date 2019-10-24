var elements = document.getElementsByTagName('*');
var oldWord;
var newWord;

// Find all the words to replace
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var oldWord = 'impeachment';  
        }
    }
}

// API call to get synonyms for words to replace
for (var i = 0; i < 1; i++){
    fetch('https://api.datamuse.com/words?ml=impeachment')
        .then(function(response) {
            newWord = response[0].word;
            console.log(newWord);
        }).catch(function(error) {
            console.log('Looks like there was a problem: \n', error);
        });
}

// Actually replace all words
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(oldWord, newWord);
            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
                      
        }
    }
}