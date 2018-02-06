const Operation = require('src/app/Operation');

class GetCompany extends Operation {
  constructor({ companiesRepository }) {
    super();
    this.companiesRepository = companiesRepository;
  }

  async execute(companyId) {
    const { SUCCESS, NOT_FOUND } = this.outputs;

    try {
      const company = await this.companiesRepository.getById(companyId);
      this.emit(SUCCESS, company);
    } catch(error) {
      this.emit(NOT_FOUND, {
        type: error.message,
        details: error.details
      });
    }
  }
}

GetCompany.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = GetCompany;
