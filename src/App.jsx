import React, { useState } from 'react';
import "./css/Home.css"
import axios from 'axios';
import Data from "./js/pull.mjs"
import textFormater from "./js/textFormater.js"
import measuring from "./js/measure.js"
import targetPaths from "./varibles/paths.js"
const API_KEY = process.env.REACT_APP_API_KEY
const PORT = process.env.REACT_APP_PORT

function App() {
    const [profiles, setprofiles] = useState(null);
    const [APIDATA, setAPIDATA] = useState(null);
    const [Puuid, setPuuid] = useState(null);
    const [displays, setDisplays] = useState(null);
    let formatedDisplays = []
    if (displays)
        for (const key in displays)
            displays[key].forEach(row => formatedDisplays.push(row))

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

        const response = await axios.post(`http://localhost:${PORT}/select`,
            { base64Object: base64Object })
            .then(res => res.data.data)
            .catch(err => console.log(err))

        console.log(response)
        let testvar = textFormater(response)
        setDisplays(testvar)
        // console.log(testvar)
    }

    return (
        <>
            <div>
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
            <section>
                {formatedDisplays && formatedDisplays.map((item, index) => (
                    <div key={index} className='display'>
                        {item.map((rowtext, rowIndex) => (
                            <p
                                key={`${index}-${rowIndex}`}
                                dangerouslySetInnerHTML={{ __html: rowtext }}>
                            </p>

                        ))}
                    </div>
                ))}
            </section>
        </>
    );
}

export default App;