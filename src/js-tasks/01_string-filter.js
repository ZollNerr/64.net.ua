const string = "Привет! Как дела?";

const vovels = ["у", "е", "ы", "а", "о", "э", "ё", "я", "и"];

const getVowels = stringToFilter => {
    let extractedVovels = "";
    for (let i=0; i < stringToFilter.length; i++) {
        const currentLetter = stringToFilter[i].toLowerCase();
        
        if (vovels.includes(currentLetter)) {
            extractedVovels = extractedVovels +  currentLetter;
        }

    }
    return extractedVovels;

}

console.log(getVowels(string));