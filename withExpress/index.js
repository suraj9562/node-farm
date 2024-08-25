const express = require("express");
const nodeFarmRoutes = require("./routes/nodeFarmRoutes.js");
const port = 3000;

// create a app instance
const app = express();

app.use(nodeFarmRoutes);

// listen on port
app.listen(port, () => {
  console.log(`app is rendering at http://localhost:${port}`);
});
