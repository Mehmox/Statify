import spanMaker from "./spanMaker.jsx"

const prefix = "§"

export default function detectPrefix(displayArray, displayArrIndex) {
    let formatedString = "";

    while (displayArrIndex < displayArray.length) {//LOOP
        var code = [];
        var stringHasPrefix = true
        for (let i = 0; stringHasPrefix; i++) {//Making code array
            if (displayArray[displayArrIndex] === prefix) {
                code.push(displayArray[displayArrIndex + 1])
                displayArrIndex += 2
            } else
                stringHasPrefix = false
        }

        if (code.length === 0) {//if string have no prefix
            formatedString += displayArray[displayArrIndex]//returning text
            displayArrIndex++;
        } else {//if string has prefix
            const nextPrefixIndex = displayArray.indexOf(prefix, displayArrIndex + 1);//finding next prefix

            const text = nextPrefixIndex !== -1//slicing prefix part of string
                ? displayArray.slice(displayArrIndex, nextPrefixIndex)
                : displayArray.slice(displayArrIndex);

            displayArrIndex = nextPrefixIndex !== -1 ? nextPrefixIndex : displayArray.length;

            formatedString += spanMaker(code, text)
        }
    }
    // return formatedString
    return <>
        <p>
            formatedString
        </p>
    </>
}