// Don't change these lines of code. This is to allow the bot to remain hosted on glitch.com 24/7.
const http = require('http');
const express = require('express');
const app = express();


app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//Main var's
const Discord = require("discord.js");
const prefix = "=";
const token = process.env.TOKEN;
const bot = new Discord.Client();


bot.on("ready", () => {
bot.user.setActivity("Do =help, or =contact!", {type: "streaming", url: "https://www.twitch.tv"});
  const servers = []
  bot.guilds.forEach(g => {
      servers.push(`${g.id}|${g.memberCount}|${g.name}`)
      })
  console.log(servers.join("\n"))
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
});

process.on("unhandledRejection", err => console.error(err.stack || err))

bot.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  bot.channels.get(`412973894912180235`).send(`I have been added to: ${guild.name} (id: ${guild.id})`);
});

bot.on("guildCreate", guild => {
  bot.user.setActivity("do =help!");
  console.log("Logged in!")
  });

bot.on("message", async msg => {
  if(msg.channel.type === `dm` || msg.channel.type === `group` || msg.content.indexOf(prefix) !== 0 || msg.author.bot) return;
  
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const ownerID = "310853886191599616";
  const pcode = msg.guild.members.get("419806744907350017")
  
  //NOTE calculating uptime 
function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return (hours) + ' hours and ' + (minutes) + ' minutes and ' + (seconds) + ' seconds';
}

bot.on('guildMemberRemove', member => {
    let guild = member.guild;
    console.log("Test");
    guild.channels.get('321595311992602626').send(`Test`);
    })

  
  
//NOTE Variables---------------------------|
var uptime = process.uptime();
var n = "\n";
  
  
  //Developer cmds
if(cmd === "restart") {
  if(msg.author.id === ownerID) {
  msg.channel.send("Restarting...").then(msg => process.exit(1));
 } else {
 msg.channel.send("You are not allowed to use this cmd!")
 }
  }
if(cmd === "eval") {
     if(msg.author.id === ownerID){
       try {
           var eturn = eval(msg.content.slice(5).trim());
       }
       catch (e) {
           eturn = e;
       }
       msg.channel.send({
           embed: {
               fields: [
                   {
                       name: 'Input',
                       value: '```'+msg.content.slice(5).trim()+'```'
                   },
                   {
                       name: 'Output',
                       value: '```'+eturn+'```'
                   }
               ]
           }
       });
  } else {
 msg.channel.send("You are not allowed to use this cmd!")
 }
}
if(cmd === "say") {
  if(msg.author.id === ownerID) {
    const saymsg = args.join(" ");
      msg.delete().catch(O_o=>{});
        msg.channel.send(saymsg);
 } else {
 msg.channel.send("You are not allowed to use this cmd!")
 }
}
if(cmd === "servers") {
  if(msg.author.id === ownerID){
  const getMemberCount = () => {
  let amount = 0;
  bot.guilds.forEach(c=>amount+=c.memberCount);
  return amount;
}
    const servers = []
        bot.guilds.forEach(g => {
          servers.push(`${g.id} | ${g.memberCount} | ${g.name}`)
        })
                  msg.channel.send('```'+servers.join("\n") + n + "-------------------------------------------------------------------------" + n + `A total of ${bot.guilds.size} guilds, ${bot.channels.size} channels and ${getMemberCount()} members` +'```')
 } else {
 msg.channel.send("You are not allowed to use this cmd!")
 }  
}
if(cmd === "leave") {
  if(msg.author.id === ownerID) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
        let id = args[0];
          bot.guilds.get(id).leave()
            msg.channel.send("Left server!")
 } else {
 msg.channel.send("You are not allowed to use this cmd!")
 }
};  
if(cmd === "status"){
  if(msg.author.id === ownerID){
  const status = args.join(" ");
  if(!status)
    return msg.reply("Give me a status to change to")
  bot.user.setActivity(status, {type: "playing"});
  msg.channel.send("Done, changed status.")
 } else {
 msg.channel.send("You are not allowed to use this cmd!")
 }
}
  
  //Server cmds
