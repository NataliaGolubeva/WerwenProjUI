import { createApp } from 'vue'
import './style.css'
import router from './routes/router'
import {createPinia} from 'pinia'
import { initSettings } from './stores/auth-store'
import { languages } from './plugins/i18n'
import App from './App.vue'
// @ts-ignore
import { createI18n, useI18n } from 'vue-i18n'

import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowLeft,  faRotateLeft, faXmark, faArrowRightFromBracket, faArrowUp } from '@fortawesome/free-solid-svg-icons'

fetch("/" + 'settings.json').then((res)=> {
    res.json().then(result => {
        
        initSettings(result.BASE_URL, result.API_KEY)
        library.add( faRotateLeft, faXmark, faArrowRightFromBracket, faArrowUp, faArrowLeft)

        const localStorageLocale = localStorage.getItem('settings-lang')
        const messages = Object.assign(languages)
        const i18n = createI18n({
            legacy: false,
            locale: localStorageLocale || 'en',
            messages
        })

        createApp(App, {
            setup() {
                const {t} = useI18n()
                return {t}
            }
        })
        .use(router)
        .use(i18n)
        .use(createPinia())
        .mount('#app')
    })
 })
