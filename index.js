const unzip = require("./Server/unZip")

const path = require('path');
const express = require("express")
const app = express()
const cors = require("cors");

const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.post("/select", async (req, res) => {
    const { base64Object } = req.body
    let itemObject = await unzip(base64Object)
    res.send({ data: itemObject });
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log(`Listenning on port :${PORT}`))