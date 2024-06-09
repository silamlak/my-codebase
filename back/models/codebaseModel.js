import mongoose from "mongoose"

const snippetsModel = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Snippets', snippetsModel)