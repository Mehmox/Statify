import colorMapRGB from "../varibles/colorMapRGB.js"
function applyColorSpan(code, text) {
    if (text.length === 0)
        return ""
    const color = colorMapRGB[code] !== "k" ? colorMapRGB[code] : colorMapRGB[7]
    return `<span style="color: ${color}">${text}</span>`
}

let result = {};
const prefix = "§"
function checkSlots(item, storageName, index) {
    try {
        const Name = item.tag.value.display.value.Name.value
        item = item.tag.value.display.value.Lore.value.value

        item.unshift(Name)//adding item name to item info array
        item.forEach(itemDisplayArray => {//LOOP
            let displayStringIndex = 0;
            let string = ""

            if (itemDisplayArray[displayStringIndex] === " ")//if first index is " " need to remove cause to js can detect prefix
                itemDisplayArray = itemDisplayArray.slice(1)

            while (displayStringIndex < itemDisplayArray.length) {//LOOP
                if (itemDisplayArray[displayStringIndex] === prefix) {
                    const code = itemDisplayArray[displayStringIndex + 1];

                    const nextSectionIndex = itemDisplayArray.indexOf(prefix, displayStringIndex + 2);
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
            result[storageName][index].push(string)
        });
    } catch (error) {
        if (error.name === "TypeError")
            console.log("maybe its empty slot or it is not a combat item")
        else
            console.log(error)
    }
}
export default function painter(storageObject) {
    result = {};//reset
    for (const storageName in storageObject) {//LOOP
        result[storageName] = []//set path
        let storage = storageObject[storageName].value.i.value.value
        storage.forEach((item, index) => {//LOOP
            result[storageName][index] = []//set path deep
            checkSlots(item, storageName, index)
        });
    }
    return result;
};