import Data from "../js/pull.mjs"
import TextureOptions from "../varibles/textures.js"

import search from "../img/Search.png"

const API_KEY = process.env.REACT_APP_HYPIXEL_API_KEY

export default function Header({ setNICK, setAPIDATA, setPuuid, setprofiles, setTexture }) {
    const pullPlayer = async () => {
        var indis = []
        setNICK(document.querySelector("#nick").value)
        const pullReturn = await Data(API_KEY, document.querySelector("#nick").value)

        setAPIDATA(pullReturn.APIDATA)
        setPuuid(pullReturn.Puuid)

        for (let i = 0; i < pullReturn.APIDATA.length; i++)
            indis.push({ porfileID: i, name: pullReturn.APIDATA[i].cute_name })

        setprofiles(indis)
    }
    return <header>
        <input
            id='nick'
            type="text"
            placeholder="Username"
            defaultValue="Mehmox"
        />
        <img src={search} alt="" onClick={pullPlayer} />
        <select onChange={(e) => setTexture(e.target.value)} defaultValue="0">
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