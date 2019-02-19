const NamingStrategy = require('./naming-strategy');

module.exports = class TypeOrmConfigFactory {
  constructor(config) {
    this.config = config;
  }

  create() {
    return Object.assign(this.config, {
      namingStrategy: new NamingStrategy(),
    });
  }
};
