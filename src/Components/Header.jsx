import { useEffect } from "react"
import "../css/Header.css"

import Data from "../js/pull.mjs"
import TextureOptions from "../varibles/textures.js"


const API_KEY = process.env.REACT_APP_HYPIXEL_API_KEY

export default function Header({ setPlayerInfo, setTexture }) {
    useEffect(() => {
        const handleFormSubmit = async (e) => {
            e.preventDefault();
            var indis = []

            const pullReturn = await Data(API_KEY, document.querySelector("#nick").value)

            if (!pullReturn)
                return

            for (let i = 0; i < pullReturn.APIDATA.length; i++)
                indis.push({ profileID: i, name: pullReturn.APIDATA[i].cute_name })

            setPlayerInfo({
                nick: document.querySelector("#nick").value,
                Puuid: pullReturn.Puuid,
                profiles: indis,
                APIDATA: pullReturn.APIDATA
            })
        }

        document.querySelector("form").addEventListener("submit", handleFormSubmit)
        return () => {
            document.querySelector("form").addEventListener("submit", null)
        }
    }, [])

    return <header className="navbar bg-dark fixed-top">
        <div></div>
        <form className="d-flex nav-in">
            <input
                id='nick'
                type="text"
                placeholder="Username"
                defaultValue="Mehmox"
                className="pl-3 rounded-pill" />
            <button type="submit" >
                <svg width="24px" height="24px" viewBox="0 0 24 24">
                    <title>search</title>
                    <path fill="currentColor" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"></path>
                </svg>
            </button>
        </form>
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