const { handler } = require("./src");
const data = require("./data.json");
require("dotenv").config();
const debug = async (data) => {
    const response = await handler(data);
    console.log(response);
}

debug(data);