if(cmd === "verify") {
    let member = msg.mentions.members.first();
    let role = msg.guild.roles.find("name", "Verified");
    if(msg.guild.id === '268057885487923202') {
    if(msg.member.hasPermission('BAN_MEMBERS')){
        if(!member) {
          return msg.reply("Please mention a valid member of this server");
        } else
        if(role == null) {
            msg.channel.send(`${msg.author} there is no role called "Verified"`)
        } else
      msg.channel.send(`${msg.author} added ${role} to ${member}!`)
    }else {
      msg.channel.send(`${msg.author} you don't have \`BAN_MEMBERS\` permission!`)
    }
    member.addRole(role)
  } else {
  msg.channel.send(`This cmd can't be used in this server!`)
}
} //Server: Cacti Fin's Official Server

  //Help cmd
if(cmd === "help"){
  if(args[0] === undefined){
     if(pcode.hasPermission('EMBED_LINKS')){
     const embed = new Discord.RichEmbed()
  .setTitle(`Help for ${msg.author.tag}`)
  .setColor(0x00AE86)
  .setFooter(`P-code`)
  .setThumbnail(bot.displayAvatarURL)
  .setTimestamp()
     .addField("Categories:", "all - sends all help there is" + n + "mod - sends all moderation help" + n + "info - sends all information help" + n + "fun - sends all fun help")
     .addField("Do =help <category", "Example: =help mod")
  msg.channel.send({embed});
    } else {
  return msg.reply("I don't have ``EMBED_LINKS`` permission so i can't send help.")
}
}
  if(args[0] === "all"){
       msg.reply("help as been sent to your DMs!")
        const embed = new Discord.RichEmbed()
  .setTitle(`Moderation`)
  .setColor(0x00AE86)
  .setFooter(`P-code`)
  .setThumbnail(bot.displayAvatarURL)
  .setTimestamp()
        .addField("|--- Moderation ---|","cmds you can use to moderate the server")
        .addField(`• kick`,`Kicks a user from the server` + n + `=kick <mention> <reason> (reason is optional)`)
        .addField(`• ban`,`Bans a user from the server` + n + `=ban <mention> <reason> (reason is optional)`)
        .addField(`• hackban`,`Bans a user using their ID` + n + `=hackban <UserID>`)
        .addField(`• unban`,`Unbans a user using their ID` + n + `=unban <ID>`)
        .addField(`• addrole`,`Add's a role to a user` + n + `=addrole <mention> <role>`)
        .addField(`• removerole`,`removes a role from a user` + n + `=removerole <mention> <role>`)
        .addField(`• setnick`,`Changes the nickname of a user` + n + `=setnick <mention <nickname>`)
        .addField(`• resetnick`,`Changes ALL nicknames on the server to their default discord names` + n + `=resetnick (Admin only!)`)
        .addField(`• purge`,`Clears messages in a channel` + n + `=purge <amount>`)
        .addField("|--- Information ---|","cmds you can use to get information")
        .addField(`• user`,`Sends info about a user` + n + `=info user <mention> (if there is no mention, the info is about you)`)
        .addField(`• bot`,`Sends info about me` + n + `=info bot`)
        .addField(`• guild`,`Sends info about the guild (server)` + n + `=info guild`)
        .addField(`• channel`,`Sends info about the channel` + n + `=info channel`)
        .addField(`• role`,`Sends info about a role` + n + `=info role <name> (case sensitive)`)
        .addField("|--- Fun ---|","Funny cmds")
        .addField(`• lenny`,`Sends a random lenny face` + n + `=lenny`)
        .addField(`• meme`,`Sends a random meme` + n + `=meme`)
        .addField(`• choose`,`Chooses between 2 given options` + n + `=choose <option 1> <option 2>`)
        .addField(`• dice`,`Rolls a dice` + n + `=dice`)
        .addField(`• 8ball`,`Answers your yes/no question` + n + `=8ball <question>`)
  msg.author.send({embed});
    }
  if(args[0] === "mod"){
        msg.reply("help as been sent to your DMs!")
        const embed = new Discord.RichEmbed()
  .setTitle(`Moderation`)
  .setColor(0x00AE86)
  .setFooter(`P-code`)
  .setThumbnail(bot.displayAvatarURL)
  .setTimestamp()
  .addField(`• kick`,`Kicks a user from the server` + n + `=kick <mention> <reason> (reason is optional)`)
        .addField(`• ban`,`Bans a user from the server` + n + `=ban <mention> <reason> (reason is optional)`)
        .addField(`• hackban`,`Bans a user using their ID` + n + `=hackban <UserID>`)
        .addField(`• unban`,`Unbans a user using their ID` + n + `=unban <ID>`)
        .addField(`• addrole`,`Add's a role to a user` + n + `=addrole <mention> <role>`)
        .addField(`• removerole`,`removes a role from a user` + n + `=removerole <mention> <role>`)
        .addField(`• setnick`,`Changes the nickname of a user` + n + `=setnick <mention <nickname>`)
        .addField(`• resetnick`,`Changes ALL nicknames on the server to their default discord names` + n + `=resetnick (Admin only!)`)
        .addField(`• purge`,`Clears messages in a channel` + n + `=purge <amount>`)
  msg.author.send({embed});
      }
  if(args[0] === "info"){
           msg.reply("help as been sent to your DMs!")
        const embed = new Discord.RichEmbed()
  .setTitle(`Information`)
  .setColor(0x00AE86)
  .setFooter(`P-code`)
  .setThumbnail(bot.displayAvatarURL)
  .setTimestamp()
         .addField(`• user`,`Sends info about a user` + n + `=info user <mention> (if there is no mention, the info is about you)`)
         .addField(`• bot`,`Sends info about me` + n + `=info bot`)
         .addField(`• guild`,`Sends info about the guild (server)` + n + `=info guild`)
         .addField(`• channel`,`Sends info about the channel` + n + `=info channel`)
         .addField(`• role`,`Sends info about a role` + n + `=info role <name> (case sensitive)`)
  msg.author.send({embed});
        }
  if(args[0] === "fun"){
             msg.reply("help as been sent to your DMs!")
        const embed = new Discord.RichEmbed()
  .setTitle(`Fun`)
  .setColor(0x00AE86)
  .setFooter(`P-code`)
  .setThumbnail(bot.displayAvatarURL)
  .setTimestamp()
         .addField(`• lenny`,`Sends a random lenny face` + n + `=lenny`)
         .addField(`• meme`,`Sends a random meme` + n + `=meme`)
         .addField(`• choose`,`Chooses between 2 given options` + n + `=choose <option 1> <option 2>`)
         .addField(`• dice`,`Rolls a dice` + n + `=dice`)
         .addField(`• 8ball`,`Answers your yes/no question` + n + `=8ball <question>`)
  msg.author.send({embed});
          }}

  //Moderation cmds
