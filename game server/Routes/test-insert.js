// test-insert.js
require('dotenv').config();
const mongoose = require('mongoose');

async function run() {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error('No MONGO_URI found in .env — stop and add it.');
    process.exit(1);
  }

  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB:', mongoose.connection.name);

  // Insert one document into 'users' collection
  const col = mongoose.connection.db.collection('users');
  const result = await col.insertOne({
    name: 'DirectTest-' + Date.now(),
    email: 'direct' + Date.now() + '@example.com',
    createdAt: new Date()
  });

  console.log('Inserted id:', result.insertedId);

  // show collections in this DB
  const cols = await mongoose.connection.db.listCollections().toArray();
  console.log('Collections in DB:', cols.map(c => c.name));

  await mongoose.disconnect();
  console.log('Disconnected');
}

run().catch(err => {
  console.error('Test-insert error:', err);
  process.exit(1);
});
