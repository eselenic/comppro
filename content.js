var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var oldWord = 'impeachment';
            fetch('https://api.datamuse.com/words?ml=${oldWord}')
                .then(function(response) {
                    var newWord = response.word;
                    console.log(newWord);

                    var replacedText = text.replace(/[${oldWord}]/gi, '[${newWord}]');
                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                })
                .catch(function(error) {
                console.log('Looks like there was a problem: \n', error);
                });              
        }
    }
}
