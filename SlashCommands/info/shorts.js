const {MessageEmbed, Interaction}= require('discord.js');
const db = require('../../schema/short-schema')

module.exports = {
    name:'shorts',
    description:'shortcut system',
    options: [
        {
            name:'create',
            description:'adds a new shortcut',
            type: "SUB_COMMAND",
            options :[
                {
                    name:'name',
                    description:'Name of short',
                    type: "STRING",
                    required: true,
                },
                {
                    name:'data',
                    description:'data of short',
                    type: "STRING",
                    required: true,
                },
            ]
        },
        {
            name:'use',
            description:'use a  shortcut',
            type: "SUB_COMMAND",
            options :[
                {
                    name:'name',
                    description:'Name of short',
                    type: "STRING",
                    required: true,
                },

            ]
            
        },
        {
            name:'remove',
            description:'remove a short',
            type:'SUB_COMMAND',
            options:[
                {
                    name:'shortid',
                    description:'id of short',
                    type: 'NUMBER',
                    required:'true'
                }

            ]
        },
        {
            name:'check',
            description:'check shorts',
            type:'SUB_COMMAND',
        }


    ],

    run: async (client, interaction , arguments) => {

        const Sub = interaction.options.getSubcommand(["create, use, remove, check"])
        const shortName = interaction.options.getString('name')
        const shortData = interaction.options.getString('data')
        const shortID = interaction.options.getNumber('shortid')

        if(Sub=== "create"){
            db.findOne({GuildID: interaction.guildid, Name:shortName}, async (err, data)=>{
                if (err) throw err
                if (data){
                    let embed3 = new MessageEmbed()
                    .setColor('#ff8070')
                    .setTitle('ಠ_ಠ')
                    .setDescription(`❌ \`${shortName}\` Has been already used as a short name!!`)
                    interaction.followUp({embeds:[embed3]})
                }
                else {
                    data = new db({
                        GuildID: interaction.guildid, 
                        Name:shortName,
                        Content: [
                            {
                                Content: shortData,
                            }
                        ],
                    
                    })
                    let embed1 = new MessageEmbed()
                    .setColor('#41D15C')
                    .setTitle('◕‿◕')
                    .setDescription(`✅ New Short created with the name of \`${shortName}\` and with the data of \`${shortData}\``)
                    interaction.followUp({embeds:[embed1]})
                }
                data.save()
                

            })
            
        }else if (Sub === 'use'){
            db.findOne({GuildID: interaction.guildid, Name:shortName}, async (err, data)=>{
                if (err) throw err
                if(!data){
                    let embed1 = new MessageEmbed()
                    .setColor('#ff8070')
                    .setTitle('ಠ_ಠ')
                    .setDescription(`❌ No short with the name of \`${shortName}\`!`)
                    interaction.followUp({embeds:[embed1]})

                } else if (data){
                    let embed2 = new MessageEmbed()
                    .setColor('#41D15C')
                    .setTitle('ᵔ ͜ʖ ͡ᵔ')
                    .setDescription(`${data.Content.map(
                        (w) => `\n \n ${w.Content}`
                    ).join(' ')}`)
                    interaction.followUp({embeds:[embed2]})

                }
            })
        }else if (Sub === 'remove'){
            db.findOne({GuildID: interaction.guildid}, async (err, data) => {
                if (err) throw err
                if(data){
                    data.Content.splice(shortID, 1)
                    let embed4 = new MessageEmbed()
                    .setColor('#41D15C')
                    .setTitle('ᵔ ͜ʖ ͡ᵔ')
                    .setDescription(`ID:${shortID + 1} has been removed!`)

                    interaction.followUp({embeds:[embed4]})
                    data.save()
                } else {
                    let embed5 = new MessageEmbed()
                    .setColor('#41D15C')
                    .setTitle('ᵔ ͜ʖ ͡ᵔ')
                    .setDescription(`This server has no shorts!`)
                    interaction.followUp({embeds:[embed5]})
                }
            })
        }else if (Sub === 'check'){
            db.findOne({GuildID: interaction.guildid}, async (err, data) => {
                if (err) throw err
                if(data){
                    let embed2 = new MessageEmbed()
                    .setColor('#41D15C')
                    .setTitle('ᵔ ͜ʖ ͡ᵔ')
                    .setDescription(`${data.Content.map(
                        (w, i) => `\nID : ${i + 1}\n Name:${Name}`
                    ).join(' ')}`)
                    interaction.followUp({embeds:[embed2]})
                        

                } else {
                    let embed3 = new MessageEmbed()
                    .setColor('#41D15C')
                    .setTitle('ᵔ ͜ʖ ͡ᵔ')
                    .setDescription(`Server has 0 shorts!`)
                    interaction.followUp({embeds:[embed3]})
                }
            })
        }
    
    }
}
