import colorMapRGB from "./colorMapRGB.js"
function spanMaker(styleCodeArray, text) {
    if (text.length === 0)
        return ""
    let styles = ""
    styleCodeArray.forEach(styleCode => {
        styles += colorMapRGB[styleCode]
    });
    return `<span style="${styles}">${text}</span>`
}
export default spanMaker