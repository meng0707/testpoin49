require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;
const MONGO_DB_URI = process.env.MONGO_DB_URI; 


mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('เชื่อมต่อ MongoDB สำเร็จ'))
  .catch(err => console.log('ข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// นำเข้าและใช้งาน routes
const productRoute = require('./routes/orders'); 
app.use('/api/orders', productRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
