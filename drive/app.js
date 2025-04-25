const express = require('express');
const db = require('./config/db.js');
const router = require('./routes/index.js'); // Your main router


const app = express();

// ✅ Middleware order matters
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');

// ✅ Route prefix
app.use('/api/v1', router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('http://localhost:3000');
});
