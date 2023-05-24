import { App } from 'vue'
import { HttpClient } from '~/common/HttpClient'

export const httpClient = new HttpClient({
    prefixUrl: 'https://rickandmortyapi.com',
})

export const httpClientPlugin = {
    install(app: App) {
        if (app.config.globalProperties['$httpClient']) {
            throw new Error('httpClient already exist')
        }
        app.config.globalProperties['$httpClient'] = httpClient
    },
}
