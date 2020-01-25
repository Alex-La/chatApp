const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  id: { type: String, required: true, unique: true },
  room: { type: String, required: true, unique: true },
  name: { type: String, required: true }
});

module.exports = model("Room", schema);
