import { MongoClient, ServerApiVersion } from 'mongodb'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    mode: 'strict',
    deprecationErrors: true,
  },
})

export default client
