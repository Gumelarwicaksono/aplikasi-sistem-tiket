const express = require('express');
const bodyParser = require('body-parser');
const databaseConnect = require('./config');
const routeGetTiket = require('./app/routes/routesTiket.js');
const routeUser = require('./app/routes/routesUser.js');
const routePesan = require('./app/routes/routesPesan.js');
const app = express();
const PORT = 3000;

databaseConnect;
app.use(bodyParser.json());

// rooting
// app.use('/api', routeGetTiket);
app.use('/api', routeUser);
app.use('/api', routeGetTiket);
app.use('/api', routePesan);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
