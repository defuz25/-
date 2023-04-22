const {Telegraf} = require("telegraf");

const TOKEN = '6188378629:AAHOUUDvEq7iI3r_TOK6NzSvLivE5I_pH3E';
const bot = new Telegraf(TOKEN);

bot.on('new_chat_members', (ctx)=>{
    ctx.sendMessage('Ура! У нас новый участник. Представься пожалуйста и напиши номер квартиры, которую ты представляешь.После этого прочитай закреплённое сообщение..');
});
bot.start((ctx) => {
    ctx.reply('Привет');
});
bot.launch();
