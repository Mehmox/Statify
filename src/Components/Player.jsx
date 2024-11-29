import axios from 'axios';

import targetPaths from "../varibles/paths.js"
import measuring from "../js/measure.js"

const SERVER_URL = process.env.REACT_APP_SERVER_URL

export default function Player({ nick, APIDATA, Puuid, profiles, setDisplays }) {//object extraction
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
    return <div id="player_profile">
        {nick && <span>Stats for {nick} on </span>}
        <select onChange={(e) => profileSelect(e.target.value)} defaultValue="-1">
            <option disabled value="-1" className='default'>
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
