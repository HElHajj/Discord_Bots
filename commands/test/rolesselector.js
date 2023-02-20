const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js")

module.exports = {
    name: "houses",
    category: "test",
    devOnly: true,
    run: async ({client, message, args}) => {
        message.channel.send({
            embeds: [
                new MessageEmbed().setTitle("Sorting Hat").setDescription("The Sorting Hat will take your choice into consideration").setColor("ORANGE")
            ],
            components: [
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId("role-956887915764514868").setStyle("SECONDARY").setLabel("Gryffindor")
                ]),
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId("role-957031080874115083").setStyle("SECONDARY").setLabel("Hufflepuff")
                ]),
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId("role-957031383216324703").setStyle("SECONDARY").setLabel("Ravenclaw")
                ]),     
                new MessageActionRow().addComponents([
                    new MessageButton().setCustomId("role-957027099816906752").setStyle("SECONDARY").setLabel("Slytherin")
                ])        
            ]
        })
    }
}