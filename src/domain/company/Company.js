const { attributes } = require('structure');

const Company = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
})(class Company {
  isLegal() {
    return false;
  }
});


module.exports = Company;
