const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
const cors = require('cors')
app.use(cors());

app
    .use((req, res) => {
        res.send('WRONG URL')
    })
    .listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });