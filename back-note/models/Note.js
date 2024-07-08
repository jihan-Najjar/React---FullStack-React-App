module.exports = mongoose.model('Note', NoteSchema);
const mongoose = require("mongoose");
// mongoose.sc
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      creationDate: {
        type: Date,
        default: Date.now
      }
});

const task = mongoose.model("Task", taskSchema);
module.exports = task;