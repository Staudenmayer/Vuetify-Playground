/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          text: '#EEE5E3',
          bg: '#121212',
          primary: '#43a4b7',
          secondary: '#212121',
          accent: '#5EA0AF'
        },
      },
      light: {
        colors: {
          text: '#1C1311',
          bg: '#F1EAE9',
          primary: '#49A8bC',
          secondary: '#DFDFDF',
          accent: '#4F92A1'
        }
      }
    },
  },
})
