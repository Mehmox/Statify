const nbt = require('prismarine-nbt');

async function unzip(base64_Object) {
    let result = base64_Object
    for (const base64 in base64_Object) {
        const buffer = Buffer.from(base64_Object[base64], 'base64');
        const { parsed } = await nbt.parse(buffer)
        result[base64] = parsed
        // console.log(parsed)
    }
    // testUnzipper(result.inv_contents
    //     .value.i.value.value[4].tag.value.SkullOwner.value.Properties.value.textures.value.value[0])
    return result
}

module.exports = unzip

async function testUnzipper(test) {
    for (const key in test) {
        const buffer = Buffer.from(test[key].value, 'base64');
        const { parsed } = await nbt.parse(buffer)
        test[key] = parsed
    }
    console.log(test)
}