if(cmd === "kick") {
  if(pcode.hasPermission('KICK_MEMBERS')){
  if(msg.member.hasPermission('KICK_MEMBERS')) {
  let target = msg.mentions.members.first();
  if(!target)
    return msg.reply("Please mention a valid member of this server!");
  if(!target.kickable)
    return msg.reply("This user has an higher role then me, so I can't kick!");
  await target.kick(`cmd has been used by ${msg.author}!`)
    msg.channel.send(`Done. Kicked ${target}!`)
    target.send(`You have been kicked from ${msg.guild.name} by ${msg.author}`)
  } else {
  msg.channel.send(`${msg.author} you don't have \`KICK_MEMBERS\` permission!`)
  }
  }else {
    msg.channel.send("I don't have ``KICK_MEMBERS`` permission!")
  }
}
if(cmd === "ban") {
  if(pcode.hasPermission('BAN_MEMBERS')){
  if(msg.member.hasPermission('BAN_MEMBERS')) {
  let member = msg.mentions.members.first();
  if(!member)
    return msg.reply("Please mention a valid member of this server!");
  if(!member.banable)
    return msg.reply("This user has an higher role then me, so I can't kick!");
  let reason = args.slice(1).join(' ');
  await member.ban(`cmd has been used by ${msg.author}!`)
    msg.channel.send(`Done. Banned ${member}!`)
    member.send(`You have been banned from ${msg.guild.name} by ${msg.author}`)
  } else {
  msg.channel.send(`${msg.author} you don't have \`BAN_MEMBERS\` permission!`)
  }
  }else {
    msg.channel.send("I don't have ``BAN_MEMBERS`` permission!")
  }
}
if(cmd === "addrole") {
  let member = msg.mentions.members.first();
  let role = msg.guild.roles.find("name", msg.content.split(" ").slice(2).join(" "));
  if (pcode.hasPermission('MANAGE_ROLES')){
  if (msg.member.hasPermission('MANAGE_ROLES')) {
      if(!member) {
        return msg.reply("Please mention a valid member of this server!");
        if(!role.addable)
          return msg.reply("I can't add this role!");
      } else
      if(role == null) {
          msg.channel.send(`${msg.author} I can't find role with that name !`)
      } else
    msg.channel.send(`Done. added **${role.name}** to ${member}!`)

  }else {
    msg.channel.send(`You don't have \`MANAGE_ROLES\` permission!`)
  }
  member.addRole(role)
} else {
 msg.channel.send("I don't have `MANAGE_ROLES` permission!") 
}
}
if(cmd === "removerole") {
  let member = msg.mentions.members.first();
  let role = msg.guild.roles.find("name", msg.content.split(" ").slice(2).join(" "));
  if (pcode.hasPermission('MANAGE_ROLES')){
  if (msg.member.hasPermission('MANAGE_ROLES')) {
      if(!member) {
        return msg.reply("Please mention a valid member of this server!");
        if(!role.removeable)
          return msg.reply("I can't remove this role!");
      } else
      if(role == null) {
          msg.channel.send(`${msg.author} I can't find role with that name !`)
      } else
    msg.channel.send(`Done. removed **${role.name}**  from ${member}!`)

  }else {
    msg.channel.send(`You don't have \`MANAGE_ROLES\` permission!`)
  }
  member.removeRole(role)
} else {
 msg.channel.send("I don't have `MANAGE_ROLES` permission!") 
}
 }
