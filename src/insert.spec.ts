const { MongoClient } = require("mongodb");

let connection;
let db;

beforeAll(async () => {
  console.log(global.__MONGO_URI__);
  connection = await MongoClient.connect(
    global.__MONGO_URI__,
    {
      useNewUrlParser: true
    }
  );
  db = await connection.db(global.__MONGO_DB_NAME__);
});

afterAll(async () => {
  await connection.close();
  await db.close();
});

it("should insert a doc into collection", async () => {
  const users = db.collection("users");

  const mockUser = { _id: "some-user-id", name: "John" };
  await users.insertOne(mockUser);

  const insertedUser = await users.findOne({ _id: "some-user-id" });
  expect(insertedUser).toEqual(mockUser);
});

it("should insert many docs into collection", async () => {
  const users = db.collection("users");

  const mockUsers = [{ name: "Alice" }, { name: "Bob" }];
  await users.insertMany(mockUsers);

  const insertedUsers = await users.find().toArray();
  expect(insertedUsers).toEqual([
    expect.objectContaining({ name: "John" }),
    expect.objectContaining({ name: "Alice" }),
    expect.objectContaining({ name: "Bob" })
  ]);
});
