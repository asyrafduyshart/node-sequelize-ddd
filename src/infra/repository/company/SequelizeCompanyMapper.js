const Company = require('src/domain/company/Company');

const SequelizeCompanyMapper = {
  toEntity({ dataValues }) {
    const { id, name, address } = dataValues;
  
    return new Company({ id, name, address });
  },
  
  toDatabase(survivor) {
    const { name, address } = survivor;
  
    return { name, address };
  }
};
  
module.exports = SequelizeCompanyMapper;