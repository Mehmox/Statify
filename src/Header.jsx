import React, { useState } from 'react';
import axios from 'axios';

import Data from "./js/pull.mjs"
import textFormater from "./js/textFormater/openObject.js"
import measuring from "./js/measure.js"
import targetPaths from "./varibles/paths.js"

const API_KEY = process.env.REACT_APP_API_KEY
const URL = process.env.REACT_APP_URL

export default function Header({ setDisplays }) {
    const [profiles, setprofiles] = useState(null);
    const [APIDATA, setAPIDATA] = useState(null);
    const [Puuid, setPuuid] = useState(null);

    const pullPlayer = async (e) => {
        e.preventDefault()

        var indis = []
        const pullReturn = await Data(API_KEY, e.target.value)

        setAPIDATA(pullReturn.APIDATA)
        setPuuid(pullReturn.Puuid)

        for (let i = 0; i < pullReturn.APIDATA.length; i++)
            indis.push({ porfileID: i, name: pullReturn.APIDATA[i].cute_name })

        // console.log("Cutename: ", indis)
        setprofiles(indis)
    }

    const profileSelect = async (id) => {
        if (id === -1)
            return
        let base64Object = {}

        targetPaths.forEach(path => {
            if (path === "quiver" || path === "talisman_bag")
                base64Object[path] = APIDATA[id].members[Puuid].inventory.bag_contents[path].data
            else
                base64Object[path] = APIDATA[id].members[Puuid].inventory[path].data
        });

        measuring(base64Object)

        const response = await axios.post(`${URL}/select`,
            { base64Object: base64Object })
            .then(res => res.data.data)
            .catch(err => console.log(err))

        // console.log(response["personal_vault_contents"].value.i.value.value[1].tag.value.display.value.Lore.value.value)
        setDisplays(textFormater(response))
    }
    return <div>
        <input
            type="text"
            name="nick"
            placeholder="Username"
            defaultValue="Mehmo"
            onChange={(e) => pullPlayer(e)}
        />
        <select id="profiles" name="profiles" onChange={(e) => profileSelect(e.target.value)} defaultValue="-1">
            <option disabled value="-1" className='profile'>
                Profile
            </option>
            {profiles && profiles.map(profile =>
                <option key={profile.porfileID} value={profile.porfileID}>
                    {profile.name}
                </option>
            )}
        </select>
    </div>
}