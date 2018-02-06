const Operation = require('src/app/Operation');

class GetAllCompanies extends Operation {
  constructor({ companiesRepository }) {
    super();
    this.companiesRepository = companiesRepository;
  }

  async execute() {
    const { SUCCESS, ERROR } = this.outputs;

    try {
      const companies = await this.companiesRepository.getAll({
        attributes: ['id', 'name', 'address']
      });

      this.emit(SUCCESS, companies);
    } catch(error) {
      this.emit(ERROR, error);
    }
  }
}

GetAllCompanies.setOutputs(['SUCCESS', 'ERROR']);

module.exports = GetAllCompanies;
