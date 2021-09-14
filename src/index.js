const mongodb = require("mongodb");

const client = mongodb.createClient({
  url: process.env.MONGODB_URL,
});

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

try {
  await client.connect();
  console.log("Connected to MongoDB server");
  const db = client.db(process.env.MONGODB_DB || "nexrender");
  collection = db.collection(process.env.MONGODB_COLLECTION || "jobs");
} catch (e) {
  console.error(e);
}

/* public api */
const insert = async (entry) => {
  if (collection) {
    return await collection.insertOne(entry);
  } else {
    console.log("Error connecting to database");
    return null;
  }
};

const fetch = async (uid) => {
  if (uid) {
    return await collection.findOne({ _id: ObjectID(id) });
  } else {
    return await collection.find({}).sort({ createdAt: -1 });
  }
};

const update = async (uid, object) => {
  const now = new Date();
  return await collection.updateOne(
    { _id: ObjectID(uid) },
    { $set: Object.assign({}, object, { updatedAt: now }) }
  );
};

const remove = async (uid) => {
  return await collection.deleteOne({ _id: ObjectID(uid) });
};

const cleanup = () => {
  return await collection.deleteMany({});
};

module.exports = {
  insert,
  fetch,
  update,
  remove,
  cleanup,
};
