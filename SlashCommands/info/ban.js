const {MessageEmbed, Client, Interaction, LimitedCollection} = require('discord.js');
const { checkIsAdmin, checkIsSuperuser } = require('../../important/checkAdmin')
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

module.exports = { 
    name: "ban",
    description: "ban someone",
    type: 'CHAT_INPUT',
    options:[
        {
            name:'target',
            description:'target for banning',
            type: "USER",
            required: true,
        },
        {
            name:'reason',
            description:'reason to ban',
            type: "STRING",
            required: true,
        },
    ],
    run: async( message, interaction) => {
        if(await checkIsSuperuser(interaction)){

            const target = interaction.options.getMember('target')
            //const member = interaction.guild.members.cache.get(target)
            if(target.id === interaction.member.id) {
                interaction.followUp("** ͡ᵔ ͜ʖ ͡ᵔ ** You cannot ban yourself!")
            }

            if(!target.bannable){
                interaction.followUp("**︶︿︶** User cant be banned!")
            } 

            let reason = interaction.options.getString('reason')


            const kick123 = new MessageEmbed()
            .setColor('#88ca7f')
            .setTitle(" ͡ᵔ ͜ʖ ͡ᵔ ")
            .setDescription (`✅  Banned !`)

            try{
                target.ban({reason})
                interaction.followUp({ embeds: [kick123]})

            } catch(error) {
                console.log(error)
                interaction.followUp("**︶︿︶ ** I could not ban the user!")
            }
        }else {
            let failEmbed = new MessageEmbed()
            .setColor('#ff3300')
            .setTitle('︶︿︶')
            .setDescription(`❌ You are not a god! Try \`/enter\` to enter God Mode! `)
            interaction.followUp({embeds:[failEmbed]})
        }
    }

}

