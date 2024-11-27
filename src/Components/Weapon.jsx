import ParagrafMaker from "./TextFormaterJSX/ParagrafMaker.jsx"
import { v4 as uuidv4 } from 'uuid';

export default function Weapon({ display, texture }) {//object extraction
    function isAccessibleDeep(item) {
        try {
            let x = item.tag.value.display.value.Lore.value.value
            url = `./textures/${texture}/item/${"diamond_sword"}.png`
            return true
        } catch (error) {
            return false
        }
    }
    var url = "";
    // const customUrl = `./textures/${packName}/cit/item/${type}/${what}/${item}.png`
    //opening all storages from inventory
    return <>
        {display.value.i.value.value.map(item => //LOOP
        //geting all single item in the storage
        (isAccessibleDeep(item) &&
            //every item has his own div*/
            <div key={uuidv4()}
                className="item">
                <img src={url} alt={`${texture}/${item} not found`} />
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
