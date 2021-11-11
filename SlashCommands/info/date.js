const {MessageEmbed, Interaction}= require('discord.js');
const db = require('../../schema/date-schema')

module.exports = {
    name:'dates',
    description:'date system',
    options:[
        {
            name:'set',
            description:'set a new date',
            type:'SUB_COMMAND',
            options:[
                {
                    name:'name',
                    description:'Name of date',
                    type: "STRING",
                    required: true,
                },
                {
                    name:'day',
                    description:'day of trigger',
                    type: "NUMBER",
                    required: true,
                },
                {
                    name:'month',
                    description:'month of trigger',
                    type: "NUMBER",
                    required: true,
                },
                
            ],

        }
    ],
    run: async(message, interaction, arguments) => {
        const Sub = interaction.options.getSubcommand(["set"])
        const dateName = interaction.options.getString('name')
        const dateDay = interaction.options.getNumber('day')
        const dateMonth = interaction.options.getNumber('month')
       
        if(Sub === 'set'){
            db.findOne({Day:dateDay, Name:dateName, Month:dateMonth, UserID:interaction.member.id}, async (err, data)=>{
                if(err) throw err
                if (!data){

                    if(isNaN(dateDay) || isNaN(dateMonth)) interaction.followUp('Invalid Date!')
                    if(dateDay > 31) interaction.followUp('Invalid Day!')
                    if(dateMonth > 12) interaction.followUp('Invalid Month!')
                    const date = new Date()
                    const GuildID = interaction.guildid
                    const today = date.getDay()
                    const month = date.getMonth()
                    const realMonth = month + 1
                    const Name = dateName

                    if(dateDay == today){
                        interaction.followUp(' ಠ_ಠ Dont try to break me you mere mortal! You cannot set the day which is today!')
                    } else {

                        let embed1 = new MessageEmbed()
                        .setColor('#41D15C')
                        .setTitle('◕‿◕')
                        .setDescription(`✅ Date \` ${dateDay}/${dateMonth}\`  set with the name of \`${dateName}\``)
                        data = new db({
                            Day: dateDay,
                            Month:dateMonth,
                            GuildID: interaction.guildid, 
                            Name:dateName,
                            UserID: interaction.member.id,
                            Content:[
                                {
                                    UserID:interaction.member.id,
                                    Name:dateName,
                                }     
                            ]
                        })
                        data.save()
                        
                        module.exports = {today, month, realMonth, GuildID, Name}
    
                        interaction.followUp({embeds:[embed1]})
                    }
                    } else if (data){
                        let embed2 = new MessageEmbed()
                        .setColor('#41D15C')
                        .setTitle('ಠ_ಠ')
                        .setDescription(`❌  \` ${dateDay}/${dateMonth}\` with the name of \`${dateName}\` has already been made by you!`)
                        interaction.followUp({embeds:[embed2]})
                    }
                    
            })
        }
    }
}
