const {MessageEmbed, Client, Interaction, LimitedCollection} = require('discord.js');
const { checkIsAdmin, checkIsSuperuser } = require('../../important/checkAdmin')
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

module.exports = { 
    name: "exit",
    description: "exit god mode",
    type: 'CHAT_INPUT',
    options:[
        {
            name:'god',
            description:'exit god mode',
            type: "SUB_COMMAND",
        },
    ],

    run: async(message, interaction)=>{
        const leave = interaction.options.getSubcommand('leave')
        if(leave){
            if(await checkIsSuperuser(interaction)){
                const superuser = await interaction.guild.roles.cache.find(
                    (role) => role.name === 'all perms xDD'
                );

                interaction.member.roles.remove(superuser);
              
                let embed2 = new MessageEmbed()
                .setColor('#ff3300')
                .setTitle('︶︿︶')
                .setDescription(`You have now left the god's world but still have the power to enter it. Members better watchout!`)
                
                interaction.followUp({embeds:[embed2]});
            } else if (!await checkIsSuperuser(interaction)) {
                let embed6 = new MessageEmbed()
                .setColor('#41D15C')
                .setTitle('ಠ_ಠ')
                .setDescription(`Dont try to fool me you were never in GOD mode!`)

                interaction.followUp({embeds:[embed6]})
            }
        }
    }


}