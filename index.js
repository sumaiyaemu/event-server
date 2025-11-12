const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
 const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qublzkr.mongodb.net/?appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
     
    const eventCollection = client.db('eventDB').collection('coffee');
    const venueCollection = client.db('eventDB').collection('coffee');

    app.get('/event',async(req, res) =>{
      const cursor = eventCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/event', async(req, res)=>{
      const newEvent = req.body;
      console.log(newEvent);
      const result = await eventCollection.insertOne(newEvent);
      res.send(result);
    })
    
    app.delete('/event/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await eventCollection.deleteOne(query);
      res.send(result);
    })
     app.post('/venue', async(req, res)=>{
      const venueEvent = req.body;
      console.log(venueEvent);
      const result = await venueCollection.insertOne(venueEvent);
      res.send(result);
    })
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   // await client.close();
  }
}
run().catch(console.dir);




 //middleware
 app.use(cors());
 app.use(express.json());





 app.get('/',(req, res) => {
    res.send('event making server is running')
 })
 app.listen(port, () => {
    console.log(`event server is running on port: ${port}`)
 })
