const CompanyMapper = require('./SequelizeCompanyMapper');

class SequelizeCompanysRepository {
  constructor({ CompanyModel }) {
    this.CompanyModel = CompanyModel;
  }

  async getAll(...args) {
    const companies = await this.CompanyModel.findAll(...args);

    return companies.map(CompanyMapper.toEntity);
  }

  async getById(id) {
    const company = await this._getById(id);

    return CompanyMapper.toEntity(company);
  }

  async add(company) {
    const { valid, errors } = company.validate();

    if(!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newCompany = await this.CompanyModel.create(CompanyMapper.toDatabase(company));
    return CompanyMapper.toEntity(newCompany);
  }

  async remove(id) {
    const company = await this._getById(id);

    await company.destroy();
    return;
  }

  async update(id, newData) {
    const company = await this._getById(id);

    const transaction = await this.CompanyModel.sequelize.transaction();

    try {
      const updatedCompany = await company.update(newData, { transaction });
      const companyEntity = CompanyMapper.toEntity(updatedCompany);

      const { valid, errors } = companyEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.details = errors;

        throw error;
      }

      await transaction.commit();

      return companyEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async count() {
    return await this.CompanyModel.count();
  }

  // Private

  async _getById(id) {
    try {
      return await this.CompanyModel.findById(id, { rejectOnEmpty: true });
    } catch(error) {
      if(error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Company with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
}

module.exports = SequelizeCompanysRepository;
