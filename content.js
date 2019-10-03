var elements = document.getElementsByTagName('*');

for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var oldWord = 'impeachment';

            fetch('examples/example.json')
                .then(function(response) {
                    if (!response.ok) {
                    throw Error(response.statusText);
                    }
                    // Read the response as json.
                    return response.json();
                }) .then(function(responseAsJson) {
                    var newWord = responseAsJson.word;
                    var replacedText = text.replace(/[${oldWord}]/gi, '[${newWord}]');

                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }
                }) .catch(function(error) {
                    console.log('Looks like there was a problem: \n', error);
                });
            }
        }
    }
}