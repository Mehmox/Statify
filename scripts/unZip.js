const nbt = require('prismarine-nbt');

async function unzip(base64_Object) {
    let result = base64_Object
    for (const base64 in base64_Object) {
        const buffer = Buffer.from(base64_Object[base64], 'base64');
        const { parsed } = await nbt.parse(buffer)
        result[base64] = parsed
        // console.log(parsed)
    }
    return result
}

module.exports = unzip