const express = require('express');
const router = express.Router();
const Product = require('../models/order');

// GET /api/orders
router.get('/', async (req, res) => {
  try {
    const orders = await Product.find(); 
    res.json(orders);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id); 

    if (!product) {
      return res.status(404).send('order not found'); 
    }
    
    res.json(product); 
  } catch (err) {
    res.status(500).send(err.message); 
  }
});

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { customer_name, product, quantity, order_date, status } = req.body;
    const newProduct = new Product({
      customer_name,
      product,
      quantity,
      order_date,
      status,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT /api/orders/:id
router.put('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { customer_name, product, quantity, order_date,  status } = req.body;
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { customer_name, product, quantity, order_date, status },
        { new: true, runValidators: true }
      );
      if (!updatedProduct) {
        return res.status(404).send('Product not found');
      }
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// DELETE /api/orders/:id
router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).send('Product not found');
      }
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

module.exports = router;