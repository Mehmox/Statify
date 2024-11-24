import colorMapRGB from "./colorMapRGB.js"
import { v4 as uuidv4 } from 'uuid';

export default function SpanMaker({ styleCodeArray, text }) {
    if (text.length === 0)
        return ""
    let styles = {
        color: null,
        "fontWeight": null,
        "textDecoration": null,
        "fontStyle": null,
        "": null
    }
    styleCodeArray.forEach(styleCode => {
        const [styleType, value] = colorMapRGB[styleCode]
        if (value)
            styles[styleType] = value
    });
    return <span
        key={uuidv4()}
        style={styles}>
        {text}
    </span>
}
