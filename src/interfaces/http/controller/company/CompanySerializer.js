const CompanySerializer = {
  serialize({ id, name, address }) {
    return {
      id,
      name,
      address
    };
  }
};
  
module.exports = CompanySerializer;
  