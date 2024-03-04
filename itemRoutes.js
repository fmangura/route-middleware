const express = require('express');
const router =  express.Router();
const ExpressError = require('./expressError');
const items = require('./fakeDb')

router
    .get('/', (req, res, next) => {
        try{
            console.log('Returning items list as JSON')
            res.json({ items })
        } catch(err){
            return next(err)
        }
    })

    .post('/', function (req, res, next) {
        try {
            const newItem = {
                name: req.body.name,
                price: req.body.price
            }
            items.push(newItem)
            res.status(201).json({"added": newItem})

        } catch(err){
            return next(err)
        }
    })

    .get('/:name', function(req, res) {
        const item = items.find(item => item.name === req.params.name)
        if (item === undefined) {
            throw new ExpressError('Item not Found', 404)
        }
        res.json({name:item.name, price:item.price})
    })

    .patch('/:name', function(req, res){
        const item = items.find(item => item.name === req.params.name)
        if (item === undefined) {
            throw new ExpressError('Item not Found', 404)
        }
        item.name = req.body.name
        item.price = req.body.price
        res.status(200).json({"Updated":item})
    })

    .delete('/:name', function(req, res){
        const item = items.findIndex(item => item.name === req.params.name)
        if (item === -1) {
            throw new ExpressError('Item not Found', 404)
        }
        items.splice(item, 1)
        res.status(200).json({message: "Deleted"})
    })


module.exports = router;