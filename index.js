const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

const filePath = process.env.FILE_PATH;
app.use(express.json());

async function initializeCounterFile() {
    try {
        await fs.access(filePath);
    } catch (err) {
        const initialData = JSON.stringify({ count: 0 });
        await fs.writeFile(filePath, initialData, 'utf8');
        console.log('Archivo counter.json creado con el valor inicial.');
    }
}

app.get('/', async (req, res) => {
    await initializeCounterFile();

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const counter = JSON.parse(data);
        res.json({ count: counter.count });
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Error reading file');
    }
});

app.get('/add', async (req, res) => {
    await initializeCounterFile();

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const counter = JSON.parse(data);
        counter.count += 1;
        await fs.writeFile(filePath, JSON.stringify(counter), 'utf8');
        res.send('ok');
    } catch (err) {
        console.error('Error processing request:', err);
        res.status(500).send('Error processing request');
    }
});

app.listen(port, () => {
    console.log(`Counter server listening at http://localhost:${port}`);
});
