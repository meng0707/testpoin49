const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  product: { type: String, required: true },
  quantity : { type: Number, required: false },
  order_date: { type: String, required: false },
  status: { type: String, required: false },

});

const Product = mongoose.model('order', productSchema);

module.exports = Product;




