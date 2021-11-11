const {MessageEmbed, Interaction}= require('discord.js');
const db = require('../../schema/currency-schema')

module.exports = {
    name:'balance',
    description:'balance of user',
    run: async (client, interaction , arguments) => {
        db.findOne({UserID: interaction.member.id}, async (err, data)=>{
            if(!data){
                data = new db({
                    UserID: interaction.member.id,
                    GuildID: interaction.guildid,
                    Content: [
                        {
                            Content:500
                        }
                    ],
                })
                let embed1 = new MessageEmbed()
                .setColor('#41D15C')
                .setTitle('This is you first time using this command! Welcome to the world of Nikons!')
                .setDescription(`You have 500 Nikons!`)
                interaction.followUp({embeds:[embed1]})

            } 
            data.save()
        })

        db.findOne({UserID: interaction.member.id, GuildID: interaction.guildid}, async (err, data)=>{
            if (err) throw err
            if (data){
                
                let embed2 = new MessageEmbed()
                .setColor('#41D15C')
                .setTitle('ᵔ ͜ʖ ͡ᵔ')
                .setDescription(`${data.Content.map(
                    (w) => `**Your Balance is ✧ ${w.Content}**`
                ).join(' ')}`)
                interaction.followUp({embeds:[embed2]})
            
            }
        })


    }
}