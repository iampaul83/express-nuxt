# NUXT.js x Express.js

## 1. express generator and install nuxt

```
# express generator
npx express-generator --pug --git express-nuxt
cd express-nuxt
yarn

# nuxt
yarn add nuxt @nuxtjs/axios
yarn add --dev eslint babel-eslint eslint-friendly-formatter eslint-loader eslint-plugin-vue
```

## 2. add `nuxt` folders
- nuxt
    - assets
    - components
    - layouts
    - middleware
    - pages
    - plugins
    - static
    - store

## 3. create nuxt.config.js

`srcDir` option is required if you want to place nuxt in a sub folder

```js
module.exports = {
  mode: 'universal',
  
  srcDir: __dirname,
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
  ],

  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

```

## 4. create nuxt-render.js for render 

```js
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
```

## 5. add nuxt render middleware in app.js

```js
app.use(require('./nuxt/nuxt-render'));
```

## 6. add .eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {}
}
```

## 7. add .gitignore for nuxt

```
# Nuxt build
.nuxt

# Nuxt generate
dist
```