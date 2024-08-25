const fs = require("fs");
const replaceTemplate = require("../modules/replaceTemplate");

// read all files
const data = fs.readFileSync(`./dev-data/data.json`, "utf8");
const dataObj = JSON.parse(data);
const card = fs.readFileSync(`./templates/card.html`, "utf8");
const overview = fs.readFileSync(`./templates/overview.html`, "utf8");
const product = fs.readFileSync(`./templates/product.html`, "utf8");

exports.home = (req, res) => {
  const cardsHtml = dataObj.map((el) => replaceTemplate(card, el)).join("");
  const output = overview.replace("{%PRODUCT_CARDS%}", cardsHtml);
  res.status(200).end(output);
};

exports.product = (req, res) => {
  const productObj = dataObj[req.params.id];
  const output = replaceTemplate(product, productObj);
  res.status(200).end(output);
};

exports.api = (req, res) => {
  res.status(200).send(data);
};
