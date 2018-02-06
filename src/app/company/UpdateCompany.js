const Operation = require('src/app/Operation');

class UpdateCompany extends Operation {
  constructor({ companiesRepository }) {
    super();
    this.companiesRepository = companiesRepository;
  }

  async execute(companyId, companyData) {
    const {
      SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR
    } = this.outputs;

    try {
      const company = await this.companiesRepository.update(companyId, companyData);
      this.emit(SUCCESS, company);
    } catch(error) {
      switch(error.message) {
      case 'ValidationError':
        return this.emit(VALIDATION_ERROR, error);
      case 'NotFoundError':
        return this.emit(NOT_FOUND, error);
      default:
        this.emit(ERROR, error);
      }
    }
  }
}

UpdateCompany.setOutputs(['SUCCESS', 'NOT_FOUND', 'VALIDATION_ERROR', 'ERROR']);

module.exports = UpdateCompany;
