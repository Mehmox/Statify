import ParagrafMaker from "./TextFormaterJSX/ParagrafMaker.jsx"
import { v4 as uuidv4 } from 'uuid';

function isAccessibleDeep(data) {
    try {
        let x = data.tag.value.display.value.Lore.value.value
        return true
    } catch (error) {
        return false
    }
}

export default function Inventory({ displays }) {
    if (!displays.inv_contents)
        return
    displays = displays.inv_contents.value.i.value.value
    return <section>
        {displays.map(inventorySlot =>
        (isAccessibleDeep(inventorySlot) &&
            <div
                key={uuidv4()}
                className='display'>{/*every item has his own div*/}
                <ParagrafMaker
                    key={uuidv4()}
                    item={inventorySlot}
                />
            </div >)
        )}
    </section>
}