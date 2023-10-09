const express = require("express");
const itemRouter = express.Router();
const { addItem, getItems } = require("../controller/itemsControoller");
const { validateToken } = require("../middlewares/auth");

itemRouter.post("/addItem", validateToken, addItem);
itemRouter.get("/getItems", validateToken, getItems);

module.exports = itemRouter;
