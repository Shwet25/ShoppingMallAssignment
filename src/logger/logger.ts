const {transports,createLogger} = require('winston')

const logConfiguration:any = {
  // format:format.printf(info => `[${Date()}],[${info.level.toUpperCase()}],[${path.basename(__filename)}],${info.message}`),
  transports: [
    new transports.File({
      level: 'error',
      filename: 'logs/error.log'
    }),
    new transports.File({
        level: 'info',
        filename: 'logs/info.log'
      })
  ]
};

const logger:any = createLogger(logConfiguration);

export default logger;
