import detectPrefix from "./detectPrefix.js"
let result = {};
function readLore(item, storageName, index) {
    try {
        const Name = item.tag.value.display.value.Name.value
        item = item.tag.value.display.value.Lore.value.value
        item.unshift(Name)//adding item name to item info array

        item.forEach(displayArray => {//LOOP
            let displayArrIndex = 0;

            if (displayArray[displayArrIndex] === " ")//if first index is " " need to remove cause js cant detect prefix
                displayArray = displayArray.slice(1)

            result[storageName][index].push(detectPrefix(displayArray, displayArrIndex))
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
            readLore(item, storageName, index)
        });
    }
    return result;
};