const { Router } = require('express');
const { inject } = require('awilix-express');
const Status = require('http-status');

const CompaniesController = {
  get router() {
    const router = Router();

    router.use(inject('companySerializer'));

    router.get('/', inject('getAllCompanies'), this.index);
    router.get('/:id', inject('getCompany'), this.show);
    router.post('/', inject('createCompany'), this.create);
    router.put('/:id', inject('updateCompany'), this.update);
    router.delete('/:id', inject('deleteCompany'), this.delete);

    return router;
  },

  index(req, res, next) {
    const { getAllCompanies, companySerializer } = req;
    const { SUCCESS, ERROR } = getAllCompanies.outputs;

    getAllCompanies
      .on(SUCCESS, (companies) => {
        res
          .status(Status.OK)
          .json(companies.map(companySerializer.serialize));
      })
      .on(ERROR, next);

    getAllCompanies.execute();
  },

  show(req, res, next) {
    const { getCompany, companySerializer } = req;

    const { SUCCESS, ERROR, NOT_FOUND } = getCompany.outputs;

    getCompany
      .on(SUCCESS, (company) => {
        res
          .status(Status.OK)
          .json(companySerializer.serialize(company));
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    getCompany.execute(Number(req.params.id));
  },

  create(req, res, next) {
    const { createCompany, companySerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR } = createCompany.outputs;

    createCompany
      .on(SUCCESS, (company) => {
        res
          .status(Status.CREATED)
          .json(companySerializer.serialize(company));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(ERROR, next);

    createCompany.execute(req.body);
  },

  update(req, res, next) {
    const { updateCompany, companySerializer } = req;
    const { SUCCESS, ERROR, VALIDATION_ERROR, NOT_FOUND } = updateCompany.outputs;

    updateCompany
      .on(SUCCESS, (company) => {
        res
          .status(Status.ACCEPTED)
          .json(companySerializer.serialize(company));
      })
      .on(VALIDATION_ERROR, (error) => {
        res.status(Status.BAD_REQUEST).json({
          type: 'ValidationError',
          details: error.details
        });
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    updateCompany.execute(Number(req.params.id), req.body);
  },

  delete(req, res, next) {
    const { deleteCompany } = req;
    const { SUCCESS, ERROR,  NOT_FOUND } = deleteCompany.outputs;

    deleteCompany
      .on(SUCCESS, () => {
        res.status(Status.ACCEPTED).end();
      })
      .on(NOT_FOUND, (error) => {
        res.status(Status.NOT_FOUND).json({
          type: 'NotFoundError',
          details: error.details
        });
      })
      .on(ERROR, next);

    deleteCompany.execute(Number(req.params.id));
  }
};

module.exports = CompaniesController;
