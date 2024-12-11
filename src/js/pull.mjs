import axios from "axios"

async function uuid(nick) {
    // test()
    return axios.get(`https://playerdb.co/api/player/minecraft/${nick ? nick : "Mehmox"}`)
        .then(res => res.data.data.player.raw_id)
        .catch(err => console.log("uuid pull error"))
}

export default async function Data(key, nick) {
    if (!nick)
        return
    const Puuid = await uuid(nick);
    return axios.get(`https://api.hypixel.net/v2/skyblock/profiles?key=${key}&uuid=${Puuid}`)
        .then((res) => {
            let dataObject = {}
            dataObject.APIDATA = res.data.profiles
            dataObject.Puuid = Puuid
            return dataObject
        })
        .catch(err => {
            err.status === "403" ? console.log("key expired") : console.log(err)
        })
}
async function test() {
    const test = await getSkillData("items")
    console.log(test)
    // var items = []
    // const targets = [
    //     "HELMET", "CHESTPLATE", "LEGGINGS", "BOOTS",
    //     "NECKLACE", "CLOAK", "BELT", "BRACELET", "GLOVES",
    //     "SWORD", "LONGSWORD", "BOW", "WAND",
    // ];
    // test.forEach(item => {
    //     for (let i = 0; i < targets.length; i++) {
    //         if (item.category === targets[i])
    //             items.push(item)
    //     }

    // });
    // console.log(items)
}
async function getSkillData() {
    const oldurl = "https://api.hypixel.net/v2/resources/skyblock/items"
    const newurl = "https://api.hypixel.net/resources/skyblock/items"
    return axios.get(newurl)
        .then((response) => response.data.items)
        .catch((err) => {
            console.log(err);
        })
}