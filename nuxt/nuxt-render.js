const { Nuxt, Builder } = require('nuxt')

const config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

// build nuxt
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build().catch((error) => {
        console.log('failed to build nuxt')
        console.log(error)
    })
}

module.exports = nuxt.render
