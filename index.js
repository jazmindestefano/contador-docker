const express = require('express');
const fs = require('fs');
const app = express();
require('dotenv').config();

const port = process.env.PORT;
const filePath = process.env.FILE_PATH;

app.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        let counter = JSON.parse(data);
        res.json({ count: counter.count });
    });
});

app.get('/add', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
            return;
        }
        let counter = JSON.parse(data);
        counter.count += 1;
        fs.writeFile(filePath, JSON.stringify(counter), 'utf8', (err) => {
            if (err) {
                res.status(500).send('no ok');
                return;
            }
            res.send('ok');
        });
    });
});

app.listen(port, () => {
  console.log(`Servidor de contador escuchando en http://localhost:${port}`);
});
