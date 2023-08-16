const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri")

// console.log(uri);

const client = new MongoClient(uri);

const dbname = "boardgame-ranker"

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`connected to the ${dbname} database`);
  } catch (err) {
    console.log(`error connecting to the ${dbname} database: ${err}`)
  } finally {
    await client.close();
  }
}

const main = async () => {
  try {
    await connectToDatabase();
    console.log(`connected to the ${dbname} database`);
  } catch (err) {
    console.log(`error connecting to the ${dbname} database: ${err}`)
  } finally {
    await client.close();
  }
}

main();