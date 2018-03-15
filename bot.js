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


// Main variables at the top of the program.
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "=";
const token = process.env.TOKEN


client.on("ready", () => {
client.user.setActivity("Do =help, or =contact!", {type: "streaming", url: "https://www.twitch.tv"});
  const servers = []
  client.guilds.forEach(g => {
      servers.push(`${g.id}|${g.memberCount}|${g.name}`)

  })
  console.log(servers.join("\n"))
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
});

process.on("unhandledRejection", err => console.error(err.stack || err))

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.channels.get(`412973894912180235`).send(`I have been added to: ${guild.name} (id: ${guild.id})`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.channels.get(`412973894912180235`).send(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on("message", async message => {
  if(message.channel.type === `dm`|| message.channel.type === `group` || message.content.indexOf(prefix) !== 0 || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const ownerID = "310853886191599616";
  const adminID = "310661460869120001"
  
  
function format(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  return (hours) + ' hours and ' + (minutes) + ' minutes and ' + (seconds) + ' seconds';
}

//NOTE Variables---------------------------|
var uptime = process.uptime();
var n = "\n";

//NOTE Devban and Devkick
if(command === "devkick") {
  if(message.author.id === ownerID) {
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Please mention a valid member of this server!");
  if(!member.kickable)
    return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
  let reason = args.slice(1).join(' ');
  if(!reason)
    return message.reply("Please indicate a reason for the kick!");
  await member.kick(`This command has been use by Potato#6163. This is a developer command and can only be used by my developer!`)
    .catch(error => message.reply(`Sorry ${message.author}, I couldn't kick because of: ${error}`));
    message.channel.send(`Done.`)
  } else
  {
  //doesn't have perm
  }
}

if(command === "devban") {
  if(message.author.id === ownerID) {
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Please mention a valid member of this server!");
  if(!member.banable)
    return message.reply("I cannot ban this user! Do they have a higher role? Do I have kick permissions?");
  let reason = args.slice(1).join(' ');
  if(!reason)
    return message.reply("Please indicate a reason for the ban!");
  await member.ban(`This command has been use by Potato#6163. This is a developer command and can only be used by my developer!`)
    .catch(error => message.reply(`Sorry ${message.author}, I couldn't ban because of: ${error}`));
    message.channel.send(`Done.`)
  } else
  {
  //doesn't have perm
  }
}

//NOTE Cacti Fin Official Server commands--|
if(command === "verify") {
    let member = message.mentions.members.first();
    let role = message.guild.roles.find("name", "Verified");
    if (message.guild.id === '268057885487923202') {
    if (message.member.hasPermission('BAN_MEMBERS')){
        if(!member) {
          return message.reply("Please mention a valid member of this server");
        } else
        if(role == null) {
            message.channel.send(`${message.author} there is no role called "Verified"`)
        } else
      message.channel.send(`${message.author} added ${role} to ${member}!`)
    }else {
      message.channel.send(`${message.author} you don't have \`BAN_MEMBERS\` permission!`)
    }
    member.addRole(role)
  } else
  message.channel.send(`This command can't be used in this server!`)
}

//NOTE Moderation commands-----------------|
if(command === "kick") {
  if (message.member.hasPermission('KICK_MEMBERS')) {
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Please mention a valid member of this server!");
  if(!member.kickable)
    return message.reply("I can't kick this user! Do they have a higher role? Do I have kick permissions?");
  let reason = args.slice(1).join(' ');
  await member.kick(`Command has been used by ${message.author}!`)
    .catch(error => message.reply(`Sorry ${message.author}, I couldn't kick because of: ${error}`));
    message.channel.send(`Done. Kicked ${member}!`)
  } else
  message.channel.send(`${message.author} you don't have \`KICK_MEMBERS\` permission!`)
  {
  //doesn't have perm
  }
}

if(command === "ban") {
  if (message.member.hasPermission('BAN_MEMBERS')){
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Please mention a valid member of this server");
  if(!member.bannable)
    return message.reply("I can't ban this user! Do they have a higher role? Do I have ban permissions?");
  let reason = args.slice(1).join(' ');
  await member.ban(`Command has been used by ${message.author}!`)
    .catch(error => message.reply(`Sorry ${message.author}, I couldn't ban because of : ${error}`));
    message.channel.send(`Done. Banned {member}!`)
  } else
  message.channel.send(`${message.author} you don't have \`BAN_MEMBERS\` permission!`)
  {
 //doesn't have perm
 }
}

if(command === "addrole") {
  let member = message.mentions.members.first();
  let role = message.guild.roles.find("name", message.content.split(" ").slice(2).join(" "));
  if (message.member.hasPermission('MANAGE_ROLES')) {
      if(!member) {
        return message.reply("Please mention a valid member of this server");
        if(!role.addable)
          return message.reply("I can't add this role.");
      } else
      if(role == null) {
          message.channel.send(`${message.author} I can't find role with that name !`)
      } else
    message.channel.send(`Done. added ${role} to ${member}!`)

  }else {
    message.channel.send(`You don't have \`MANAGE_ROLES\` permission!`)
  }
  member.addRole(role)
 }

if(command === "removerole") {
  let member = message.mentions.members.first();
  let role = message.guild.roles.find("name", message.content.split(" ").slice(2).join(" "));
  if (message.member.hasPermission('MANAGE_ROLES')) {
      if(!member) {
        return message.reply("Please mention a valid member of this server");
        if(!role.addable)
          return message.reply("I can't add this role.");
      } else
      if(role == null) {
          message.channel.send(`${message.author} I can't find role with that name !`)
      } else
    message.channel.send(`Done. removed ${role} from ${member}!`)

  }else {
    message.channel.send(`${message.author} you don't have \`MANAGE_ROLES\` permission!`)
  }
  member.removeRole(role)
}

if(command === "setnick") {
 if (message.member.hasPermission('MANAGE_NICKNAMES')) {
 let member = message.mentions.members.first();
 if(!member)
  return message.reply("Please mention a valid member of this server!");
  let nickname = args.slice(1).join(' ');
 member.setNickname(nickname)
  .catch(console.error);
  message.channel.send(`Done. Changed ${member}'s nickname to: **${nickname}**!`)
 } else {
  message.channel.send(`${message.author} you dont have the \`MANAGE_NICKNAMES\` permission!`)
 }
}

if(command === "resetnick") {
 if (message.member.hasPermission('ADMINISTRATOR')) {
 message.guild.members.map(m=>{m.setNickname('');})
 message.channel.send('Done. Reseted all nicknames in this server!')
 }else {
  message.reply(`You are not an admin!`)
 }
}

//NOTE Info commands ----------------------|
if(command === "user") {
 const member = message.mentions.members.first() || message.member;
 const user = message.mentions.users.first() || message.author;
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
  message.channel.send({embed});
}

if(command === "ibot") {
  const embed = new Discord.RichEmbed()
   .setTitle(`Information about P-code`)
   .setDescription(`A multi function discord bot by discord user Potato#6163`)
   .setColor(0x00AE86)
   .setFooter(`P-code`)
   .setTimestamp()
   .addField(`When was P-code created?`, `P-code was created at: 21-01-2018.`)
   .addField(`Who is the developer?`, `P-code is created by discord user: Potato#3265.`)
   .addField(`Why was i created?`, `I wanted to make a bot that could help Discord users to improve their server(s)!`)
   .addField(`Servers:`, `${client.guilds.size}`)
   .addField(`Ping:`, `${Math.round(client.ping)}ms`, true)
   .addField(`Uptime:`, format(uptime), true)
   message.channel.send({embed});
}

if(command === "guild") {
  const embed = new Discord.RichEmbed()
   .setTitle(`Information about ${message.guild.name}`)
   .setColor(0x00AE86)
   .setDescription(`ID: ${message.guild.id}`)
   .setFooter(`P-code`)
   .setThumbnail(message.guild.iconURL)
   .setTimestamp()
   .addField(`Guild created at:`, `${message.guild.createdAt}`)
   .addField(`Server region:`, `${message.guild.region}`, true)
   .addField(`Owner:`, `${message.guild.owner}`, true)
   .addField("Member count:", `${message.guild.memberCount}`, true)
   .addField("Verification level:", `${message.guild.verificationLevel}`, true)
   message.channel.send({embed});
}

if(command === "channel") {
 const embed = new Discord.RichEmbed()
 .setTitle(`Information about ${message.channel.name}`)
 .setColor(0x00AE86)
 .setDescription(`ID: ${message.channel.id}`)
 .setFooter(`P-code`)
 .setThumbnail(message.guild.iconURL)
 .setTimestamp()
 .addField(`Channel created at:`, `${message.channel.createdAt}`)
 message.channel.send({embed});
}

if(command === 'avatar') {
 let user = message.mentions.users.first() || message.author;
 const embed = new Discord.RichEmbed()
      .setTitle(`Avatar of ${user.tag}`)
      .setImage(user.displayAvatarURL)
      .setColor(654321)
      .setFooter(`P-code`)
      message.channel.send(embed)
}

 //NOTE Fun commands -----------------------|
if(command === "lenny") {
 var myArray = ['(づ◔ ͜ʖ◔)づ', '(⌐■_■)', '¯\_ツ_/¯','☞   ͜ʖ  ☞','ᕙ(ꖘヮꖘ)ᕗ','ʢ◉ᴥ◉ʡ','( ͡°Ĺ̯ ͡°)','☞☉﹏☉☞','(╯°□°）╯︵ ┻━┻','┬─┬ ノ( ゜-゜ノ)',];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
   message.channel.send(rand)
}

if(command === "meme") {
 var myArray = ['https://i.ytimg.com/vi/d3vT7MAP5JE/hqdefault.jpg', 'http://i0.kym-cdn.com/photos/images/facebook/001/217/729/f9a.jpg', 'https://absurdintellectual.com/wp-content/uploads/2017/02/maxresdefault1.jpg', `https://www.antagonist.nl/blog/wp-content/uploads/2014/01/meme_bad_luck_wouter.jpg`, `https://www.allaboutphones.nl/wp-content/uploads/2017/08/meme.jpg`, `https://assets.vogue.com/photos/5891c91ece34fb453af7d263/master/pass/06-kendrick-llama-memes.jpg`, `https://lh3.googleusercontent.com/YN836O3aUA0_6SBU76kIyd7RT_qyg9K1ol__lll6AXOh1XIhx3akXeRbtT7qpB4g6Y0=h900`, `http://memesbams.com/wp-content/uploads/2017/09/really-most-offensive-racist-memes.jpg`, `http://s2.quickmeme.com/img/53/5331d4d700b397f643dd3d30bcd6f9276f0354f37fa3e45989bc8b8067a59a83.jpg`,];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
   message.channel.send(rand)
}

if(command === "choose") {
 let option1 = args[0];
 let option2 = args[1];
   var myArray = [(option1),(option2),];
     var rand = myArray[Math.floor(Math.random() * myArray.length)];
     message.channel.send(rand)
}

if(command === "dice"){
  var randnumber = Math.floor(Math.random()*6) + 1;
  message.channel.send("You rolled number: " + randnumber);
}

if(command === "8ball") {
 const question = args.join(" ");
   if(question == null) {
     message.channel.send("Ask a yes/no question!")
  } else {
 var myArray = ['Yes!', 'No.', 'Probably.', `I don't think so..`, `Most likely.`, `I don't know.`, `Most likely not.`, `Probably not.`, `Definitely!`,];
   var rand = myArray[Math.floor(Math.random() * myArray.length)];
     message.channel.send({embed: {
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
}

//NOTE Owner commands ---------------------|
if(command === "shutdown") {
  if(message.author.id === ownerID) {
  message.channel.send("Shutting down...").then(message => process.exit(1));
 } else {
 message.channel.send("You are not allowed to use this command!")
 }
}

if(command === "eval") {
     if(message.author.id !== ownerID) return;
       try {
           var eturn = eval(message.content.slice(5).trim());
       }
       catch (e) {
           eturn = e;
       }
       message.channel.send({
           embed: {
               fields: [
                   {
                       name: 'Input',
                       value: '```'+message.content.slice(5).trim()+'```'
                   },
                   {
                       name: 'Output',
                       value: '```'+eturn+'```'
                   }
               ]
           }
       });
 }

if(command === "say") {
  if(message.author.id !== ownerID) return;
    const sayMessage = args.join(" ");
      message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
}

if(command === "servers") {
  if(message.author.id !== ownerID) return;
    const servers = []
        client.guilds.forEach(g => {
          servers.push(`${g.id} | ${g.memberCount} | ${g.name}`)
        })
                  message.channel.send('```'+servers.join("\n") +'```')
}

if(command === "guilds") {
  if(message.author.id !== ownerID) return;
  message.channel.send({embed: {
      color: 654321,
      fields: [{
          name: "Guild amount:",
          value: `${client.guilds.size} Guilds`
        },
        {
          name: "Channel amount:",
          value: `${client.channels.size} Channels`
        },
        {
          name: "User amount:",
          value: `${client.users.size} Users`
        }
      ],
      footer: {
            }
          }
        });

}

if(command === "leave") {
  if(message.author.id !== ownerID) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const command = args.shift().toLowerCase();
        let id = args[0];
          client.guilds.get(id).leave()
            message.channel.send("Left server!")
};

if(command === "status"){
  if(message.author.id !== ownerID) return;
  client.user.setActivity("Do =help, or =contact!", {type: "streaming", url: "https://www.twitch.tv"});
  message.channel.send("Refreshed status!")
}

if(command === "talk") {
  if(message.author.id === ownerID) {
  let channel = args[0];
  let answer = message.content.slice(24).trim();
  client.channels.get(`${channel}`).send(`${answer}`);
  message.channel.send(`${message.author} talked in the channel!`)
 }
}

//NOTE Help command -----------------------|
if(command === "help") {
    message.channel.send(`Help sent to your dm's! ${message.author}`)
    message.author.send({embed: {
    "title": `All help for ${message.author.tag}`,
    "color": 654321,
    "footer": {
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/attachments/334661068926353408/419860531986300928/P-Code_bot_logo.png"
    },
    "image": {},
    "author": {
    },
    "fields": [
      {
        "name": "**Moderation**",
        "value": "**kick** - kicks a member from the server" + n + "**ban** - bans a member from the server" + n + "**addrole** - add's a role to a user" + n + "**removerole** - removes a role from a user" + n + "**setnick** change the nickname of a user, leave empty to reset it" + n + "**resetnick** resets all nicknames of everyone in the server"
      },
      {
        "name": "**Fun**",
        "value": "**lenny** - sends a random funny face in chat" + n + "**meme** - sends a random meme in chat" + n + "**choose** - chooses between 2 given options" + n + "**dice** - sends a random number between 1 - 6"
        },
        {
        "name": "**Information**",
        "value": "**user** - gives info about a user" + n + "**ibot** - gives info about the bot" + n + "**guild** - gives info about the server/guild" + n + "**channel** - gives info about the channel" + n + "**avater** - shows the avatar of a user" + n + " -> =avatar for your avatar"  + n + " -> =avatar @potato#3265 for potato's avatar"
      },
      {
        "name": "**Other**",
        "value": "**ping** - shows the bot respons time" + n + "**uptime** - shows the bot uptime" + n + "**help** - sends this message" + n + "**invite** - sends a link to invite the bot",
      },
      {
        "name": "**More**",
        "value": "If you need help with someting, or you have an idea for the bot. Do \`=contact <question>\` and the bot developer will react as soon as possible!",
      }
    ]
  }
  });
}

//NOTE Contact commands -------------------|
if(command === "contact") {
  const mcontent = args.join(" ");
  if(!mcontent) {
  return message.reply(`You need to ask a questions or send idea's. Not an empty message.`)
 }else {
  client.channels.get(`418430304437534730`).send({embed: {
      color: 333300,
      fields: [{
          name: "Contact",
          value: `**Userid:** ${message.author.id}` + n + `**Channelid:** ${message.channel.id}` + n + `**Guildid:** ${message.guild.id}` + n + `**Text:** ${mcontent}`
        }
      ],
      footer: {
            }
          }
      });
  message.channel.send(`${message.author} you have contacted succesfully!`)
 }
}

if(command === "c-react") {
  if(message.author.id === ownerID) {
  let channel = args[0];
  let answer = args.slice(1).join(' ');
  client.channels.get(`${channel}`).send(`${answer} / Answered by ${message.author.tag}`);
  message.channel.send(`${message.author} replied!`)
 }
}

if(command === "co-react") {
  if(message.author.id === adminID) {
  let channel = args[0];
  let answer = args.slice(1).join(' ');
  client.channels.get(`${channel}`).send(`${answer} / Answered by ${message.author.tag}`);
  message.channel.send(`${message.author} replied!`)
 }
}

if(command === "restart") {
  if(message.author.id === ownerID) {
  message.channel.send("Restarting...").then(message => process.exit(1));
 } else {
 message.channel.send("You are not allowed to use this command!")
 }
}

//NOTE Other commands----------------------|
if(command === "ping") {
  const m = await message.channel.send("Calculating the ping...");
    m.edit(`The ping is: ${m.createdTimestamp - message.createdTimestamp}ms`);
}

if(command === "uptime") {
  message.channel.send(`I have been online for ${format(uptime)} `)
}

if(command === "invite") {
  message.channel.send({embed: {
      color: 654321,
      fields: [{
          name: "Support server:",
          value: "https://discord.gg/VgnzxpC" + n + "https://discordapp.com/invite/VgnzxpC"
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

//NOTE CXCC things-------------------------|


});
 client.login(token);
