require('dotenv').config();

const DragonsafeBot = require('./bot');

try {
  const bot = new DragonsafeBot();
  bot.init();
  console.log('DragonsafeBot started.');
} catch (e) {
  console.log('DragonsafeBot not started. Error:\n', e);
}
