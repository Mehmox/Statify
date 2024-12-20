import { React, useState, useEffect } from "react";
import axios from 'axios';

import targetPaths from "../varibles/paths.js"
import measuring from "../js/measure.js"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export default function Player({ player, setDisplays }) {
    const [selectVal, setselectVal] = useState(-1)
    useEffect(() => setselectVal(-1), [player])
    const profileSelect = async (id) => {
        setselectVal(id)
        if (id === -1)
            return
        let base64Object = {}
        let bigDataPath = player.APIDATA[id].members[player.Puuid].inventory

        targetPaths.forEach(path => {
            try {
                if (path === "quiver" || path === "talisman_bag")
                    base64Object[path] = bigDataPath.bag_contents[path].data
                else if (path === "backpack_contents" || path === "backpack_icons") {//burda sanki bi hata mı var
                    base64Object[path] = []
                    for (const key in bigDataPath[path])
                        base64Object[path].push(bigDataPath[path][key].data)
                } else
                    base64Object[path] = bigDataPath[path].data
            } catch (err) {
                console.log(err)
            }
        });

        measuring(base64Object)

        const response = await axios.post(`${SERVER_URL}/select`, { base64Object: base64Object })
            .then(res => res.data.data)
            .catch(err => console.log(err))

        for (const key in response) {
            if (Array.isArray(response[key])) {
                for (let i = 0; i < response[key].length; i++)
                    response[key][i] = response[key][i].value.i.value.value
            }
            else
                response[key] = response[key].value.i.value.value
        }
        // console.log(response)
        setDisplays(response)
    }
    return <div id="player_profile">
        {player.nick && <span>Stats for {player.nick} on </span>}
        <select onChange={(e) => profileSelect(e.target.value)} value={selectVal}>
            <option disabled value="-1" className='default'>
                Profile
            </option>
            {player.profiles && player.profiles.map(profile =>
                <option key={profile.profileID} value={profile.profileID}>
                    {profile.name}
                </option>
            )}
        </select>

    </div>
}
