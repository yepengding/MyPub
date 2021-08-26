const Publication = artifacts.require("Publication");

module.exports = function(deployer) {
  deployer.deploy(Publication);
};
