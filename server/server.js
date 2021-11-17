const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();

const EMPLOYEES = JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname, 'Data.json'))).results?.reduce((acc, e) => {
    acc[e?.login?.username] = e;
    return acc;
}, {})

const DELETED_EMPLOYEES = [];

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

    res.send(Object.keys(EMPLOYEES)
        .filter(e => !DELETED_EMPLOYEES.includes(e))
        .slice(offset, offset + limit).reduce((acc, key) => {
            acc[key] = EMPLOYEES[key];
            return acc;
        }, {}));
});

app.post('/employees', (req, res) => {
    const { employee } = req.body;

    const { password } = employee?.login
    const salt = crypto.randomBytes(16).toString('base64');
    const saltedPass = `${password}${salt}`;
    const md5 = crypto.createHash('md5').update(saltedPass).digest('hex');
    const sha1 = crypto.createHash('sha1').update(saltedPass).digest('hex');
    const sha256 = crypto.createHash('sha256').update(saltedPass).digest('hex');

    employee.login['salt'] = salt;
    employee.login['md5'] = md5;
    employee.login['sha1'] = sha1;
    employee.login['sha256'] = sha256;


    EMPLOYEES[employee?.login?.username] = employee;

    res.sendStatus(201);
});

app.get('/employees/:username', (req, res) => {
    let { username } = req.params;

    if (DELETED_EMPLOYEES[username]) return res.sendStatus(404);
    if (!EMPLOYEES[username]) return res.sendStatus(404);

    res.send(EMPLOYEES[username]);
});

app.delete('/employees', (req, res) => {
    const { usernames } = req.body;
    if (usernames) DELETED_EMPLOYEES.push(...usernames);
    res.sendStatus(200);
});

app.get('/employees-count', (req, res) => {
    res.send({ count: Object.keys(EMPLOYEES).filter(e => !DELETED_EMPLOYEES.includes(e)).length });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080'));