if(cmd === "setnick") {
  if(pcode.hasPermission('MANAGE_NICKNAMES')){
 if(msg.member.hasPermission('MANAGE_NICKNAMES')) {
 let member = msg.mentions.members.first();
 if(!member)
  return msg.reply("Please mention a valid member of this server!");
   let nickname = args.slice(1).join(' ');
 member.setNickname(nickname).catch(error => msg.channel.send(`Sorry I couldn't change this nickname`));
  msg.channel.send(`Done. Changed nickname!`)
 } else {
  msg.channel.send(`${msg.author} you dont have the \`MANAGE_NICKNAMES\` permission!`)
 }
} else {
  msg.channel.send("I don't have ``MANAGE_NICKNAMES`` permission!")
}
}
if(cmd === "resetnick") {
  if(pcode.hasPermission('MANAGE_NICKNAMES')){
 if (msg.member.hasPermission('ADMINISTRATOR')) {
 msg.guild.members.map(m=>{m.setNickname('');})
 msg.channel.send('Done. Reseted all nicknames in this server!')
 }else {
  msg.reply(`You are not an admin!`)
 }
} else {
  msg.channel.send("I don't have ``MANAGE_NICKNAMES`` permission!")
}
}
if(cmd === "hackban"){
  if(pcode.hasPermission('BAN_MEMBERS')){
    if (msg.member.hasPermission('BAN_MEMBERS')){
  let id = args[0]
  if(!id)
    return msg.reply("you must provide an id to ban!")
      let member = `<@${id}>`
  msg.guild.ban(id)
      msg.channel.send(`Done. hackbaned ${member} succesfully!`)
  } else {
  msg.channel.send(`${msg.author} you don't have \`BAN_MEMBERS\` permission!`)
  } 
    } else {
  msg.channel.send(`${msg.author} I don't have \`BAN_MEMBERS\` permission!`)
  } 
  }   
