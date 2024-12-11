import ParagrafMaker from "./TextFormaterJSX/ParagrafMaker.jsx"
import ItemFrame from "./ItemFrame.jsx"
import { v4 as uuidv4 } from 'uuid';

export default function Weapon({ display, texture }) {//object extraction
    function isAccessibleDeep(item) {
        try {
            let x = item.tag.value.display.value.Lore.value.value
            return true
        } catch (error) {
            console.log("item is not accessibleDeep")
            return false
        }
    }
    //opening all storages from inventory
    return <>
        {display.map(item => //LOOP
        //geting all single item in the storage
        (isAccessibleDeep(item) &&
            //every item has his own div*/
            <div key={uuidv4()}
                className="item">
                <ItemFrame item={item} src={item.id.value} texture={texture} />
                <div key={uuidv4()}
                    className='item-info'>
                    <ParagrafMaker
                        key={uuidv4()}
                        item={item}
                    />
                </div >
            </div>
        ))}
    </ >
}
