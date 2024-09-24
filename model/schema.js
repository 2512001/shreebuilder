const mongoose = require('mongoose');

const schema = mongoose.Schema; // Remove the parentheses

const quoteSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function (v) {
        return v.toString().length === 10;
      },
      message: 'Phone number must be 10 digits'
    }
  },
  message: {
    type: String
  }
});


const contactSchema = new schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,

  },
  message: {
    type: String
  }
});


const Quote = mongoose.model("quote", quoteSchema);
const contact = mongoose.model("contact", contactSchema);

module.exports = {
  Quote,
  contact
}