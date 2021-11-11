const {MessageEmbed, Interaction}= require('discord.js');


module.exports = {
  name:"help",
  description:"help me embed!",
  type: 'CHAT_INPUT',
  options:[ 
    {
      name:'enter',
      description:'enter command',
      value: 'enter',
      type: 'BOOLEAN',
      required: false,
    },
    {
      name:'ban',
      description:'ban command',
      value: 'ban',
      type: 'BOOLEAN',
      required: false,
    },
    {
      name:'kick',
      description:'kick command',
      value: 'kick',
      type: 'BOOLEAN',
      required: false,
    },
    {
      name:'warn',
      description:'warn command',
      value: 'warn',
      type: 'BOOLEAN',
      required: false,
    },
    {
      name:'shortcuts',
      description:'short command',
      value: 'shorts',
      type: 'BOOLEAN',
      required: false,
    },
        
  ],

  run:async (message, interaction)=>{
    const helpMe = new MessageEmbed()
    .setColor('#41D15C')
    .setTitle('Nikoo')
    .setDescription('Here to help!')
    .addFields(
      {name:`Nikoo the Moderation bot!`, value:"Hi! This is the help guide of the Nikoo." },
      {name:`General`, value:`\` Use / as prefix!\``},
      {name:`Arguments`, value:`\` [ARGS] - REQUIRED , <ARGS> - OPTIONAL\``},
      {name:`/help \`Type:SUB_COMMAND\``, value:"This will tell you about the bot and its commands!"},
      {name:`/ban  \`Type:CHAT_INPUT \``, value:"This will ban a user!"},
      {name:`/kick \`Type:CHAT_INPUT \``, value:"This will kick a user"},
      {name:`/dates \`Type:SUB_COMMANDT \``, value:"You can set remidners from this command!"},
      {name:`/warnings  \`Type:SUB_COMMAND \``, value:"warn , remove warn, check warns of a user!"},
      {name:`/enter \`Type:CHAT_INPUT \``, value:"Whitelisted users with the role @perms can enter GOD mode!"},
      {name:`/exit \`Type:CHAT_INPUT\`` , value:"Users in GOD mode or with the role @all perms xDD can leave GOD mode and go back to @perms"},
      {name:`/shorts \`Type:SUB_COMMAND \``, value:"This can create shortcuts for future use!"},
    )
    .setFooter('Helping manual!');

    const enter = interaction.options.getBoolean('enter')
    const kick = interaction.options.getBoolean('kick')
    const warn = interaction.options.getBoolean('warn')
    const ban = interaction.options.getBoolean('ban')
    const shorts = interaction.options.getBoolean('shortcuts')
    if(enter){
      const enterEmbed = new MessageEmbed()
      .setColor('#41D15C')
      .setTitle('Nikoo')
      .setDescription('Here to help!')
      .addFields(
      {name:`Command:`, value:"/enter", inline:true},
      {name:`Args:`, value:"No args", inline:true},
      {name:`Requirements:`, value:"perms role", },
      {name:`Usage:`, value:`\` /enter \``, inline:true },
      )
      interaction.followUp({embeds:[enterEmbed]})

    }else if(kick){
      const kickEmbed = new MessageEmbed()
      .setColor('#41D15C')
      .setTitle('Nikoo')
      .setDescription('Here to help!')
      .addFields(
      {name:`Command:`, value:"/kick", inline:true},
      {name:`Args:`, value:"[USER], [REASON]", inline:true},
      {name:`Requirements:`, value:"GOD Mode", },
      {name:`Usage:`, value:`\` /kick @user test \``,},
      )
      interaction.followUp({embeds:[kickEmbed]})
    }else if(ban){
      const banEmbed = new MessageEmbed()
      .setColor('#41D15C')
      .setTitle('Nikoo')
      .setDescription('Here to help!')
      .addFields(
      {name:`Command:`, value:"/ban", inline:true},
      {name:`Args:`, value:"[USER], [REASON]", inline:true},
      {name:`Requirements:`, value:"GOD Mode", },
      {name:`Usage:`, value:`\` /ban @user test \``,},
      )
      interaction.followUp({embeds:[banEmbed]})
    } else if (warn) {

      const warnEmbed = new MessageEmbed()
      .setColor('#41D15C')
      .setTitle('Nikoo')
      .setDescription('Here to help!')
      .addFields(
      {name:`Command:`, value:"/warn", inline:true},
      {name:`Args:`, value:"[USER], [REASON] <EVIDENCE>", inline:true},
      {name:`Requirements:`, value:"GOD Mode", },
      {name:`Usage:`, value:`\` /warnings add @user test evidence \n /warnings check @user \n /warnings remove @user \``,},
      )
      interaction.followUp({embeds:[warnEmbed]})
    } else if (shorts){

      const shortEmbed = new MessageEmbed()
      .setColor('#41D15C')
      .setTitle('Nikoo')
      .setDescription('Here to help!')
      .addFields(
      {name:`Command:`, value:"/shorts", inline:true},
      {name:`Args:`, value:"[NAME], [DATA]", inline:true},
      {name:`Requirements:`, value:"No requirements", },
      {name:`Usage:`, value:`\` /shorts create name data \n /shorts use name\n\``,},
      )
      interaction.followUp({embeds:[shortEmbed]})

    }
    
    else {
      interaction.followUp({embeds:[helpMe]})
    }
    
    }
    
  }

      
