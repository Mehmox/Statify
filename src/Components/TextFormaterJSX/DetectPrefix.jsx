import SpanMaker from "./SpanMaker.jsx"
import { v4 as uuidv4 } from 'uuid';

const prefix = "§"

export default function DetectPrefix({ itemString }) {
    let stringIndex = 0;
    let formatedStringInfo = [];

    if (itemString[stringIndex] === " ")//if first index is " " need to remove cause js cant detect prefix
        itemString = itemString.slice(1)


    while (stringIndex < itemString.length) {//LOOP
        var stringInfoObject = {
            styleCodeArray: [],
            text: ""
        }
        var styleCodeArray = [];
        var stringHasPrefix = true

        for (let i = 0; stringHasPrefix; i++) {//Getting string decorations from string
            if (itemString[stringIndex] === prefix) {
                styleCodeArray.push(itemString[stringIndex + 1])
                stringIndex += 2
            } else
                stringHasPrefix = false
        }

        if (styleCodeArray.length === 0) {//if string have no prefix
            stringInfoObject.text = itemString[stringIndex]
            formatedStringInfo.push(stringInfoObject) //returning text
            stringIndex++;
        } else {//if string has prefix
            const nextPrefixIndex = itemString.indexOf(prefix, stringIndex + 1);//finding next prefix

            const text = nextPrefixIndex !== -1//slicing prefix part of string
                ? itemString.slice(stringIndex, nextPrefixIndex)
                : itemString.slice(stringIndex);

            stringIndex = nextPrefixIndex !== -1 ? nextPrefixIndex : itemString.length;//is string still has prefix in it ?

            stringInfoObject.styleCodeArray = [...styleCodeArray];
            stringInfoObject.text = text;
            formatedStringInfo.push(stringInfoObject)
        }
    }
    return <>
        {formatedStringInfo.map(info =>//LOOP
            <SpanMaker key={uuidv4()}
                styleCodeArray={info.styleCodeArray}
                text={info.text}
            />)}
    </>
}