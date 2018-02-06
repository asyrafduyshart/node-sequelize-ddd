const User = require('src/domain/user/User');
const UserCompany = require('src/domain/user/UserCompany');


const SequelizeUserMapper = {
  toEntity({ dataValues }) {
    const { id, name, companyId } = dataValues;
    
    return new User({ id, name, companyId });
  },

  toDatabase(survivor) {
    const { name, companyId } = survivor;

    return { name, companyId };
  },

  toUserCompany({ dataValues }){
    const { id, name } = dataValues;
    const company = dataValues.company;

    return new UserCompany({
      id,
      name,
      company:{
        companyName: company.name,
        companyAddress: company.address
      }});
  }

};

module.exports = SequelizeUserMapper;
