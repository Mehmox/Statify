import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import textureOptions from "./varibles/textures.js"

import Header from './Components/Header.jsx';
import Player from "./Components/Player.jsx"
import Section from './Components/Section.jsx';

export default function App() {
    const [player, setPlayerInfo] = useState({
        nick: "",
        Puuid: "",
        profiles: [],
        APIDATA: {}
    });
    const [displays, setDisplays] = useState(null);
    const [texture, setTexture] = useState(0);

    useEffect(() => setDisplays(null), [player])

    const sections = [
        { title: "ARMOR", target: "inv_armor" },
        { title: "Equipment", target: "equipment_contents" },
        { title: "Wardrobe", target: "wardrobe_contents" },
        { title: "ACCESSORIES", target: "talisman_bag" },
        { title: "INVENTORY", target: "inv_contents" },
        { title: "ENDER CHEST", target: "ender_chest_contents", },
        { title: "VAULT", target: "personal_vault_contents" },
    ]
    // player.profiles.length !== 0 && console.log(player.APIDATA[2].members.ab7981c68774450ba878a1324c8bf182.inventory)
    return <>
        <Header setPlayerInfo={setPlayerInfo} setTexture={setTexture} />
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-3">
                    <canvas></canvas>
                </div>
                <div className="col-9">
                    <Player player={player} setDisplays={setDisplays} />

                    {displays && <Section key={uuidv4()}
                        sections={sections}
                        displays={displays}
                        texture={textureOptions[texture]}
                    />}

                </div>
            </div>
        </div>
    </>
}