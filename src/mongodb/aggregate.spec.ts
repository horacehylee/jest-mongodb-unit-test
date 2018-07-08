// Copyright (c) 2018 horace
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";

describe("aggregate", () => {
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

  it("should aggregate docs from collection", async () => {
    const files = db.collection("files");

    await files.insertMany([
      { type: "Document" },
      { type: "Video" },
      { type: "Image" },
      { type: "Document" },
      { type: "Image" },
      { type: "Document" }
    ]);

    const topFiles = await files
      .aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
      .toArray();

    expect(topFiles).toEqual([
      { _id: "Document", count: 3 },
      { _id: "Image", count: 2 },
      { _id: "Video", count: 1 }
    ]);
  });
});
