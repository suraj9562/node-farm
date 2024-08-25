const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/replaceTemplate.js");

// read all files
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const dataObj = JSON.parse(data);

const card = fs.readFileSync(`${__dirname}/templates/card.html`, "utf8");
const overview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf8"
);
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf8");

// create server object
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { content: "text/html" });
    const cardsHtml = dataObj.map((el) => replaceTemplate(card, el)).join("");
    const output = overview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const productObj = dataObj[query.id];
    const output = replaceTemplate(product, productObj);
    res.end(output);
  } else if (pathname === "/api") {
    res.writeHead(200, { content: "application/json" });

    res.end(data);
  } else {
    res.writeHead(404, { content: "text/html" });
    res.end("<h1>404 Not Found<h1>");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`app is rendering at http://localhost:${port}`);
});
