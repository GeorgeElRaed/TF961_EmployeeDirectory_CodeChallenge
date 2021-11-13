const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();

const EMPLOYEES = JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname, 'Data.json'))).results?.reduce((acc, e) => {
    acc[e?.login?.username] = e;
    return acc;
}, {})

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {

    const { username, password } = req.body


    let user = EMPLOYEES[username];

    if (!user) res.sendStatus(403);

    const hash = crypto.createHash('sha256').update(`${password}${user.login.salt}`).digest('hex');
    if (user.login.sha256 !== hash) return res.sendStatus(403);

    res.send({
        token: user.login.uuid
    })


});



app.get('/employees', (req, res) => {
    let { offset = 0, limit = Object.keys(EMPLOYEES).length } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);

    res.send(Object.keys(EMPLOYEES).slice(offset, offset + limit).reduce((acc, key) => {
        acc[key] = EMPLOYEES[key];
        return acc;
    }, {}));
});


app.listen(8080, () => console.log('API is running on http://localhost:8080'));