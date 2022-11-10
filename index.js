require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.send('Api work')
})
app.listen(port, () => {
    console.log(`App listen on port ${port} ! URL => http://localhost:${port}`);
})