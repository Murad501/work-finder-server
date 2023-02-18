const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(express.json())
app.use(cors())

app.get('/', (req, res)=>{
    res.send('data is coming soon')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@user1.istzhai.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log(uri);
const run = async() => {
    try{
        const userCollection = client.db('Work-Finder').collection('users')

    }
    catch{

    }
}

run().catch(err => console.log(err))


app.listen(port, ()=>{
    console.log('server is running on port', port)
})