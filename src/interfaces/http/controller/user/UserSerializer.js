const UserSerializer = {
  serialize({ id, name, company }) {
    return {
      id,
      name,
      company
    };
  }
};

module.exports = UserSerializer;
