// Setting Collections
module.exports = () => {
  const api = {
    receta: { import: false, },
    usuario: { import: false }
  };
  Object.keys(api).forEach((collection) => {
    api[collection].model = require(`./${collection}/${collection}.model`);
  });
  return api;
};
