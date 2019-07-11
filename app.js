const express = require('express')
const request = require('request')
const app = express()
const path = require('path');
const port = process.env.PORT || 8080
const events_api = process.env.EVENTS_API || "http://localhost:8081"

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/events', (req, res) => {
    request(events_api+req.query, function (error, response, html) {
        res.setHeader('content-type', 'text/json');
        res.send(response.body);
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})