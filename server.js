const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
const { usersRouter } = require("./routers/usersRouter");
const cors = require('cors')
app.use(cors());

app
    .use('/api/users', usersRouter);


app
    .use((req, res) => {
        res.send('wrong url')
    })
    .listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });