fk = [];
const fetch = require('node-fetch');

const Discord = require('discord.js');
client = new Discord.Client();
const fs = require('fs');

const vip = [
  "flash307887709706256385"//flash
  ,"563797322798989330"//FK
  ,"658378708893302784"//Dali
  ,"727667474488623235"//DaNaia
  ,"728725797409652767"//Devon
  ,"726857147773616269"//Shoulder
]

// emojis
var eapprove = '✅', ewarn = '⚠️', enot = '🚫', enext = '⏭️', esave = '💾';

var scale = fs.readFileSync('thermometer.svg', 'utf8');
serverID=null;
var memr;
var partr;
vc=null;
var vtxt;
mroom = null;
questions = [];
client.on('ready', () => {
  console.log(`Thermometer logged in as ${client.user.tag}!                                                                           
             _____ _               _      _____     _     _                 _             
            |   __| |_ ___ ___ ___| |_   |   __|___|_|___| |_ ___ _____ ___| |___ ___ _ _ 
            |__   |  _|  _| -_| -_|  _|  |   __| . | |_ -|  _| -_|     | . | | . | . | | |
            |_____|_| |_| |___|___|_|    |_____|  _|_|___|_| |___|_|_|_|___|_|___|_  |_  |
                                               |_|                               |___|___|
                                                                                          
             _____ _                               _              _       _               
            |_   _| |_ ___ ___ _____ ___ _____ ___| |_ ___ ___   | |_ ___| |_             
              | | |   | -_|  _|     | . |     | -_|  _| -_|  _|  | . | . |  _|            
              |_| |_|_|___|_| |_|_|_|___|_|_|_|___|_| |___|_|    |___|___|_|    v1.9          
                                                                                          
                                                                                          
                                         _          _____ _____                           
                                        | |_ _ _   |   __|  |  |                          
                                        | . | | |  |   __|    -|                          
                                        |___|_  |  |__|  |__|__|                          
                                            |___|                                         
  `);
  // SE server: 226539067557412864
  // collab server: 671632183101751296
  serverID = client.guilds.cache.get('226539067557412864');

  // Live show participant / veteran / trsuted speaker role
  spart = serverID.roles.cache.get("750742532048027668");
  // Live show guest role
  sguest = serverID.roles.cache.get("486617619466682378");
  // Live show host role
  shost = serverID.roles.cache.get("481956803702161408");
  // Rec consent role
  recons = serverID.roles.cache.get("750751134531977377");
  // Member role
  mem = serverID.roles.cache.get("481250243380248576");
  // Game role
  gam = serverID.roles.cache.get("779392133584781353");

  vc = serverID.channels.cache.get('481332016307240960');
  vtxt = serverID.channels.cache.get('481331967699320842');
  mroom = serverID.channels.cache.get('482385789271932967');
  

});

