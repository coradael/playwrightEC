const fs = require("fs");
const path = require("path");

module.exports = async () => {
  const storagePath = path.resolve("storage/storageState.json");
  const emptyStorage = {
    cookies: [],
    origins: [],
  };
};
