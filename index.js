const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("data is coming soon");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@user1.istzhai.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

console.log(uri);
const run = async () => {
  try {
    const usersCollection = client.db("Work-Finder").collection("users");
    const companiesCollection = client.db('Work-Finder').collection('companies')
    const postsCollection = client.db("Work-Finder").collection("posts");
    const applyingCollection = client.db('Work-Finder').collection('applying')

    app.post("/user", async (req, res) => {
      const user = req.body;
      const email = user.email;
      const query = { email: email };
      const addedUser = await usersCollection.findOne(query);
      const addedCompany = await companiesCollection.findOne(query)
      if (addedUser || addedCompany) {
        return res.send({ acknowledged: true });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.post("/company", async (req, res) => {
      const company = req.body;
      const result = await companiesCollection.insertOne(company);
      res.send(result);
    });

    app.get('/posts', async(req, res) => {
        const query = {}
        const result = await postsCollection.find(query).toArray()
        res.send(result)
    })

    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postsCollection.insertOne(post);
      res.send(result);
    });

    app.post('/applying', async(req, res)=>{
        const bookedJob = req.body
        const result = await applyingCollection.insertOne(bookedJob)
        res.send(result)
    })

    app.get('/applied', async(req, res)=>{
        const email = req.query.email
        const query = {appliedBy: email}
        const result = await applyingCollection.find(query).toArray()
        res.send(result)
    })
  } catch {}
};

run().catch((err) => console.log(err));

app.listen(port, () => {
  console.log("server is running on port", port);
});
