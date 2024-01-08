const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  configId: {
    type: String,
    required: true,
  },
  initialArray: {
    type: String,
    // required: true
  },
  remark:{
    type: String,
  }
});

module.exports = mongoose.model("data", expenseSchema);
