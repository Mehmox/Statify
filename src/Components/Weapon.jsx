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

function isAccessible(data) {
    try {
        let x = data.value.i.value.value
        return true
    } catch (error) {
        return false
    }

}

export default function Weapon({ displays }) {//object extraction
    return <section>
        {displays && Object.keys(displays).map((storage) =>//LOOP
        //opening all storages from inventory
        (isAccessible(displays[storage]) &&
            displays[storage].value.i.value.value.map((item) => //LOOP
                //geting all single item in the storage
                <div
                    key={uuidv4()}
                    className='display'>{/*every item has his own div*/}
                    {isAccessibleDeep(item) &&
                        <ParagrafMaker
                            key={uuidv4()}
                            item={item}
                        />}
                </div >
            ))
        )}
    </section >
}
