import { MongoClient } from "mongodb";

const uri =
  "mongodb://user-fp-pweb:itssurabaya@35.193.181.126:27017/ecommerce?authSource=admin";
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
