const client = require("../index");
const db = require('../schema/date-schema');
const { Interaction , MessageEmbed} = require("discord.js");
const statusArray = [
'You from heaven ಠ_ಠ , WATCHING', 
'In Developement ◕‿◕ , WATCHING',
'/ commands ⌐■_■ , PLAYING',
'Made by zwizy ⌐■_■ , WATCHING',
'Selling Data to Government ◣_◢, PLAYING',
]

const date = new Date()

checkDate = () => {

  let date = new Date()

  db.findOne({Day:date.getDate() + 1, Month:date.getMonth() + 1}, async (err, data)=>{
    
    if(data){
      
      let date = new Date()
      let today = date.getDate()
      let month = date.getMonth()
      let realMonth = month + 1
      let futureDay = today+1



      const userFound = data.Content.map((w) => w.UserID).join(' ')
      const nameFound = data.Content.map((w) => w.Name).join(' ')

      
      let embed2 = new MessageEmbed()
      .setColor('#41D15C')
      .setTitle('◕‿◕')
      .setDescription(`✅ Hi your date  \` ${futureDay}/${realMonth}\` with the name of \`${nameFound}\` is about to trigger!`)
      
      try{
        client.users.fetch(userFound).then(user => {
          user.send({embeds:[embed2]})
        })
      } catch (err) {
        console.log('Could not DM')
      }

      
      db.deleteOne({Day:futureDay, Month:realMonth, Name:nameFound, UserID:userFound})
    }
  })


   

}



client.on("ready", () =>{

    console.log(`✅ ${client.user.tag} booted ! \n ______________________\n`)
    
    setInterval(() => {
        checkDate()
        client.user.setStatus('dnd');
        const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ')
        const status = random[0];
        const mode = random[1];
        client.user.setActivity(status, { type: mode })
        //console.log(`✅ Status changed to ${status}`)
        
      }, 50000)

     
});


