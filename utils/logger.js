import pino from "pino";

// const logger = pino({
//   transport: {
//     target: "pino-pretty",
//     options: {
//       colorize: true,
//       translateTime: "SYS:standard",
//       ignore: "pid,hostname",
//     },
//   },
  
// });
// const envDebug = process.env.NODE_ENV === 'development' ? 'debug' : 'info';
// const fileLogLevel = process.env.NODE_ENV === 'development' ? 'info' : 'warn';

const isDebugging = process.env.DEBUG === 'true';
console.log("isDebugging",isDebugging)

const logger = pino({
  // Set the overall minimum level. PINO won't process logs below this level.
  level: isDebugging ? 'debug' : 'info',
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      // Target 1: Pretty, colored logs sent to the console (stdout).
      {
        target: 'pino-pretty',
        // The level for this specific transport.
        level: isDebugging ? 'debug' : 'info',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
          // We don't specify a 'destination' here, so it goes to the console.
        },
      },
      // Target 2: Clean, JSON logs sent to a file.
      {
        target: 'pino/file',
        // target: 'pino-pretty',

        // Log 'info' and above to the file during debug,
        // and 'warn' and above in normal mode to keep the file clean.
        level: isDebugging ? 'warn' : 'info',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          destination: 'app.log',
        },
      },
    ],
  },
});

export default logger; 