if(cmd === "unban") {
  if(pcode.hasPermission('BAN_MEMBERS')){
 if (msg.member.hasPermission('BAN_MEMBERS')){
 let id = args[0];
   if(!id)
     return msg.reply("You must give an id to unban!")
  msg.guild.fetchBans().then(bans => {
   var person = bans.find('id',id).id;
    msg.guild.unban(person);
     msg.channel.send(`Done. unbanned <@${id}>!`)
 });
} else {
 msg.channel.send(`${msg.author} you don't have \`BAN_MEMBERS\` permission!`)
  }
  } else {
  msg.channel.send(`${msg.author} I don't have \`BAN_MEMBERS\` permission!`)
  } 
  } 
if(cmd === "clear"){
if(pcode.hasPermission("MANAGE_MESSAGES") || pcode.hasPermission("ADMINISTRATOR")){
      if(msg.member.hasPermission("MANAGE_MESSAGES")){
        let amount = args[0]; // The first argument is the expected amount of messages to delete.
        if(!amount) return msg.reply("please provide a valid number of messages to delete!");
        //if(amount.length > 2) return msg.reply("you may only enter two characters as the amount of messages to delete, a number between 1 and 99!");
        if(isNaN(amount)) return msg.reply("the entered value is not a number!"); // Is the amount specified, not a number? Test with isNaN()!
        let amountInteger = parseInt(amount); // Parse it as an integer so we can add one to it.
        if(amountInteger < 1 || amountInteger > 99) return msg.reply("please provide a number between 1 and 99!");
        msg.channel.fetchMessages({ limit: amountInteger+1 }).then(m=>msg.channel.bulkDelete(m)); // Fetch the number of messages specified, then delete that amount of messages from the channel.
        const rep = msg.reply(`cleared **${amount} messages** successfully!`) // Tell the user that they successfully deleted the wanted messages.
        .then((themsg) => {
          const del = () => themsg.delete(); // function to delete the message
          setTimeout(del, 5000); // delete in 3 seconds
        });
      }else{
        return msg.reply("you don't have ``MANAGE_MESSAGES`` permission!");
      }
    }else{
      return msg.reply("I don't have ``MANAGE_MESSAGES`` permission!");
    }  
} // 10 commands 

  //Information cmds
