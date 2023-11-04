const express = require('express');
const bodyParser = require('body-parser');
const docenteRoutes = require('./routes/docente');
const errorController = require('./controllers/error');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/docente', docenteRoutes);
app.get('/', (req, res) => { res.send('Funciona yay');});
app.use(errorController.get404);
app.use(errorController.get500);
app.listen(port, () => console.log(`Escuchando en el puerto ${port}`));
