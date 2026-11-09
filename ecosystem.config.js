// PM2 config for RParking. Works from whatever folder the repo is cloned into:
// no absolute path, no env file. Start with: pm2 start ecosystem.config.js
const PORT = process.env.PORT || '3000';

module.exports = {
  apps: [
    {
      name: 'rparking',
      cwd: __dirname,
      script: 'node_modules/next/dist/bin/next',
      args: `start -p ${PORT}`,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT,
        NEXT_TELEMETRY_DISABLED: '1',
      },
    },
  ],
};
