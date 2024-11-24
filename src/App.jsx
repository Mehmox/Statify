import React, { useState } from 'react';

import "./css/Home.css"
import Header from './Components/Header.jsx';
import Weapon from './Components/Weapon.jsx';

export default function App() {
    const [displays, setDisplays] = useState(null);
    return (
        <>
            <Header setDisplays={setDisplays} />
            <Weapon displays={displays} />
        </>
    );
}