const { MongoClient } = require('mongodb');

async function check() {
  const uri = "mongodb://admin:admin12345@ac-etmb54l-shard-00-00.h4onbz9.mongodb.net:27017/cielora?ssl=true&authSource=admin";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('admin');
    const result = await db.command({ isMaster: 1 });
    console.log("Replica Set Name:", result.setName);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

check();
