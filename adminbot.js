const Discord = require('discord.js');
const Bot = new Discord.Client();

//Channels
const WELCOME_CHANNEL = '612420155074674729';
const OUTPUT_CHANNEL = '681706008237703191';
const LOG_CHANNEL = '696080722473123980';
const BM_CHANNEL = '668164587sd1';
const CG_CHANNEL = '681706008237703191';
const HEADS_UP = '668164587014586441'
const abump = '612420993251672109'

//Groups
const WLADDER_GROUP = '612422419281477652';
const WL_GROUP = '695985223288094781';
const BOTUSE_GROUP = '683301629797072907';

//Settings
const CMD_PREFIX = '/';

const LOGIN_TOKEN = 'Njk1OTgxOTU1NTIyNzU2Njg5.XoiFvA.rHCN43AEdzN_XRmO0KsN_8CruEs';
//

Bot.on('ready', () => {
    console.log('Successfuly logged in!');
    Bot.channels.get(OUTPUT_CHANNEL).send(":green_circle: `BOT Online` It's gonna be a good, good, life... did you guys miss me? (✿◠‿◠)");


    Bot.user.setStatus('STREAMING');
    Bot.user.setPresence({
        game: {
            name: 'with his gun',
            type: 'STREAMING',
    
            
        }
    });
});

//Bot.on('guildMemberAdd', member => {
   // member.guild.channels.get(WELCOME_CHANNEL).send(`Hello~ ${member}! Welcome **${member.guild}** :tada: :hugging:!`);



         
//})

