require("dotenv").config() ;
const express = require("express") ;
const app = express() ;
const cors = require("cors") ;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 3018 ;
app.use(cors()) ;
app.use(express.json()) ;

app.get("/" , (req , res) => {
res.send("Hello friend") ;
})


try {

const uri = process.env.mongoUrl ;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("products").collection("products-info");


app.post('/products' , async (req , res) => {
const product = req.body ;
const result = await collection.insertOne(product) ; //insert object
res.send(result)
})

app.get('/products' , async (req , res) => {
const findData =  await collection.find({}).toArray() ;
res.send(findData) ;
})

app.get('/products/:id' , async (req , res) => {
const id = req.params.id ;
const query = {_id : ObjectId(id)} ;
const findSingleProdut = await collection.findOne(query) ;
res.send(findSingleProdut) ;
})

app.delete("/products/:id" , async (req , res) => {
const deleteId = req.params.id ;
const query ={_id : ObjectId(deleteId)}
const result = await collection.deleteOne(query) ;
res.send(result) ;
})

app.put("/products/:id" , async (req , res ) => {
const id = req.params.id ;
const query = {_id : ObjectId(id)} ;
const product = req.body ;
const options = {upsert:true} ;
const productData = {
$set:{ 
productPhoto :  product.productPhoto , 
productName :    product.productName ,    
productPrice :   product.productPrice ,   
productQuantity:  product.productQuantity ,   
}
}
const result = await collection.updateOne(query , productData , options) ;
res.send(result) ;
})


} catch (error) {
console.log(error);
}

app.listen(port , (req , res ) => {
console.log("Your server running on port " + port);
})

