const Operation = require('src/app/Operation');
const Company = require('src/domain/company/Company');

class CreateCompany extends Operation {
  constructor({ companiesRepository }) {
    super();
    this.companiesRepository = companiesRepository;
  }

  async execute(companiesData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;

    const company = new Company(companiesData);

    try {
      const newCompany = await this.companiesRepository.add(company);

      this.emit(SUCCESS, newCompany);
    } catch(error) {
      if(error.message === 'ValidationError') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateCompany.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateCompany;
