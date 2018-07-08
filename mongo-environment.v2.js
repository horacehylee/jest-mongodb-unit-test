const NodeEnvironment = require("jest-environment-node");
const MongodbMemoryServer = require("mongodb-memory-server");

class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log("Setup MongoDB Test Environment");

    const MONGO_DB_NAME = "jest";
    this.mongod = new MongodbMemoryServer.default({
      instance: {
        dbName: MONGO_DB_NAME
      },
      binary: {
        version: "3.2.19"
      }
    });
    console.log("Started MongodbMemoryServer");

    this.global.__MONGO_URI__ = await this.mongod.getConnectionString();
    this.global.__MONGO_DB_NAME__ = MONGO_DB_NAME;

    await super.setup();
  }

  async teardown() {
    console.log("Teardown MongoDB Test Environment");
    console.log("Teardown mongod");
    await this.mongod.stop();

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = MongoEnvironment;
