import axios from 'axios';
async function uuid(nick) {
    return axios.get(`https://playerdb.co/api/player/minecraft/${nick ? nick : "Mehmox"}`)
        .then(res => res.data.data.player.raw_id)
        .catch(err => console.log("uuid pull error"))
}

export default async function Data(key, nick) {
    const Puuid = await uuid(nick);
    return axios.get(`https://api.hypixel.net/v2/skyblock/profiles?key=${key}&uuid=${Puuid}`)
        .then((res) => {
            let dataObject = {}
            dataObject.APIDATA = res.data.profiles
            dataObject.Puuid = Puuid
            return dataObject
        })
        .catch(err => {
            err.status == "403" ? console.log("key expired") : console.log(err)
        })
}