module.exports = (async () => {
  return {
    type: 'postgres',
    logging: true,
    application_name: `test`,
    database: 'work_queue_dev',
    username: 'donvoy',
    password: '',
    host: '127.0.0.1',
    port: 5499,
  };
})();
