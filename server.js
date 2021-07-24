const express = require('express')
const next = require('next')


const dev = process.env.NODE_ENV !== 'production'

const port = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express();
    server.get("*", (req, res) => {
        return handle(req, res);
    })

    server.use(express.json());
    server.use(express.urlencoded({ extended: false }))
    server.use("/api/zoho/gst", require("./backend/rourtes/zoho/gst"))
    server.listen(port, (err) => {
        if (err) throw err
        console.log(`Server Listening at port ${port}`)
    })
}).catch(err => {
    // process.exit(1)
    console.log(err)
})

