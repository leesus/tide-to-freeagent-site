const chalk = require('chalk');
const server = require('./server');

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(chalk.green(`Server is listening on port ${PORT}`));
});
