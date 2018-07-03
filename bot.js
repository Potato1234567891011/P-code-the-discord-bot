const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const bot = new Discord.Client();
const config = require("./config.json");
bot.config = config;
const EnmapLevel = require("enmap-level");

// Enmaps
const talkedRecently = new Set();
const guildSettingsTable = new EnmapLevel({ name: "guildSettings" });
bot.guildSettings = new Enmap({ provider: guildSettingsTable });
const paydayTimeoutData = new EnmapLevel({ name: "paydayTimeout" });
bot.paydayTimeout = new Enmap({ provider: paydayTimeoutData });
const workTimeoutData = new EnmapLevel({ name: "workTimeout" });
bot.workTimeout = new Enmap({ provider: workTimeoutData });
const companyCollectionData = new EnmapLevel({ name: "companyCollection" });
bot.companyCollection = new Enmap({ provider: companyCollectionData });
const companyEarningData = new EnmapLevel({ name: "companyEarning" });
bot.companyEarning = new Enmap({ provider: companyEarningData });
const companyEarningTimeData = new EnmapLevel({ name: "companyEarningTime" });
bot.companyEarningTime = new Enmap({ provider: companyEarningTimeData });
const companyColorData = new EnmapLevel({ name: "companyColor" });
bot.companyColor = new Enmap({ provider: companyColorData });
const companyCreatedData = new EnmapLevel({ name: "companyCreated" });
bot.companyCreated = new Enmap({ provider: companyCreatedData });
const PiggyBankData = new EnmapLevel({ name: "PiggyBank" });
bot.PiggyBank = new Enmap({ provider: PiggyBankData });
const CompanyStartData = new EnmapLevel({ name: "CompanyStart" });
bot.CompanyStart = new Enmap({ provider: CompanyStartData });

const defaultSettings = {
  prefix: "=",
  modlog: "425067997418487829",
  amtmodlogs: 0,
  welcomeChannel: "463640934890864640",
  welcomeMessage: "",
  byeChannel: "463640934890864640",
  byeMessage: "",
  joinLeaveLog: "463684757591425024",
  JoinLeaveNumber: 0
}

bot.defaultSettings = defaultSettings;
bot.talkedRecently = talkedRecently;
// We also need to make sure we're attaching the config to the bot so it's accessible everywhere!
bot.config = config;
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});
bot.commands = new Enmap();
fs.readdir("./commands", (err, files) => {
  if (err) throw err;
  bot.commandNames = files.map(f => f.substring(0, f.length - 3));
  console.log(`Loading a total of ${bot.commandNames.length} commands.`);
});
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    bot.commands.set(commandName, props);
  });
});
bot.login(config.token);