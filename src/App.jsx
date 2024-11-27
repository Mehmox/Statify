import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import "./css/base.css"
import "./css/Header.css"
import "./css/Section.css"
import "./css/Component.css"

import textureOptions from "./varibles/textures.js"

import Header from './Components/Header.jsx';
import Weapon from './Components/Weapon.jsx';

import Section from './Components/Section.jsx';

export default function App() {
    const [display, setDisplays] = useState(null);
    const [texture, setTexture] = useState(0);
    const sections = [
        { title: "ARMOR", target: "inv_armor" },
        { title: "Equipment", target: "equipment_contents" },
        { title: "Wardrobe", target: "wardrobe_contents" },
    ]
    // display && console.log(display)
    return <>
        <Header setDisplays={setDisplays} setTexture={setTexture} />
        <div className='gap'></div>
        <main>
            {display && sections.map(section => (display[section.target] &&
                <Section key={uuidv4()} title={section.title}
                    content={<Weapon display={display[section.target]} texture={textureOptions[texture]} />}
                />
            ))}
        </main>
    </>
}