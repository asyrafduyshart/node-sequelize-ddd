const Operation = require('src/app/Operation');

class DeleteCompany extends Operation {
  constructor({ companiesRepository }) {
    super();
    this.companiesRepository = companiesRepository;
  }

  async execute(userId) {
    const { SUCCESS, ERROR, NOT_FOUND } = this.outputs;

    try {
      await this.companiesRepository.remove(userId);
      this.emit(SUCCESS);
    } catch(error) {
      if(error.message === 'NotFoundError') {
        return this.emit(NOT_FOUND, error);
      }

      this.emit(ERROR, error);
    }
  }
}

DeleteCompany.setOutputs(['SUCCESS', 'ERROR', 'NOT_FOUND']);

module.exports = DeleteCompany;
