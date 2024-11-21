const unzip = require("./scripts/unZip")

const express = require("express")
const cors = require("cors");
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.post("/select", async (req, res) => {
    const { base64Object } = req.body
    let longStringData = await unzip(base64Object)
    res.send({ data: longStringData });
})

app.listen(PORT, () => console.log(`Listenning on port :${PORT}`))
