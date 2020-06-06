require('dotenv').config()

const Discord = require('discord.js')
const Bot = new Discord.Client()

Bot.login(process.env.TOKEN)

Bot.on('ready', () => {
    console.info(`Logged in as ${Bot.user.tag}`)
})

Bot.on('message', message => {
    if (message.author.id === Bot.user.id) {
        return
    }

    if (message.content.startsWith('t help')) {
        message.reply({
            embed: {
                color: 3447003,
                title: "Commands",
                description: "Commands for the TarkovHelper",
                fields: [
                    {
                        name: "t help",
                        value: "Show the helper info"
                    },
                    {
                        name: "t map name",
                        value: "Replace 'name' with the first letter name of the map and you'll receive a link to it. I.e. 't map r' will get you a link to reserve"
                    },
                    {
                        name: "t any",
                        value: "Replace 'any' with your search criteria and I'll search the wiki for you! If I find something usefull then I'll return a link."
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© TarkovHelper"
                }
            }
        })
        return
    }

    if (message.content.startsWith('t map')) {
        const map = message.content.split(' ')[2]
        if (!map) {
            message.reply("Opps! I couldn't find that map.")
        } else {
            let link = null
            if (map.toLowerCase().startsWith('f')) {
                link = 'https://mapgenie.io/tarkov/maps/factory'
            } else if (map.toLowerCase().startsWith('w')) {
                link = 'https://mapgenie.io/tarkov/maps/woods'
            } else if (map.toLowerCase().startsWith('c')) {
                link = 'https://mapgenie.io/tarkov/maps/customs'
            } else if (map.toLowerCase().startsWith('i')) {
                link = 'https://mapgenie.io/tarkov/maps/interchange'
            } else if (map.toLowerCase().startsWith('s')) {
                link = 'https://mapgenie.io/tarkov/maps/shoreline'
            } else if (map.toLowerCase().startsWith('l')) {
                link = 'https://mapgenie.io/tarkov/maps/lab'
            } else if (map.toLowerCase().startsWith('r')) {
                link = 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/4/42/3D_Map_by_loweffortsaltbox.png?version=140ff4f03462a81dfb820dffc329ac17'
            }

            if (!link) {
                message.reply("Opps! I couldn't find that map.")
            } else {
                message.reply(`Here you go: ${link}`)
            }
        }
        return
    }

    if (message.content.startsWith('t ')) {
        const search = message.content.replace('t ', '')
        if (!search) {
            return
        }
        message.reply(`https://escapefromtarkov.gamepedia.com/index.php?search=${search}`)
    }
})
