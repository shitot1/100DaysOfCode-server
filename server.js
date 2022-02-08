const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
const { usersRouter } = require("./routers/usersRouter");
const { questionsRouter } = require("./routers/questionsRouter");
const cors = require('cors')
app.use(cors());

app
    .use('/api/users', usersRouter)
    .use('/api/questions', questionsRouter);


app
    .use((req, res) => {
        res.send('wrong url')
    })
    .listen(port, () => {
        console.log(`Listening on port ${port}...`);
    });