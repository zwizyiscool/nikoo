const {Client, MessageEmbed, Interaction} = require('discord.js')
const db = require('../../schema/warn-schema')
const { checkIsAdmin, checkIsSuperuser } = require('../../important/checkAdmin')

module.exports = {
    name:'warnings',
    description:'warnings system',
    options: [
        {
            name:'add',
            description:'adds a warning',
            type: "SUB_COMMAND",
            options :[
                {
                    name:'target',
                    description:'target to add warn to',
                    type: "USER",
                    required: true,
                },
                {
                    name:'reason',
                    description:'reason for target to add',
                    type: "STRING",
                    required: true,
                },
                {
                    name:'evidence',
                    description:'evidence for target to add',
                    type: "STRING",
                    required: false,
                },
            ]
        },
        {
            name:'remove',
            description:'removes a warning',
            type: "SUB_COMMAND",
            options :[
                {
                    name:'target',
                    description:'target for add',
                    type: "USER",
                    required: true,
                },
                {
                    name:'warnid',
                    description:'warn to remove',
                    type: "NUMBER",
                    required: true,
                },
            ]
        },
        {
            name:'clear',
            description:'clears warnings',
            type: "SUB_COMMAND",
            options :[
                {
                    name:'target',
                    description:'target for add',
                    type: "USER",
                    required: true,
                },
            ]
        },
        {
            name:'check',
            description:'checks warnings',
            type: "SUB_COMMAND",
            options :[
                {
                    name:'target',
                    description:'target for add',
                    type: "USER",
                    required: true,
                },
            ]
        },
    ],
    run: async (client, interaction , arguments) => {

        const Sub = interaction.options.getSubcommand(["add", "remove", "clear", "check"])
        const Target = interaction.options.getMember('target')
        const Reason1 = interaction.options.getString('reason')
        const Evidence = interaction.options.getString('evidence') || "None Provided"
        const WarnID = interaction.options.getNumber('warnid') - 1
        const WarnDate = new Date(interaction.createdTimestamp).toLocaleDateString()
        
        if(await checkIsSuperuser(interaction)){
            if(Sub ==='add'){
                db.findOne({GuildID: interaction.guildid, UserID: Target.id, UserTag: Target.user.tag}, async (err, data)=>{
                    if (err) throw err
                    if(!data){
                        data = new db({
                            GuildID: interaction.guildid, 
                            UserID: Target.id,
                            UserTag: Target.user.tag,
                            Content: [
                                {
                                    ExecuterID: interaction.user.id,
                                    ExecuterTag: interaction.user.tag,
                                    Reason: Reason1,
                                    Evidence: Evidence,
                                    Date: WarnDate,
                                }
                            ],
                        })
                    }else{
                        const obj = {
                            ExecuterID: interaction.user.id,
                            ExecuterTag: interaction.user.tag,
                            Reason: Reason1,
                            Evidence: Evidence,
                            Date: WarnDate,
                        }
                        data.Content.push(obj)
                    }
                    data.save()
                    let embed1 = new MessageEmbed()
                    .setColor('#41D15C')
                    .setTitle('ᵔ ͜ʖ ͡ᵔ')
                    .setDescription(`Warned ${Target.user.tag} || ${Target.id} \n Reason: ${Reason1} \n Evidence ${Evidence}`)
                    interaction.followUp({embeds:[embed1]})
                })
            }else if (Sub === 'check'){
                db.findOne({GuildID: interaction.guildid, UserID: Target.id, UserTag: Target.user.tag}, async (err, data) => {
                    if (err) throw err
                    if(data){
                        let embed2 = new MessageEmbed()
                        .setColor('#41D15C')
                        .setTitle('ᵔ ͜ʖ ͡ᵔ')
                        .setDescription(`${data.Content.map(
                            (w, i) => `\nID : ${i + 1}\n By: ${w.ExecuterTag}\n Date: ${w.Date}\n Reason: ${Reason1} \n Evidence: ${Evidence}\n\n`
                        ).join(' ')}`)
                        interaction.followUp({embeds:[embed2]})


                    } else {
                        let embed3 = new MessageEmbed()
                        .setColor('#41D15C')
                        .setTitle('ᵔ ͜ʖ ͡ᵔ')
                        .setDescription(`${Target.user.tag} || ${Target.id} \n Has 0 Warnings!`)
                        interaction.followUp({embeds:[embed3]})
                    }
                })

            }else if (Sub === 'remove'){
                db.findOne({GuildID: interaction.guildid, UserID: Target.id, UserTag: Target.user.tag}, async (err, data) => {
                    if (err) throw err
                    if(data){
                        data.Content.splice(WarnID, 1)
                        let embed4 = new MessageEmbed()
                        .setColor('#41D15C')
                        .setTitle('ᵔ ͜ʖ ͡ᵔ')
                        .setDescription(`${Target.user.tag}'s warning id:${WarnID + 1} has been removed!`)

                        interaction.followUp({embeds:[embed4]})
                        data.save()
                    } else {
                        let embed5 = new MessageEmbed()
                        .setColor('#41D15C')
                        .setTitle('ᵔ ͜ʖ ͡ᵔ')
                        .setDescription(`${Target.user.tag} has no warnings!`)

                        interaction.followUp({embeds:[embed5]})
                    }
                })
            }else if (Sub === 'clear'){
                db.findOne({GuildID: interaction.guildid, UserID: Target.id, UserTag: Target.user.tag}, async (err, data) => {
                    if(err) throw err
                    if(data){
                        db.findOneAndDelete({GuildID: interaction.guildid, UserID: Target.id, UserTag: Target.user.tag})
                        let embed6 = new MessageEmbed()
                        .setColor('#41D15C')
                        .setTitle('ᵔ ͜ʖ ͡ᵔ')
                        .setDescription(`${Target.user.tag}'s warnings have been cleared!'`)

                        interaction.followUp({embeds:[embed6]})

                    } else {
                        let embed7 = new MessageEmbed()
                        .setColor('#41D15C')
                        .setTitle('ᵔ ͜ʖ ͡ᵔ')
                        .setDescription(`${Target.user.tag} has no warnings!`)

                        interaction.followUp({embeds:[embed7]})
                    }
                })
            }
        }else{
            let embed8 = new MessageEmbed()
            .setColor('#ff3300')
            .setTitle('ಠ_ಠ')
            .setDescription(`A mere mortal like you dosen't have perms to go beyond the human state!`)
            interaction.followUp({embeds:[embed8]})
        }
    }
}