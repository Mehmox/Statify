import React, { useState } from 'react';

import "./css/Home.css"
import Header from './Header.jsx';
import Weapon from './Weapon.jsx';

export default function App() {
    const [displays, setDisplays] = useState(null);
    return (
        <>
            <Header setDisplays={setDisplays} />
            <Weapon displays={displays} />
        </>
    );
}