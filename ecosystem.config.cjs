module.exports = {
  apps: [
    {
      name: "myg-express-web",
      cwd: "/var/www/myg-express-web/current",
      script: "node_modules/next/dist/bin/next",
      args: "start --hostname 127.0.0.1 --port 3020",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "768M",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
