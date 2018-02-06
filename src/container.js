const { createContainer, Lifetime } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
const {
  CreateUser,
  GetAllUsers,
  GetAllUsersWithCompany,
  GetUser,
  UpdateUser,
  DeleteUser
} = require('./app/user');

const {
  CreateCompany,
  GetAllCompanies,
  GetCompany,
  UpdateCompany,
  DeleteCompany
} = require('./app/company');

const UserSerializer = require('./interfaces/http/controller/user/UserSerializer');
const CompanySerializer = require('./interfaces/http/controller/company/CompanySerializer');

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/repository/user/SequelizeUsersRepository');
const SequelizeCompaniesRepository = require('./infra/repository/company/SequelizeCompanyRepository');

const { database, User: UserModel, Company: CompanyModel } = require('./infra/database/models');

const container = createContainer();

// System
container
  .registerClass({
    app: [Application, { lifetime: Lifetime.SINGLETON }],
    server: [Server, { lifetime: Lifetime.SINGLETON }]
  })
  .registerFunction({
    router: [router, { lifetime: Lifetime.SINGLETON }],
    logger: [logger, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({ config });

// Middlewares
container
  .registerFunction({
    loggerMiddleware: [loggerMiddleware, { lifetime: Lifetime.SINGLETON }]
  })
  .registerValue({
    containerMiddleware: scopePerRequest(container),
    errorHandler: config.production ? errorHandler : devErrorHandler,
    swaggerMiddleware: [swaggerMiddleware]
  });

// Repositories
container.registerClass({
  usersRepository: [SequelizeUsersRepository, { lifetime: Lifetime.SINGLETON }],
  companiesRepository: [SequelizeCompaniesRepository, { lifetime: Lifetime.SINGLETON }]
});

// Database
container.registerValue({
  database,
  UserModel,
  CompanyModel
});

// Operations
container.registerClass({
  // Users
  createUser: CreateUser,
  getAllUsers: GetAllUsers,
  getAllUsersWithCompany: GetAllUsersWithCompany,
  getUser: GetUser,
  updateUser: UpdateUser,
  deleteUser: DeleteUser,

  //Companies
  createCompany: CreateCompany,
  getAllCompanies: GetAllCompanies,
  getCompany: GetCompany,
  updateCompany: UpdateCompany,
  deleteCompany: DeleteCompany
});

// Serializers
container.registerValue({
  userSerializer: UserSerializer,
  companySerializer: CompanySerializer 
});

module.exports = container;
