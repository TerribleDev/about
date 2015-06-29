var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'about.tommyparnell'
    },
    port: 4000,
  },

  test: {
    root: rootPath,
    app: {
      name: 'about.tommyparnell'
    },
    port: 4000,
  },

  production: {
    root: rootPath,
    app: {
      name: 'about.tommyparnell'
    },
    port: 80,
  }
};

module.exports = config[env];
