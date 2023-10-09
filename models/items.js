const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    itemName: {
      type: String,
      default: "",
      index: true,
    },
  },
  { timestamp: true }
);

const Items = model("items", itemSchema);
module.exports = Items;
