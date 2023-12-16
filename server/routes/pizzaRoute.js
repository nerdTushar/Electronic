const express = require('express');
const router = express.Router();
const pizzaModel = require('../models/PizzaModel');

// Get All Pizza || @Get Request
router.get('/getAllElectronics',async (req,res) => {
       try {
            const pizzas = await pizzaModel.find({});
            res.send(pizzas);
       } catch (error) {
            res.json({message : error});
       }
});

router.post('/addElectronic',async (req,res) => {
     const {pizza} = req.body;
       try {
            const newPizza = new pizzaModel({
               name : pizza.name,
               image : pizza.image,
               tag : pizza.tag,
               description : pizza.description,
               prices : pizza.prices
            })
            await newPizza.save();
            res.status(201).send('New Electronic Added');
       } catch (error) {
            res.json({message : error});
       }
});

router.post('/getelectronicbyid',async (req,res) => {
     const pizzaId = req.body.pizzaId;
     try {
          const pizza = await pizzaModel.findOne({_id:pizzaId});
          res.send(pizza);
     } catch (error) {
          res.json({message : error});
     }
});

router.post('/updateelectronic',async (req,res) => {
     const updatedPizza = req.body.updatedPizza;
     try {
          const pizza = await pizzaModel.findOne({_id:updatedPizza._id});
          pizza.name = updatedPizza.name;
          pizza.description = updatedPizza.description;
          pizza.image = updatedPizza.image;
          pizza.tag = updatedPizza.tag;
          pizza.prices = updatedPizza.prices;
          await pizza.save();
          res.status(200).send('Electronic Updated Successfully');
     } catch (error) {
          res.status(400).json({message : error});
     }
});

router.post('/deleteelectronic',async (req,res) => {
     const pizzaId = req.body.pizzaId;
     try {
          await pizzaModel.findOneAndDelete({_id:pizzaId});
          res.status(200).send('Electronic Deleted Successfully');
     } catch (error) {
          res.status(404).json({message : error});
     }
});

module.exports = router;