if(cmd === "info"){
 if(args[0] === undefined){
  msg.channel.send("```Info cmds:" + n + "user - gives info about the user" + n +  "bot - gives info about me" + n +  "guild - gives info about the guild" + n + "channel - gives info about the channel" + n + "role - sends info about a role```")}
 if(args[0] === "user") {
  if(pcode.hasPermission('EMBED_LINKS')){
 const member = msg.mentions.members.first() || msg.member;
 const user = msg.mentions.users.first() || msg.author;
 const embed = new Discord.RichEmbed()
  .setTitle(`Information about ${user.tag}`)
  .setColor(0x00AE86)
  .setDescription(`ID: ${member.id}`)
  .setFooter(`P-code`)
  .setThumbnail(user.displayAvatarURL)
  .setTimestamp()
  .addField(`Joined discord at:`, `${user.createdAt}`)
  .addField(`Joined server at:`, `${member.joinedAt}`)
  .addField("Status:", `${member.presence.status}`, true)
  .addField(`Highest role:`, `${member.highestRole}`, true)
  msg.channel.send({embed});
} else {
  return msg.reply("I don't have ``EMBED_LINKS`` permission so i can't send this info.")
}
}
 if(args[0] === "bot") {
   if(pcode.hasPermission('EMBED_LINKS')){
  const embed = new Discord.RichEmbed()
   .setTitle(`Information about P-code`)
   .setDescription(`A multi function discord bot by discord user Potato#6163`)
   .setColor(0x00AE86)
   .setFooter(`P-code`)
   .setTimestamp()
   .addField(`When was P-code created?`, `P-code was created at: 21-01-2018.`)
   .addField(`Who is the developer?`, `P-code is created by discord user: Potato#3265.`)
   .addField(`Why was i created?`, `I wanted to make a bot that could help Discord users to improve their server(s)!`)
   .addField(`Servers:`, `${bot.guilds.size}`)
   .addField(`Ping:`, `${Math.round(bot.ping)}ms`, true)
   .addField(`Uptime:`, format(uptime), true)
   msg.channel.send({embed});
} else {
  return msg.reply("I don't have ``EMBED_LINKS`` permission so i can't send this info.")
}
}
 if(args[0] === "guild") {
   if(msg.guild.id === "396799859900022784")
     return msg.channel.send("Yzfire has disabled this cmd.")
   if(pcode.hasPermission('EMBED_LINKS')){
  let roleArr = msg.guild.roles.array().map(r=> r.name);
  const embed = new Discord.RichEmbed()
   .setTitle(`Information about ${msg.guild.name}`)
   .setColor(0x00AE86)
   .setDescription(`ID: ${msg.guild.id}`)
   .setFooter(`P-code`)
   .setThumbnail(msg.guild.iconURL)
   .setTimestamp()
   .addField(`Guild created at:`, `${msg.guild.createdAt}`)
   .addField(`Server region:`, `${msg.guild.region}`, true)
   .addField(`Owner:`, `${msg.guild.owner}`, true)
   .addField("Member count:", `${msg.guild.memberCount}`, true)
   .addField("Verification level:", `${msg.guild.verificationLevel}`, true)
   .addField(`Roles:`,`${roleArr}`)
   msg.channel.send({embed});
} else {
  return msg.reply("I don't have ``EMBED_LINKS`` permission so i can't send this info.")
}
}
 if(args[0] === "channel") {
   if(pcode.hasPermission('EMBED_LINKS')){
 const embed = new Discord.RichEmbed()
 .setTitle(`Information about ${msg.channel.name}`)
 .setColor(0x00AE86)
 .setDescription(`ID: ${msg.channel.id}`)
 .setFooter(`P-code`)
 .setThumbnail(msg.guild.iconURL)
 .setTimestamp()
 .addField(`Channel created at:`, `${msg.channel.createdAt}`)
 msg.channel.send({embed});
} else {
  return msg.reply("I don't have ``EMBED_LINKS`` permission so i can't send this info.")
}
}
 if(args[0] === "role"){
   let wantedRole = args.slice(1).join(" "); // The word role is actually args[0] so we have to slice from 1 and join them all up (e.g. ["role", "Bot", "Developer"]) - in that case we'd want to join bot and developer together with a space.
    if(!msg.guild.roles.find("name", wantedRole)) return msg.reply("I can't find a role with that name! (Did you type the name right? It is case-sensitive)");
    let roleObj = msg.guild.roles.find("name", wantedRole);
    let onsidebar;
    let isrolementionable;
    if(roleObj.hoist == "true"){
       onsidebar = "Yes";
    }
    else{
      onsidebar = "No";
    }

    if(roleObj.mentionable){
      isrolementionable = "Yes";
    }else{
      isrolementionable = "No";
    }

    const getRoleMembers = () => {
      if(roleObj.members.size < 50){
        let membArr = roleObj.members.array().map(m=>m.id);
        let mentionArr = membArr.map(memb=>`<@${memb}>`)
        let finalMentions = mentionArr.join(", ");
        return finalMentions;
      }else{
        return roleObj.members.size;
      }
    }

    if(pcode.hasPermission("EMBED_LINKS") || pcode.hasPermission("ADMINISTRATOR")){
      const embed = new Discord.RichEmbed()
        .setTitle(`Information about: ${wantedRole}`)
        .setColor(`${roleObj.hexColor}`)
        .addField("ID:", `${roleObj.id}`)
        .addField("Role created at:", `${roleObj.createdAt}`)
        .addField("Permission Number:", `${roleObj.permissions}`, true )
        .addField("Position:", `${parseInt(roleObj.position)+1}`, true )
        .addField("Colour:", `${roleObj.hexColor}`)
        .addField("Displayed seperately:", `${onsidebar}`, true )
        .addField("Mentionable:", `${isrolementionable}`, true)
        .addField("Members:", `${getRoleMembers()}`)
        .setTimestamp()
        msg.channel.send({embed});
    } else {
      msg.channel.send("I don't have ``EMBED_LINKS`` permission so i can't send this info.")
    }}}