client.on('message', msg => {
  // console.log('Claim:',msg.content);
  // fk.push(msg);
    //fs.appendFile('perlog.json', JSON.stringify(msg), function (err) {if (err) throw err;});
    // if( vip.includes(msg.author.id) && (msg.channel.id === vtxt.id) ){ //(msg.channel.type === "dm") ){
    if( msg.member && msg.member.roles.cache.has(shost.id) && (msg.channel.id === vtxt.id) ){ //(msg.channel.type === "dm") ){
      // number: set scale.txt and update scale.svg
      if( Number.isInteger(Number(msg.content) ) ){
        console.log('Scale:',msg.content);
        //fs.writeFileSync('scale.txt', "This is a number: "+msg.content ,{encoding:'utf8',flag:'w'});
        fs.writeFileSync('scale.svg', scale.replace(435, ( Number(msg.content)*8.71) ) ,{encoding:'utf8',flag:'w'});
        fs.writeFileSync('scale.txt', msg.content ,{encoding:'utf8',flag:'w'});
      }// mute/unmute all vc members
      else if(['mute','m','Mute','M','unmute','Unmute','um','Um'].includes(msg.content.split(' ')[0]) ){
        if( ['mute','m','Mute','M'].includes(msg.content.split(' ')[0]) ){
          // console.log('Mute:',msg.content);
          let mentcount = 0;
          if (msg.mentions) 
          if (msg.mentions.users.size > 0)
            mentcount = msg.mentions.users.size;
          if(mentcount){ // console.log('mentions',msg.mentions);
            vc.members.forEach(vcm => { // console.log('each:',vcm.user.id);
              if( msg.mentions.has(vcm.user.id) )// console.log('mentioned:',vcm.user.id);
                vcm.voice.setChannel(vc).catch(err => console.log(err)); 
            });
          }
          else{ //mute all
            vc.members.forEach(vcm => {// console.log('anyeach:',vcm.user.id);
              vcm.voice.setChannel(vc).catch(err => console.log(err)); 
            });
          }
        }//unmute below
        else{  console.log('Unmute:',msg.content);
          let mentcount = 0;
          if (msg.mentions) 
          if (msg.mentions.users.size > 0) {
            mentcount = msg.mentions.users.size;
          }
          if(mentcount){ // console.log('mentions',msg.mentions);
            vc.members.forEach(vcm => { // console.log('each:',vcm.user.id);
              if( msg.mentions.has( vcm.user.id ) ) // console.log('mentioned:',vcm.user.id);
                vcm.voice.setMute(false).catch(err => console.log(err));
            });
          }
          else{ //unmute all
            vc.members.forEach(vcm => vcm.voice.setMute(false).catch(err => console.log(err)) );
          }// console.log('anyeach:',vcm.user.id);
        }
      }// text: set claim.txt
      // else if(msg.content[0] === '-'){  console.log('Claim:',msg.content);
      //   fs.writeFileSync('claim.txt', msg.content.substring(1) ,{encoding:'utf8',flag:'w'});
      // }
      else if(['guest','Guest'].includes(msg.content.split(' ')[0])){
        let mentcount = 0;
        if (msg.mentions) 
        if (msg.mentions.users.size > 0)
          mentcount = msg.mentions.users.size;
        if(mentcount){
          msg.mentions.members.forEach(user => {
            user.roles.add(sguest)
              .then( () => { user.voice.setChannel(vc).catch(err => console.log(err)) } )
              .catch(err => console.log(err));  
          });
          return;
        }
        serverID.members.cache.get("760539661973717092").setNickname( msg.content.substring( msg.content.split(' ')[0].length ) ).catch(err => console.log(err));
        fs.writeFileSync('guest.txt', msg.content.substring( msg.content.split(' ')[0].length ) ,{encoding:'utf8',flag:'w'});
      }
      else if(['unguest','Unguest'].includes(msg.content.split(' ')[0])){
        let mentcount = 0;
        if (msg.mentions) 
        if (msg.mentions.users.size > 0)
          mentcount = msg.mentions.users.size;
        if(mentcount){
          msg.mentions.members.forEach(user => {
            user.roles.remove(sguest)
              .then( () => { user.voice.setChannel(vc).catch(err => console.log(err)) } )
              .catch(err => console.log(err)); 
          });
        }
      }
      else if(['game','Game'].includes(msg.content.split(' ')[0])){
        let mentcount = 0;
        if (msg.mentions) 
        if (msg.mentions.users.size > 0)
          mentcount = msg.mentions.users.size;
        if(mentcount){
          msg.mentions.members.forEach(user => {
            user.roles.add(gam)
              .then( () => { user.roles.remove(mem).catch(err => console.log(err)) } )
              //.then( () => { user.voice.setChannel(vc).catch(err => console.log(err)) } )
              .catch(err => console.log(err));  
          });
          return;
        }
      }
      else if(['ungame','Ungame'].includes(msg.content.split(' ')[0])){
        let mentcount = 0;
        if (msg.mentions) 
        if (msg.mentions.users.size > 0)
          mentcount = msg.mentions.users.size;
        if(mentcount){
          msg.mentions.members.forEach(user => {
            user.roles.remove(gam)
              .then( () => { user.roles.add(mem).catch(err => console.log(err)) } )
              //.then( () => { user.voice.setChannel(vc).catch(err => console.log(err)) } )
              .catch(err => console.log(err)); 
          });
        }
      }
      else if(['unclench','Unclench'].includes(msg.content.split(' ')[0])){
        sguest.members.forEach(user => {
          user.roles.remove(sguest).catch(err => console.log(err));
          // user.voice.setChannel(vc).catch(err => console.log(err));
          serverID.members.cache.get("658378708893302784").setNickname( "JugglingLessons" ).catch(err => console.log(err));
        });
      }
      else if(['survey','Survey'].includes(msg.content)){
        if (suri === 0) {
          msg.channel.send(`Starting the Street epistemology survey!`);
          suri++;
          msg.channel.send(`${suri}. ${surq[suri]}`)
            .then(function (message) {
              message.react(':one:').catch(err => console.log(err))
              message.react(':two:').catch(err => console.log(err))
          }).catch(function() {
            //Something
           });;
        }
        else{
          msg.channel.send(`Survey is already in progress. Current survey question number: ${suri}`);
        }
      }
      else if(['host','Host'].includes(msg.content.split(' ')[0])){
        serverID.members.cache.get("658378708893302784").setNickname( msg.content.substring( msg.content.split(' ')[0].length ) ).catch(err => console.log(err));
        fs.writeFileSync('host.txt', msg.content.substring( msg.content.split(' ')[0].length ) ,{encoding:'utf8',flag:'w'});
      }
      else if(['homework','Homework'].includes(msg.content)){
        msg.author.send('https://studio.youtube.com/channel/UClkT332HEYPO8xvRXOhQrXg').catch(err => console.log(err));
      }
      else if(['howdy','Howdy'].includes(msg.content)){
        msg.reply(" hi! Who's ready for some Street Epistemology?").catch(err => console.log(err));
      }
      else if(['dump','Dump'].includes(msg.content)){
        if (questions.length === 0) {
          msg.channel.send('Nothing saved. Click the floppy disk emoji to save messages from the audience.');
          return          
        }
        let qlist = '', qi=1;        
        questions.forEach( (q)=>{
          qlist+=(qi++)+'. '+q+'\n';
        });
        msg.channel.send("List of saved messages:");
        msg.channel.send(qlist);
        console.log(qlist);
        questions = [];
      }
      else if(['camera','Camera'].includes(msg.content.split(' ')[0])){
        let roomnum = Math.floor(Math.random() * (10**6) );
        roomnum = 2967164;
        let camname = msg.content.split(' ')[1]+roomnum;
        let camsize = '';
        if( Number.isInteger(Number( msg.content.split(' ')[2] ) ) ){
          camsize = `&h=${msg.content.split(' ')[2]}&w=${msg.content.split(' ')[2]}`;
        }
        // ad = audiodevice, wc = webcam, fps = framerate, as = autostart, h = height, w = width
        let ninja_link_camera =`https://obs.ninja/?push=${camname}&fps=25&wc&ad=0&hideheader&maxvideobitrate=500${camsize}`;
        // clean = cleanoutput,
        msg.author.send(ninja_link_camera).catch(err => console.log(err)); 
        msg.author.send(`https://obs.ninja/?view=${camname}&label=${camname}&codec=h264&bitrate=500&clean`).catch(err => console.log(err));
        let mentcount = 0;
        if (msg.mentions) 
        if (msg.mentions.users.size > 0)
          mentcount = msg.mentions.users.size;
        if(mentcount){
          msg.mentions.users.forEach(camuser => {ninja_link_camera
              camuser.send(`Hi, please use the link below to send your camera feed to our show:`).catch(err => console.log(err)); 
              camuser.send(ninja_link_camera).catch(err => console.log(err)); 
          });
        }
      }
      else if(['room','Room'].includes(msg.content.split(' ')[0])){
        let room8 = msg.content.split(' ')[1]
        let camsize = '';
        if( Number.isInteger(Number( msg.content.split(' ')[2] ) ) ){
          camsize = `&h=${msg.content.split(' ')[2]}&w=${msg.content.split(' ')[2]}`;
        }
        let roomnum = Math.floor(Math.random() * (10**6) );
        roomnum = 2967164;
        // ad = audiodevice, wc = webcam, fps = framerate, as = autostart, h = height, w = width
        
        let ninja_link_room =`https://obs.ninja/?room=JugglingLessons${roomnum}&password=2uj6b548j1b&fps=25&push=${room8}${camsize}`;
        // clean = cleanoutput, 
        msg.author.send(ninja_link_room).catch(err => console.log(err));
        msg.author.send(`https://obs.ninja/?view=${room8}&codec=h264&bitrate=500&room=JugglingLessons${roomnum}&password=2uj6b548j1b&wc&scene`).catch(err => console.log(err));

        let mentcount = 0;
        if (msg.mentions) 
        if (msg.mentions.users.size > 0)
          mentcount = msg.mentions.users.size;
        if(mentcount){
          msg.mentions.users.forEach(camuser => {
              camuser.send(`Hi, please use the link below to join our show's video chat:`).catch(err => console.log(err));
              camuser.send(ninja_link_room).catch(err => console.log(err)); 
          });
        }
      }
      
      // ninja_link ='&cleanoutput&hideheader&label={somename}';
  
  // ninja_link_viewer = '&view={value1}&codec={vp8 or vp9 or h264}&videobitrate=1000&audiobitrate=96'

  //https://obs.ninja/?view=CircleTheSquare&label=Near&codec=h264&bitrate=500&cleanoutput
  //https://obs.ninja/?push=CircleTheSquare&cleanoutput&hideheader&label=CircleTheSquare&webcam&audiodevice=0&autostart&framerate=25&maxvideobitrate=1000&height=1080&width=1080


    }
    if(msg.channel.id === vtxt.id){ //msg.member && msg.member.roles.cache.has(mem.id) &&
      if(msg.content[0] === '-'){
        msg.react(eapprove)
        .then(r => {msg.react(ewarn)})
        .then(r => {msg.react(enot)})
        .then(r => {msg.react(esave)})
        // .then(r => {msg.react(enext)}) 
        .catch(err => console.log(err))
      }
    }
});

