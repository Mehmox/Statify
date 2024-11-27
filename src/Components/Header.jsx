import React, { useState } from 'react';
import axios from 'axios';

import TextureOptions from "../varibles/textures.js"
import Data from "../js/pull.mjs"
import measuring from "../js/measure.js"
import targetPaths from "../varibles/paths.js"

import search from "../img/Search.png"

const API_KEY = process.env.REACT_APP_HYPIXEL_API_KEY
const SERVER_URL = process.env.REACT_APP_SERVER_URL

export default function Header({ setDisplays, setTexture }) {
    const [profiles, setprofiles] = useState(null);
    const [Puuid, setPuuid] = useState(null);
    const [APIDATA, setAPIDATA] = useState(null);


    const pullPlayer = async () => {
        var indis = []
        const pullReturn = await Data(API_KEY, document.querySelector("#nick").value)

        setAPIDATA(pullReturn.APIDATA)
        setPuuid(pullReturn.Puuid)

        for (let i = 0; i < pullReturn.APIDATA.length; i++)
            indis.push({ porfileID: i, name: pullReturn.APIDATA[i].cute_name })

        setprofiles(indis)
    }

    const profileSelect = async (id) => {
        if (id === -1)
            return
        let base64Object = {}

        // console.log(APIDATA[id].members[Puuid].inventory)
        targetPaths.forEach(path => {
            try {
                if (path === "quiver" || path === "talisman_bag")
                    base64Object[path] = APIDATA[id].members[Puuid].inventory.bag_contents[path].data
                else if (path === "backpack_contents" || path === "backpack_icons") {
                    base64Object[path] = []
                    for (const key in APIDATA[id].members[Puuid].inventory[path])
                        base64Object[path].push(APIDATA[id].members[Puuid].inventory[path][key].data)
                } else
                    base64Object[path] = APIDATA[id].members[Puuid].inventory[path].data
            } catch (err) {
                console.log(err)
            }

        });

        measuring(base64Object)

        const response = await axios.post(`${SERVER_URL}/select`,
            { base64Object: base64Object })
            .then(res => res.data.data)
            .catch(err => console.log(err))

        // console.log(response["personal_vault_contents"].value.i.value.value[1].tag.value.display.value.Lore.value.value)
        setDisplays(response)
    }
    return <header>
        <input
            id='nick'
            type="text"
            placeholder="Username"
            defaultValue="Mehmox"
        />

        <img src={search} alt="" onClick={pullPlayer} />
        <select className='rem' onChange={(e) => profileSelect(e.target.value)} defaultValue="-1">
            <option disabled value="-1" className='default'>
                Profile
            </option>
            {profiles && profiles.map(profile =>
                <option key={profile.porfileID} value={profile.porfileID}>
                    {profile.name}
                </option>
            )}
        </select>

        <select className='rem' onChange={(e) => setTexture(e.target.value)} defaultValue="0">
            <option disabled value="-1" className='default'>
                Packs
            </option>
            {TextureOptions && TextureOptions.map((texture, index) =>
                <option key={index} value={index}>
                    {texture}
                </option>
            )}
        </select>
    </header >
}