const dotenv = require('dotenv');
const Discord = require('discord.js');
const query = require('source-server-query');

dotenv.config();

const client = new Discord.Client();

const updateStatus = () => {
  query
    .info(process.env.SERVER_IP, Number(process.env.SERVER_PORT), 2000)
    .then(({playersnum, maxplayers}) => {
      client.user.setActivity(`${playersnum} / ${maxplayers} Online`);
    })
    .catch(console.log);
};

updateStatus();

client.on('ready', updateStatus);
setInterval(updateStatus, process.env.UPDATE_STATUS_INTERVAL_MINUTES * 60 * 1000);

client.login(process.env.DISCORD_TOKEN);
