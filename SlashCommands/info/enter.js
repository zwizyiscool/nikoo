const {MessageEmbed, Client, Interaction, LimitedCollection} = require('discord.js');
const { checkIsAdmin, checkIsSuperuser } = require('../../important/checkAdmin')
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })


module.exports = { 
    name: "enter",
    description: "enter god mode",
    type: 'CHAT_INPUT',
    options:[
        {
            name:'god',
            description:'enter god mode',
            type: "SUB_COMMAND",
        },
    ],

    run: async(message, interaction)=>{

        const enter = interaction.options.getSubcommand('enter')
        if(enter){
            if(await checkIsAdmin(interaction)){
                const superuser = await interaction.guild.roles.cache.find(
                    (role) => role.name === 'all perms xDD'
                );
                if(!await checkIsSuperuser(interaction)){

                    interaction.member.roles.add(superuser);

                    let embed1 = new MessageEmbed()
                    .setColor('#41D15C')
                    .setTitle('ᵔ ͜ʖ ͡ᵔ')
                    .setDescription(`You have now entered the god's world! Be careful members! `)

                    interaction.followUp({embeds:[embed1]})
                } else if (await checkIsSuperuser(interaction)) {
                    let embed3 = new MessageEmbed()
                    .setColor('#ff3300')
                    .setTitle('ಠ_ಠ')
                    .setDescription(`Dont try to fool me you are already in GOD mode!`)

                    interaction.followUp({embeds:[embed3]})
                }
            } else if (!await checkIsAdmin(interaction)) {
                let embed4 = new MessageEmbed()
                .setColor('#ff3300')
                .setTitle('ಠ_ಠ')
                .setDescription(`A mere mortal like you dosen't have perms to go beyond the human state!`)
                interaction.followUp({embeds:[embed4]})
            }

        }

    }


}