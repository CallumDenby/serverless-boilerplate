import bunyan from 'bunyan';

const log = bunyan.createLogger({
  name: process.env.SERVICE_NAME || 'NO_NAME',
  src: !!process.env.IS_OFFLINE,
});

log.level(bunyan[process.env.LOG_LEVEL || 'INFO']);

if (process.env.NODE_ENV === 'test') {
  log.level(bunyan.FATAL + 1);
}

export default log;
