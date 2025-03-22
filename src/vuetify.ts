import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'

import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'

import 'vuetify/styles'

import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'

const vuetify = createVuetify({
  components,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      fa,
    },
  },
})

export default vuetify
