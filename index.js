const Discord = require("discord.js")
require("dotenv").config()

const generateImage = require("./generateImage")
const slashcommands = require("./handlers/slashcommands")

const client = new Discord.Client ({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "",
    owners: ["950498116723953775"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()
client.buttons = new Discord.Collection()

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadButtons = (bot, reload) => require("./handlers/buttons")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)
client.loadButtons(bot, false)

module.exports = bot

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return
    if (!interaction.isGuild()) return interaction.reply("This command can only be used in a server")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return interaction.reply("Invalid slash command")

    if (slashcmd.perms && !interaction.member.permissions.has(slashcommand.perm))
        return interaction.reply("You do not have permission for this command")

    slashcmd.run(client, interaction)
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if (message.content == "Revelio"){
        message.reply("I should have known that you would be here...! you can use the `Lumos` spell to find out about new events, to discover you hogwarts house just make the wizarding test https://www.wizardingworld.com/ and then type `Houses`")
    }
})

const welcomeChannelId = "955134157560877068"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> We are pleased to inform you that you have been accepted at Hogwarts School of Witchcraft and Wizardry...! Please feel free to navigate throw the Announcement Channel to know better about server rules, if you need any info just cast the spell "Revelio".`,
        files: [img]
    })
})

client.login(process.env.TOKEN)