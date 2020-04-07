/* @flow strict */

// eslint-disable-next-line
const env = require('dotenv').parse(require('fs').readFileSync('.env'));

module.exports = {
  apps : [{
    name: 'API',
    script: 'entry.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    // eslint-disable-next-line
    max_memory_restart: '1G',
    env: {
      ...env,
      PORT: 3000,
      NODE_ENV: 'development',
      DEBUG: 'server:*'
    },
    // eslint-disable-next-line
    env_production: {
      ...env,
      PORT: 3000,
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
