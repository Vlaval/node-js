const log = msg => console.log(msg);

log("hello");

throw new Error('error!');

process.on('unhandledRejection', (e) => {
  logger.error(e);

  process.exit(255);
});
