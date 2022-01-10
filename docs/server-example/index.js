const express = require('express');
const cors = require('cors');
const mockAffirmations = require('./affirms')
const app = express();


//NB: order of middleware is important
app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.options('/affirmations', cors())
app.get('/affirmations', (_, res) => {
    return res.send(mockAffirmations)
});

app.listen({ port: 4010 }, () =>
  console.log(`🚀 Server ready at http://localhost:4010`)
);