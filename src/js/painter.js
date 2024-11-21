const colorMapRGB = {
    '0': 'rgb(0, 0, 0)',         // black
    '1': 'rgb(0, 0, 139)',       // darkblue
    '2': 'rgb(0, 100, 0)',       // darkgreen
    '3': 'rgb(0, 139, 139)',     // darkaqua
    '4': 'rgb(139, 0, 0)',       // darkred
    '5': 'rgb(128, 0, 128)',     // darkpurple
    '6': 'rgb(255, 215, 0)',     // gold
    '7': 'rgb(169, 169, 169)',   // gray
    '8': 'rgb(169, 169, 169)',   // darkgray (same as gray)
    '9': 'rgb(0, 0, 255)',       // blue
    'a': 'rgb(0, 128, 0)',       // green
    'b': 'rgb(0, 255, 255)',     // aqua
    'c': 'rgb(255, 0, 0)',       // red
    'd': 'rgb(204, 0, 204)',     // lightpurple
    'e': 'rgb(255, 255, 0)',     // yellow
    'f': 'rgb(255, 255, 255)',   // white
    'k': 'random',               // Extra processing can be done for random characters
    'l': 'bold',                 // text style
    'm': 'line-through',         // text style
    'n': 'underline',            // text style
    'o': 'italic',               // text style
    'r': 'reset'                 // text style
};

function applyColorSpan(code, text) {
    if (text.length === 0)
        return ""
    const color = colorMapRGB[code] !== "k" ? colorMapRGB[code] : "grey"
    return `<span style="color: ${color}">${text}</span>`
}

const prefix = "§"
function checkSlots(storageSlot) {//Code spagetti here I need to make it more readble
    try {
        storageSlot = storageSlot.tag.value.display.value.Lore.value.value
        storageSlot.forEach(itemDisplayArray => {//LOOP
            let displayStringIndex = 0;
            let string = ""
            while (displayStringIndex < itemDisplayArray.length) {//LOOP
                if (itemDisplayArray[displayStringIndex] === prefix) {
                    const code = itemDisplayArray[displayStringIndex + 1];

                    const nextSectionIndex = itemDisplayArray.indexOf(prefix, displayStringIndex + 1);
                    const text = nextSectionIndex !== -1
                        ? itemDisplayArray.slice(displayStringIndex + 2, nextSectionIndex)
                        : itemDisplayArray.slice(displayStringIndex + 2);
                    string += applyColorSpan(code, text)

                    displayStringIndex = nextSectionIndex !== -1 ? nextSectionIndex : itemDisplayArray.length;
                } else {
                    displayStringIndex++;
                    string += itemDisplayArray[displayStringIndex]
                }
            }
            return string
        });
    } catch (error) {
        if (error.name === "TypeError")
            console.log("maybe its empty slot or it is not a combat item")
        else
            console.log(error)
    }
}
export default function painter(storageObject) {
    let result = {};;//reset
    for (const storageName in storageObject) {//LOOP
        result[storageName] = []//set path
        let storage = storageObject[storageName].value.i.value.value
        storage.forEach((storageSlot, index) => {//LOOP
            result[storageName][index] = []//set path deep
            result[storageName][index].push(checkSlots(storageSlot))
        });
    }
    return result;
};