// Same code as above
client.on('messageReactionAdd', (reaction, user) => {
  if (user.bot) return;
  let msg = reaction.message, emoji = reaction.emoji;
  if( serverID.members.cache.get(user.id).roles.cache.has(shost.id) && (msg.channel.id === vtxt.id) )
  if (emoji.name == eapprove) {
    fs.writeFileSync('claim.txt', msg.content.substring(1) ,{encoding:'utf8',flag:'w'});
    // msg.channel.send('Claim: '+ msg.content.substring(1))
  }
  if (emoji.name == esave) {
    questions.push(msg.content.substring(1));
    reaction.remove()

    // fs.writeFileSync('claim.txt', msg.content.substring(1) ,{encoding:'utf8',flag:'w'});
    // msg.channel.send('Claim: '+ msg.content.substring(1))
  }
  // else if (emoji.name == '🔴') {
          // message.guild.fetchMember(user.id).then(member => {
                  // member.removeRole('role_id');
          // });
  // }

  // // Remove the user's reaction
  // // reaction.remove(user);
});
var suri = 0;
var surq= [];
surq[1] = `A statement is true when it corresponds to reality.`;
surq[2] = `We all share the same reality and only interpret it differently.`;
surq[3] = `Truth depends on the opinions and beliefs of people.`;
surq[4] = `People create words and define their meaning.`;
surq[5] = `A statement is true if everyone agrees.`;
surq[6] = `Strong belief, even without action, can change external reality.`;
surq[7] = `Some beliefs should never be questioned.`;
surq[8] = `Someone can be certain something is true yet still be mistaken.`;
surq[9] = `A test that cannot identify a failure is useful.`;
surq[10] = `If all members of a society share a belief, they are justified to hold that belief.`;
surq[11] = `Believing something that is false feels just like believing something that is true.`;
surq[12] = `Feelings are a reliable way to discover truth.`;
surq[13] = `Believing something without evidence is admirable.`;
surq[14] = `Without an explanation for something, any answer is better than no answer.`;
surq[15] = `It is ok to accept something is true because it is comforting.`;
surq[16] = `I give all claims the benefit of the doubt when I first encounter them.`;
surq[17] = `Someone is justified in their beliefs until they are proven wrong.`;
surq[18] = `The most important criteria for my beliefs is that they match reality.`;
surq[19] = `I often investigate beliefs that do not match my own.`;
surq[20] = `I am comfortable with saying: "I don't know".`;
surq[21] = `It is beneficial to find out when I am wrong about something.`;
surq[22] = `I will abandon a belief if I discover reliable information that falsifies it.`;
surq[23] = `The more unusual the statement, the stronger the evidence needs to be.`;
surq[24] = `It is possible that some of my beliefs are not true.`;

gap = `










































`;
if (!process.env.DISCORD_TOKEN) {
  let rawdata = fs.readFileSync('token.json');
  process.env.DISCORD_TOKEN = JSON.parse(rawdata).DISCORD_TOKEN;
}
console.log('pre-login')
client.login(process.env.DISCORD_TOKEN).catch(err => {
  throw new Error(process.env);
});