const nbt = require('prismarine-nbt');

async function unzip(base64_Object) {
    let result = base64_Object
    for (const base64 in base64_Object) {//Loop

        if (Array.isArray(base64_Object[base64])) {

            for (let i = 0; i < base64_Object[base64].length; i++) {//Loop
                const buffer = Buffer.from(base64_Object[base64][i], 'base64');
                let { parsed } = await nbt.parse(buffer)
                result[base64][i] = parsed
            }

        } else {
            const buffer = Buffer.from(base64_Object[base64], 'base64');
            let { parsed } = await nbt.parse(buffer)
            result[base64] = parsed
        }
    }
    return result
}

module.exports = unzip