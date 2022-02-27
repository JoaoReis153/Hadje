const prefixSchema = require('../Schemas/guild-prefixes.js')
const mongo = require('../Database/index.js')
const { prefix: globalPrefix } = require('../Data/config.json')

const guildPrefixes = {}

module.exports.loadPrefixes = async (client) => {
    await mongo().then(async (mongoose) => {
      try {
        for (const guild of client.guilds.cache) {
          const guildId = guild[1].id
          
  
          const result = await prefixSchema.findOne({ _id: guildId })
          guildPrefixes[guildId] = result ? result.prefix : globalPrefix
        }
      } finally {
        mongoose.connection.close()
      }
    })
  }

