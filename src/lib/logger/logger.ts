import bunyan from 'bunyan';

const log = bunyan.createLogger({
  name: process.env.SERVICE_NAME,
  src: !!process.env.IS_OFFLINE,
});

if (process.env.NODE_ENV === 'test') {
  log.level(bunyan.FATAL + 1);
}

export default log;
