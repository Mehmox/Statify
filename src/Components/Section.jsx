import "../css/Section.css"

import ParagrafMaker from "./TextFormaterJSX/ParagrafMaker.jsx"
import ItemFrame from "./ItemFrame.jsx"
import { v4 as uuidv4 } from 'uuid';

export default function Section({ sections, displays, texture }) {
    function isAccessibleDeep(item) {
        try {
            let x = item.tag.value.display.value.Lore.value.value
            return true
        } catch (error) {
            console.log("item is not accessibleDeep")
            return false
        }
    }
    return <>
        {sections.map((section) => (//Making all each storage his own section
            displays[section.target] &&
            <section key={uuidv4()} className="container-fluid mb-5 bg-dark border border-danger">
                <span className="title">
                    {section.title}
                </span>
                <div className="row p-0 pr-5">
                    {displays[section.target].map(item => //LOOP
                    (isAccessibleDeep(item) &&
                        //Making all each item his own frame and info
                        <div key={uuidv4()} className="col px-0 m-2 flex-grow-0">
                            <ItemFrame item={item} exture={texture} />
                            <div className='item-info'>
                                <ParagrafMaker
                                    item={item}
                                />
                            </div >
                        </div>
                    ))}
                </div>
            </section >
        ))
        }
    </>
}