const express = require('express')
const cors = require('cors');

const app = express();
app.use(cors());
const port = 4010;

app.get('/affirmations', (_,res) => {
    res.send({ "hits": [{ objectID: 1, url: "hello", title: "title"}, { objectID: 2, url: "hello2", title: "title2"}]})
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })