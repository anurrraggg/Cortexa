const express = require("express");

const uploadRoute = require("./routes/upload");
const fetchRoute = require("./routes/fetch");

const app = express();

app.use(express.json());

app.use("/api", uploadRoute);
app.use("/api", fetchRoute);

app.listen(3000, () => {

    console.log("Server running on port 3000");

});