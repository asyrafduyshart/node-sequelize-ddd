const { attributes } = require('structure');

const User = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  },
  age: Number,
  companyId: {
    type: Number,
    required: true
  },
  company: {
    type: Object,
    required: true
  }
})(class User {
  isLegal() {
    return this.age >= User.MIN_LEGAL_AGE;
  }
});

User.MIN_LEGAL_AGE = 21;

module.exports = User;
