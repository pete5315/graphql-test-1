//import requirements for connecting to database
const { json } = require("express");
const { MongoClient } = require("mongodb");
const uri = require("../../atlas_uri");

//set up the client to connect so we don't need to write things like db.connection.idontknowwhat
const client = new MongoClient(uri);

//database name inside of cluster
const dbname = "boardgame-ranker";

//async function that just connects from the database and then disconnects, make sure your ip is whitelisted
const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log(`connected to the ${dbname} database`);
  } catch (err) {
    console.log(`error connecting to the ${dbname} database: ${err}`);
  } finally {
    await client.close();
  }
};

const readFromDatabase = async () => {
  try {
    await client.connect();
    const database = client.db(`${dbname}`);
    // const games = database.collection("games");
    // const query = {};
    // const options = {
    //   // sort returned documents in ascending order by title (A->Z)
    //   sort: { name: 1 },
    //   // Include only the `name` and `url` fields in each returned document
    //   projection: { _id: 0, name: 1, url: 1 },
    // };
    // const cursor = games.find(query, options);

    // if ((await games.countDocuments(query)) === 0) {
    //   console.log("No documents found!");
    // }
    // for await (const doc of cursor) {
    //   console.dir(doc);
    // }

    const tm = await database.collection("games").find(
      {},
      {
        // sort matched documents in descending order by url
        sort: { url: -1 },
        // Include only the `name` and `url` fields in the returned document
        projection: { _id: 0, name: 1, url: 1 },
      }
    );
    console.log(tm);
    const gameList = tm.toArray();
    console.log(gameList);
  } catch (err) {
    console.log(`error reading from the ${dbname} database: ${err}`);
  } finally {
    setTimeout(() => {
      client.close();
    }, 25000);
    await client.close();
  }

  // try {
  //   const database = client.db("sample_mflix");
  //   const movies = database.collection("movies");
  //   // query for movies that have a runtime less than 15 minutes
  //   const query = { runtime: { $lt: 15 } };
  //   const options = {
  //     // sort returned documents in ascending order by title (A->Z)
  //     sort: { title: 1 },
  //     // Include only the `title` and `imdb` fields in each returned document
  //     projection: { _id: 0, title: 1, imdb: 1 },
  //   };
  //   const cursor = movies.find(query, options);
  //   // print a message if no documents were found
  //   if ((await movies.countDocuments(query)) === 0) {
  //     console.log("No documents found!");
  //   }
  //   for await (const doc of cursor) {
  //     console.dir(doc);
  //   }
  // } finally {
  //   await client.close();
  // }
};

const writeToDatabase = async () => {
  try {
    await client.connect();
    const database = client.db(`${dbname}`);

    database.insertOne({
      name: "Brass: Birmingham",
      url: "aaa",
    });
  } catch (err) {
    console.log(`error posting to the ${dbname} database: ${err}`);
  } finally {
    await client.close();
  }
};

//invoke the connection to test it using 'node app.js' in the terminal
connectToDatabase();

//
readFromDatabase();
