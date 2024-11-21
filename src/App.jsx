import React, { useState } from 'react';
import "./css/Home.css"
import axios from 'axios';
import Data from "./js/pull.mjs"
import painter from "./js/painter.js"
import measuring from "./js/measure.js"
const API_KEY = process.env.REACT_APP_API_KEY;
const PORT = process.env.PORT || 3000
const inventoryPaths = [
    "backpack_icons",
    "quiver", "talisman_bag",
    "equipment_contents",
    "inv_armor",
    "inv_contents",
    "wardrobe_contents"
]
const all = [
    "backpack_contents",
    "backpack_icons",
    "bag_contents.fishing_bag", "bag_contents.potion_bag", "bag_contents.quiver", "bag_contents.sacks_bag", "bag_contents.talisman_bag",
    "ender_chest_contents",
    "equipment_contents",
    "inv_armor",
    "inv_contents",
    "personal_vault_contents",
    "sacks_counts",
    "wardrobe_contents"
]
function App() {
    const [profiles, setprofiles] = useState(null);
    const [APIDATA, setAPIDATA] = useState(null);
    const [Puuid, setPuuid] = useState(null);
    const [displays, setDisplays] = useState(null);
    let formatedDisplays = []
    if (displays)
        for (const key in displays)
            displays[key].forEach(row => formatedDisplays.push(row))

    const searchNick = async (e) => {
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
        if (id == -1)
            return
        let base64Object = {}
        // APIDATA[id].members[Puuid].inventory.personal_vault_contents.data
        // console.log(APIDATA[id].members[Puuid])

        inventoryPaths.forEach(path => {
            if (path == "quiver" || path == "talisman_bag")
                base64Object[path] = APIDATA[id].members[Puuid].inventory.bag_contents[path].data
            else
                base64Object[path] = APIDATA[id].members[Puuid].inventory[path].data
        });
        measuring(base64Object)
        const response = await axios.post('http://localhost:5000/select',
            { base64Object: base64Object })
            .then(res => res.data.data)
            .catch(err => console.log(err))

        console.log(response.inv_armor
            .value
            .i.value.value[0]
            .tag.value.display.value.Lore.value.value
        )

        let testvar = painter(response)
        setDisplays(testvar)
        console.log(testvar)

        /*
    console.log(APIBD[1].members[uuidd].inventory);
    console.log(APIBD[1].members[uuidd].rift.inventory.backpack_contents.data);
        */
    }

    return (
        <>
            <input
                id="nick"
                type="text"
                name="nick"
                placeholder="Username"
                defaultValue="Mehmo"
                onChange={(e) => searchNick(e)}
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
            <div className='display'>
                {formatedDisplays && formatedDisplays.map((item, index) => (
                    item.map((rowtext, rowIndex) => {
                        < p key={`${index}-${rowIndex}`}>{rowtext}</p>
                        // console.log(rowtext)
                    })
                ))}
            </div >
        </>
    );
}

export default App;