Bot.on('message', message => {
    if(IsCmd(message.content, 'help')) {
        message.reply("`BOT powered by abcd.` (andrew)\n\n**/verify** - gets someone verified.\n**/say** - Announces message\n**/restart** - restarts BOT\n**/verify <add/remove>** - Adds/removes verified role\n**/clear** - clears messages\n\nhttps://discord.gg/Hf6Xqxf");
    }
    
    if(IsCmd(message.content, 'restart')) {
        if (message.member.id != "694434121367289876" & "612071162314227722") return false;
        console.clear();
        console.log(`Restart sequence registered! Restart ordered by${message.author} uwu\nProbíhá opětovné zapnutí.`);
        Bot.destroy();
        Bot.login(LOGIN_TOKEN);
        
        Bot.channels.get(OUTPUT_CHANNEL).send(':red_circle: `BOT Offline (Restarting...)`');
        Bot.channels.get(LOG_CHANNEL).send(`LOG: BOT restarted by ${message.author}`);

        console.clear()
        console.log("Done")


}

    
    if(message.content.startsWith(MakeCmd('kick'))) {
        if(message.member.hasPermission("KICK_MEMBERS")) {
            const user = message.mentions.users.first();
            const args = message.content.slice(5).split(' ');

            if(user) {
                const member = message.guild.member(user);
                
                if(member) {
                    if(args.length <= 3) {
                        let reason = args[2];

                        if(!reason) {
                            reason = 'Ban hammer has spoken!';
                        }

                        member.kick(reason).then(() => {
                            message.reply(`**Aight!** this fella called${member} has been kicked :white_check_mark:`);

                            Bot.channels.get(LOG_CHANNEL).send(`LOG: Administrator ${message.author} kicked ${member} with reason: ${reason}`);
                        }).catch(err => {
                            message.reply(`settle down buddy.. ${member} this guy has immunity against kicks..`);
                            Bot.channels.get(LOG_CHANNEL).send(`LOG: Administrator${message.author} just tried to kick ${member} for reason ${reason} (Insufficient permission)`);

                            console.log(err);
                        });
                    } else if(args.length > 3) {
                        message.reply('**What..** and what the hell are you doing.. this is little bit too much arguments and it hurts my head `/kick <@user> <reason>`');

                        Bot.channels.get(LOG_CHANNEL).send(`LOG: ${message.author} look at this idiot :DDDD that's not right kick command usage ${MakeCmd('kick')} (${args})`);
                    }
                }
            } else {
                message.reply('Cool.. next time just tell me who am I supposed to kick `/kick <@user> <reason>`');
            }
        } else {
            message.reply('~(Insufficient permission)~ .....duh');

            Bot.channels.get(LOG_CHANNEL).send(`LOG: ${message.author} tried to use **kick** command`);
        }
    }

    if(message.content.startsWith(MakeCmd('say'))) {
        
        const args = message.content.slice(4);

        message.delete();

        if(message.channel.id == HEADS_UP) {
            
            Bot.channels.get(HEADS_UP).send(`:calling: ${args}`);
            Bot.channels.get(LOG_CHANNEL).send(`LOG: ${message.author} announced: ${args}`);
        } else {
            message.author.send(`This command can be used only in announcement channel, nice try tho.`);

            Bot.channels.get(LOG_CHANNEL).send(`LOG: This guy -> ${message.author} tried to announce something... how stupid! he didn't used this command in announcements channel. Text: ${args}`);
        }
    }

    if(message.content.startsWith(MakeCmd('verify'))) {
        

        if(message.member.roles.has(WLADDER_GROUP)) {
            const user = message.mentions.users.first();
            const args = message.content.slice(4).split(' ');

            if(message.channel.id == CG_CHANNEL) {
                if(user) {
                    const member = message.guild.member(user);

                    if(member) {
                        if(args[1] == 'add') {
                            if(!member.roles.has(WL_GROUP)) {
                                Bot.channels.get(CG_CHANNEL).send(`**Aww..!** ${member} is now verified member of the server! (added by ${message.author})`);
                                Bot.channels.get(LOG_CHANNEL).send(`LOG: ${message.author} added ${member} as verified server member!`);

                                member.addRole(WL_GROUP);
                            } else {
                                message.reply(`hey.. yeah hello this guy ${member} is already verified`);
                            }
                        } else if(args[1] == 'remove') {
                            if(member.roles.has(WL_GROUP)) {
                                Bot.channels.get(CG_CHANNEL).send(`**Ay!** ${member} been a bad boy :c role verified removed (removed by ${message.author})`);
                                Bot.channels.get(LOG_CHANNEL).send(`LOG: ${message.author} removed ${member} from verified member.`);

                                member.removeRole(WL_GROUP);
                            } else {
                                message.reply(`Alright.. you realize that ${member} isn't even verified? you are confusing me`);
                            }
                        }
                    }
                } else {
                    message.reply('You have to mention someone dummy `/verifiy <action> <@user>`');
                }
            } else {
                message.reply(`${Bot.channels.get(CG_CHANNEL)}`);
            }
        } else {
            message.reply('eh.. little worried that this command is not for you.');
        }
    }

    if(message.content.startsWith(MakeCmd('clear'))) {
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            const args = message.content.slice(7).split(' ');

            if(args.length == 1) {
                if(!isNaN(args[0])) {
                    async function clear() {
                        message.delete();

                        const fetched = await message.channel.fetchMessages({limit: args[0]});
                        message.channel.bulkDelete(fetched);
                    }
            
                    clear();

                    Bot.channels.get(LOG_CHANNEL).send(`LOG: ${message.author} removed ${args[0]} messages from ${message.channel}`);
                } else {
                    message.reply('Invalid argument dummy.');
                }
            } else {
                message.reply('Invalid argument use `/clear <number>`');
            }
        } else {
            message.reply("no no no.. you can't do that, authorities called!");

            Bot.channels.get(LOG_CHANNEL).send(`LOG: ${message.author} this guy tried to use **clear** in ${message.channel}. he is not authorized tho..`);
        }
    }
    // eastereggs
    if(message.content.includes('Safe Haven Guardian')) {
        message.reply('hi~~! did you call me, fwend?');

    }   

    if(message.content.includes('uwu')) {
        message.reply('...indeed fwend :smiling_face_with_3_hearts:');

    }


        
    
});

Bot.on("message", function(message)
    
{
if(message.member.hasPermission("KICK_MEMBERS")) {

    if(message.content.startsWith(MakeCmd('abump'))) {
        message.delete()
      message.channel.send("**Roger! Let's get this auto-bumping going!**")  

      var interval = setInterval (function ()
            {
              Bot.channels.get(abump).send("!d bump")
            }, 1200000);

      }


}});



function IsCmd(msg, prefix) {
    return msg == MakeCmd(prefix);
}

function MakeCmd(prefix) {
    return CMD_PREFIX.concat(prefix);
}

function GetRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

Bot.login(process.env.BOT_TOKEN);