if(cmd === 'avatar') {
   if(pcode.hasPermission('EMBED_LINKS')){
 let user = msg.mentions.users.first() || msg.author;
 const embed = new Discord.RichEmbed()
      .setTitle(`Avatar of ${user.tag}`)
      .setImage(user.displayAvatarURL)
      .setColor(654321)
      .setFooter(`P-code`)
      msg.channel.send(embed)
} else {
  return msg.reply("I don't have ``EMBED_LINKS`` permission so i can't send this avatar.")
}
}
if(cmd === "membercount" || cmd === "mbc") {
  msg.channel.send(`This server has ${msg.guild.memberCount} members!`)
}
  
  //Fun cmds  
if(cmd === "lenny") {
 var myArray = ['(づ◔ ͜ʖ◔)づ', '(⌐■_■)', '¯\_ツ_/¯','☞   ͜ʖ  ☞','ᕙ(ꖘヮꖘ)ᕗ','ʢ◉ᴥ◉ʡ','( ͡°Ĺ̯ ͡°)','☞☉﹏☉☞','(╯°□°）╯︵ ┻━┻','┬─┬ ノ( ゜-゜ノ)',];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
   msg.channel.send(rand)
}
if(cmd === "meme") {
 var myArray = ['https://i.ytimg.com/vi/d3vT7MAP5JE/hqdefault.jpg', 'http://i0.kym-cdn.com/photos/images/facebook/001/217/729/f9a.jpg', 'https://absurdintellectual.com/wp-content/uploads/2017/02/maxresdefault1.jpg', `https://www.antagonist.nl/blog/wp-content/uploads/2014/01/meme_bad_luck_wouter.jpg`, `https://www.allaboutphones.nl/wp-content/uploads/2017/08/meme.jpg`, `https://assets.vogue.com/photos/5891c91ece34fb453af7d263/master/pass/06-kendrick-llama-memes.jpg`, `https://lh3.googleusercontent.com/YN836O3aUA0_6SBU76kIyd7RT_qyg9K1ol__lll6AXOh1XIhx3akXeRbtT7qpB4g6Y0=h900`, `http://memesbams.com/wp-content/uploads/2017/09/really-most-offensive-racist-memes.jpg`, `http://s2.quickmeme.com/img/53/5331d4d700b397f643dd3d30bcd6f9276f0354f37fa3e45989bc8b8067a59a83.jpg`,];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
   msg.channel.send(rand)
}
if(cmd === "choose") {
 let option1 = args[0];
 let option2 = args[1];
  if(!option1)
    return msg.reply(`You need to give atleast 2 options to choose from!`);
    if(!option2)
    return msg.reply(`You need to give atleast 2 options to choose from!`);
   var myArray = [(option1),(option2),];
     var rand = myArray[Math.floor(Math.random() * myArray.length)];
     msg.channel.send(rand)
} // 20 commands 
if(cmd === "dice"){
  var randnumber = Math.floor(Math.random()*6) + 1;
  msg.channel.send("You rolled number: " + randnumber);
}
if(cmd === "8ball") {
   if(pcode.hasPermission('EMBED_LINKS')){
 const question = args.join(" ");
   if(question == null) {
     msg.channel.send("Ask a yes/no question!")
  } else {
 var myArray = ['Yes!', 'No.', 'Probably.', `I don't think so..`, `Most likely.`, `I don't know.`, `Most likely not.`, `Probably not.`, `Definitely!`,];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
     msg.channel.send({embed: {
         color: 123456,
         fields: [{
             name: "Question:",
             value: `:grey_question: ${question}`
           },
           {
             name: "Answer",
             value: `:8ball: ${rand}`
           }
         ],
         footer: {
         }
             }
         });
   }
} else {
  return msg.reply("I don't have ``EMBED_LINKS`` permission so i can't answer your question.")
}
}
if(cmd === "rate") {
  const rateObj = args.join(" ");
  if(!rateObj)
    return msg.reply("You must give me somthing to rate!")
 var myArray = ['1','2','4','5','6','7','8','9','10'];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
  msg.channel.send(`I rate **${rateObj}** at ${rand} out of 10!`)
}
if(cmd === "ben"){
  const ben = msg.mentions.members.first() || msg.member;
  if(!ben)
    return msg.reply("You must give me a user to ben")
  msg.channel.send(`Done. **${ben}** has been benned succesfully`)
}   

  //Contact and response
