
require("dotenv").config() ;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://subrota:subrota@cluster0.v4pnx7b.mongodb.net/?retryWrites=true&w=majority" ;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("products").collection("products-info");
  // perform actions on the collection object
  console.log("database connected");
  client.close();
});
