import "../css/itemImage.css"
export default function Test({ item, texture }) {
    const backGroundUrl = "url('https://sky.shiiyu.moe/resourcepacks/FurfSky_Reborn/assets/minecraft/mcpatcher/cit/item/weapons/dungeons/melee/necromancer_sword/necromancer_sword.png')"
    const id = item.id.value,
        extraID = item.Damage.value,
        Name = item.tag.value.display.value.Name.value,
        extraAttributes = item.tag.value.ExtraAttributes.value.id.value,
        url = `./textures/${"main"}/${extraAttributes}.png`;
    try {
        // console.log(`${id}:${extraID}  ${Name}/${extraAttributes}`)
    } catch (error) { }
    return <div className="frame ">
        <div className="item-image" style={{ backgroundImage: backGroundUrl }} ></div >
    </div>
}