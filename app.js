const express = require('express');
const fs = require('fs');
const {Telegraf} = require("telegraf");

const TOKEN = '6498204404:AAGLis-xP8IJwPybE-QDvJsDN1YrncGg-MA';
const bot = new Telegraf(TOKEN);
const port = 3000;
const listB = JSON.parse(fs.readFileSync(__dirname + '/b.json', 'utf8'));

const app = express();

let reminders;
function getBirthday(date, ctx){
    for(let person in listB){
        if(date.getDate() == listB[person][0] && (date.getMonth()+1) == listB[person][1]){
            ctx.telegram.sendMessage(ctx.chat.id, `Сегодня день рождения у пользователя ${person}!!! Поздравляем!!`);
        }
        if(date.getDate() == listB[person][0] && date.getMonth()+2 == listB[person][1]){
            ctx.telegram.sendMessage(ctx.chat.id, `У пользователя ${person} день рождения уже через месяц!`);
        }
        switch(Math.ceil((new Date(date.getFullYear(), listB[person][1]-1, listB[person][0]) - date)/(1000*3600*24))){
            case 7:
                ctx.telegram.sendMessage(ctx.chat.id, `У пользователя ${person} день рождения уже через неделю!`);
                break;
            case 3:
                ctx.telegram.sendMessage(ctx.chat.id, `У пользователя ${person} день рождения уже через 3 дня!`);
                break;
            case 1:
                ctx.telegram.sendMessage(ctx.chat.id, `У пользователя ${person} день рождения уже завтра!!`);
        }
    }
}

bot.command('near', (ctx) => {
    let date = new Date();
    let near = 367;
    let man;
    for(let person in listB){
        let diff = Math.ceil((new Date(date.getFullYear(), listB[person][1]-1, listB[person][0]) - date)/(1000*3600*24));
        if(diff > 0 && diff < near){
            near = diff;
            man = person;
        }
    }
    ctx.reply(`Ближайший день рождения будет через ${near} ${cyka = (near%10==1)?'день':(near%10<=4)?'дня':'дней'} у пользователя ${man}`);
});

bot.command('help', (ctx) => ctx.reply('/start - Включает ежедневные напоминания о днях рождения \n/stop - Выключает ежедневные напоминания о днях рождения \n/near - Выводит ближайшего именинника \n/help - Выводит список комманд'));

bot.command('start', (ctx)=>{
    ctx.reply('Ежедневные напоминания включены. Чтобы отключить введите /stop');
    reminders = setInterval(()=>{
        let date = new Date();
        if(date.getHours()==10 && date.getMinutes()==47 && date.getSeconds()==0){
            getBirthday(date, ctx);
        }
    }, 1000);
});
bot.command('stop', (ctx)=>{
    clearInterval(reminders);
    ctx.reply('Ежедневные напоминания отключены. Чтобы включить введите /start');
})

bot.launch();

app.listen(port, () => console.log("Listening on port", port));
