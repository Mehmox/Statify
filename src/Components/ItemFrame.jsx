import itemTable from "../varibles/itemIDs.js"
export default function Test({ item, src, texture }) {
    const id = item.id.value,
        extraID = item.Damage.value,
        Name = item.tag.value.display.value.Name.value,
        extraAttributes = item.tag.value.ExtraAttributes.value.id.value;

    try {
        console.log(`${id}:${extraID}  ${Name}/${extraAttributes}`)
    } catch (error) { }
    const url = `./textures/${"main"}/${extraAttributes}.png`
    return <>
        <img src={url} alt="" />
    </>
}