if(cmd === "contact") {
  if(msg.channel.id === "418430304437534730"){
  const mcontent = args.join(" ");
  if(!mcontent) {
  return msg.reply(`You need to ask a questions or send ideas.`)
 }else {
  bot.channels.get(`418430304437534730`).send({embed: {
      color: 333300,
      fields: [{
          name: "Contact",
          value: `**Userid:** ${msg.author.id}` + n + `**Channelid:** ${msg.channel.id}` + n + `**Guildid:** ${msg.guild.id}` + n + `**Text:** ${mcontent}`
        }
      ],
      footer: {
            }
          }
      });
  msg.channel.send(`${msg.author} you have contacted succesfully!`)
 }
} else{
  msg.reply("This command is disabled in this server. I think you know why...")}
}
if(cmd === "c-react") {
  if(msg.channel.id !== "418430304437534730") return;
  let channel = args[0];
  let answer = args.slice(1).join(' ');
  if(!channel)
    return msg.reply("You need to give me a valid channel ID to send to!")
  if(!answer)
    return msg.reply("You need to give an answer to the question!")
  bot.channels.get(`${channel}`).send(`${answer} / Answered by ${msg.author.tag}`);
  msg.channel.send(`${msg.author} replied!`)
}

  //Other cmds
if(cmd === "ping") {
  const m = await msg.channel.send("Calculating the ping...");
    m.edit(`The ping is: ${m.createdTimestamp - msg.createdTimestamp}ms`);
}
if(cmd === "uptime") {
  msg.channel.send(`I have been online for ${format(uptime)} `)
}
if(cmd === "invite") {
  msg.channel.send({embed: {
      color: 654321,
      fields: [{
          name: "Support server:",
          value: "https://discord.gg/y68DbxK"
        },
        {
          name: "Invite me to your server!",
          value: "https://discordapp.com/api/oauth2/authorize?client_id=419806744907350017&permissions=335670487&scope=bot"
        }
      ],
      footer: {
            }
          }
        });

}
  
});
 bot.login(token);
