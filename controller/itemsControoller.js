const Items = require("../models/items");

module.exports.addItem = async (req, res) => {
  try {
    const { item } = req.body;
    console.log(item);
    if (!item) {
      throw new Error("Invalid item");
    }
    const oldItem = await Items.findOne({ itemName: item });
    console.log("oldItem", oldItem);
    if (oldItem) {
      throw new Error("This item already exists");
    }
    const newItem = new Items({
      itemName: item,
    });
    newItem.save().then((result) => {
      if (result) {
        res.status(200).json({ message: "Item added successfully", data: newItem, success: true });
      } else {
        throw new Error("Server error.");
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports.getItems = async (req, res) => {
  try {
    const items = await Items.find();
    if (items && items.length > 0) {
      res.status(200).json({ message: "Items fetched successfully", data: items, success: true });
    } else {
      throw new Error("No items found.");
    }
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
