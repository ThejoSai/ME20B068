const express = require('express');
require("./db");
const Product = require("./models");
var validator = require("email-validator");

const app = express();

app.use(express.json());



app.post('/api/products', async (req,res)=>{
    try{
        const product = new Product({
            name: req.body.name,
            email: req.body.email
        })
        if(validator.validate(product.email)){
            await product.save();
            return res.status(201).send(product);
        }
        else {
            return res.status(400).send("email wrong");
            
        }    

    }catch(e){
        return res.status(500).send("Server error");
    }
    
})
app.get('/api/products', async (req,res)=>{
    try{
        const products = await Product.find();
        return res.status(200).send(products);
    }catch(e) {
        return res.status(500).send(e);
    }
})

app.get('/api/products/:id', async (req,res)=>{
    const _id = req.params.id;
    try{
        const products = await Product.findById(_id);
        return res.status(200).send(products);
    }catch(e) {
        return res.status(500).send(e);
    }
})

app.patch('/api/products/:id', async (req,res)=>{
    const _id = req.params.id;
    try{
        const product = await Product.findByIdAndUpdate(_id, req.body);
        if(product){
            const productUp = await Product.findById(_id);
            if(validator.validate(productUp.email)){
                return res.status(200).send(productUp);
            }
            else {
                return res.status(400).send("email wrong");
                
            }    
        }
        else{
            return res.status(400).send("error");
        }
    }catch(e){
        return res.status(500).send(e);
    }
})

app.delete('/api/products/:id', async (req,res)=>{
    const _id = req.params.id;
    try{
        const product = await Product.findByIdAndDelete(_id);
        if(product){
            return res.status(400).send("deleted");
        }
        return res.send("failed");
    }catch(e){
        return res.status(500).send(e);
    }
})

app.listen(3000,()=>{console.log("Listening")});