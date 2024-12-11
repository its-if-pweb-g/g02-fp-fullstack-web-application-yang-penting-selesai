import { MongoClient } from "mongodb";

// Ini bisa langsung diubah disini atau
// tambahkan connection string MongoDB lewat file .env (rekomen)
// const uri = process.env.MONGODB_URI || "";
const uri =
  "mongodb://admin-db-ecommerce:SecurePass123456789@35.193.181.126:5050/ecommerce?authSource=admin";

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
