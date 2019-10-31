var elements = document.getElementsByTagName('*');
var oldWords = ["radioactive", "residents", "community"];
var oldWord;
var newWords = [];
var newWord;

// Find all the words to replace
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            // if (text.length > 6) {
            //     oldWords.push(text);            
            // }
            oldWord = "radioactive";
        }
    }
}

// API call to get synonyms for words to replace
for (var i = 0; i < oldWords.length; i++){
    const request = async () => {
        const response = await fetch(`https://api.datamuse.com/words?ml=${oldWords[i]}`);
        const json = await response.json();
        newWord = json[2].word;
        newWords.push(newWord);
    }
    request();
}

setTimeout(function(){
    // Actually replace all words
    for (var k = 0; k < newWords.length; k++){
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            for (var j = 0; j < element.childNodes.length; j++) {
                var node = element.childNodes[j];

                if (node.nodeType === 3) {
                    var text = node.nodeValue;
                    var replacedText = text.replace(oldWords[k], newWords[k]);
                    console.log(oldWords[k] + " " + newWords[k]);
                    if (replacedText !== text) {
                        element.replaceChild(document.createTextNode(replacedText), node);
                    }        
                }
            }
        }
    }
}, 1000)