//import requirements for connecting to database
const { MongoClient } = require("mongodb");
const uri = require("./atlas_uri")

//set up the client to connect so we don't need to write things like db.connection.idontknowwhat
const client = new MongoClient(uri);

//database name inside of cluster
const dbname = "boardgame-ranker"

//async function that just connects from the database and then disconnects, make sure your ip is whitelisted
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

//invoke the connection to test it using 'node app.js' in the terminal
connectToDatabase();