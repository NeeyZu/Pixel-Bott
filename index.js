const Discord = require('discord.js');
const { builtinModules } = require('module');
const { type } = require('os');

const client = new Discord.Client();

client.once('ready' , () => {
    console.log('Pret mon gros!');
});

client.on('ready', () => {
       client.user.setActivity(`NeeyZu`, {type: 'STREAMING', url: 'https://twitch.tv/neeyzu'} );  
})

client.on('guildMemberAdd', (member) => {
    let welcomeChannel = client.channels.cache.get('869748860233351186');
    welcomeChannel.send(`Welcome to the __Fortnite & Pixel__ ${member} ! \n \n> **Follow us on Twitter <#873265231256780891> !**`);

    member.roles.add('869748859507703853');
    member.roles.add('869748859507703858');
});

client.on('guildMemberRemove', member  => {
    let leaveChannel = client.channels.cache.get('883082105620422687');
    leaveChannel.send(`Goodbye ${member} ! `);
});

client.on('message', (msg) => {
    if (msg.content.startsWith('!dm')) {
        if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('Vous ne pouvez pas éxecuter cet commande !')

        const args = msg.content.split(" ").slice(0);
        let mp = args.join(" ")
        if (mp.length > 2000) return msg.channel.send('Écrit ton message')
        
        if (!mp) return msg.channel.send('Écrit ton message')

        let user = msg.mentions.users.first()
        if (!user) return msg.channel.send('Mentionne un utilisateur')
        user.send(mp.slice(args[0].length).trimLeft())
        msg.reply(`Le message a bien été envoyer`)
    } 
    if (msg.content === 'ntm') {
        msg.reply(`Évite les insultes !`);
    }
    if (msg.content === 'fdp') {
        msg.reply(`Évite les insultes !`);
    }
    if (msg.content === 'tg') {
        msg.reply(`Évite les insultes !`);
    }
    if (msg.content === 'ftg') {
        msg.reply(`Évite les insultes !`);
    }
});

client.on('message', (msg) => {
    if (msg.content === '!pixel') {
        msg.channel.send(`**Pour avoir accés a tous les pixel rend toi dans le salon #👉🏻・𝐑𝐚𝐧𝐤-𝐏𝐢𝐱𝐞𝐥 ou demande à un Helpeur**`);
    }
    if (msg.content === '!ntweet') {
        msg.channel.send(`**Salut NeeyZuu a posté un nouveau tweet : ** https://twitter.com/neeyzuftn `);
    }
     if (msg.content === '!gtweet') {
        msg.channel.send(`**Salut Gamepr1x a posté un nouveau tweet : ** https://twitter.com/gamepr1x `);
    } 
    if (msg.content === '!rtweet') {
        msg.channel.send(`**Salut Rawko a posté un nouveau tweet : ** https://twitter.com/rawkofn`);
    }
    if (msg.content === '!ltweet') {
        msg.channel.send(`**Salut Rawko a posté un nouveau tweet : ** https://twitter.com/luzmogww`);
    }
    if (msg.content === 'quoi') {
        msg.channel.send(`feur`);
    }
    if (msg.content === '.ajt') {
        msg.channel.send(`**Channel <#873269937915953192> updated successfully ** !\n \n__Reason__ : **Pixel Season 8**`);
    }
});

const prefix = "!"

client.on('message', async message => {
    let args = message.content.substring(prefix.length).split(" ");

     if (message.content.startsWith(`${prefix}invites`)) {
        try {
            let member = message.mentions.members.first() || message.member;
            let invites = await message.guild.fetchInvites();
            let memberInvites = invites.filter(i => i.inviter && i.inviter.id === member.user.id);

            if (memberInvites.size <= 0) {
                return message.channel.send(`${member.user.tag} na invité personne sur ${message.guild.name} !`, (member === message.author ? null : member));
            } 

            let content = memberInvites.map(i => i.code).join("\n")
            let index = 0;
            memberInvites.forEach(invite => index += invite.uses);

            console.log(index)
            let inviteEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(``)
            .addField(`Total of invites`, index.toString())
            .addField(`Follow us`, `<#873265231256780891>`)
            .setTitle(`Invites of ${member.user.tag}`)

            message.channel.send(inviteEmbed)
        } catch (e) {
            return console.log(e)
        }
    }
});

client.on("message", message => {
    if(message.member.permissions.has("ADMINISTRATOR")){
        if(message.content.startsWith("clear")){
            let args = message.content.split(" ");

            if(args[1] == undefined){
                message.reply("Nombre de messages non ou mal défini!")
            }
            else {
                let number = parseInt(args[1]);

                if(isNaN(number)){
                    message.reply("Nombre de messages non ou mal défini!")
                }
                else {
                    message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppresion de " + messages.size + " messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }
});

client.login(process.env.TOKEN);
