import DetectPrefix from "./DetectPrefix.jsx"
import { v4 as uuidv4 } from 'uuid';

export default function ParagrafMaker({ item }) {
    const itemName = item.tag.value.display.value.Name.value
    item = item.tag.value.display.value.Lore.value.value
    if (item[0] !== itemName)
        item.unshift(itemName)//adding item name to item info array
    return <>
        {item.map(itemString => //LOOP
        (
            itemString ?/*every paragraf basicly indis of itemdisplay array*/
                <p key={uuidv4()}>
                    < DetectPrefix itemString={itemString} />
                </p> : <br key={uuidv4()} />
        )
        )}
    </>
}