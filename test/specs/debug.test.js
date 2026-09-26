import { driver } from '@wdio/globals'

describe('Debug', () => {
    it('dump da tela inicial', async () => {
        await driver.pause(5000) // dá tempo do app carregar antes de capturar
        const source = await driver.getPageSource()
        console.log('----- PAGE SOURCE DA TELA INICIAL -----')
        console.log(source)
        console.log('----- FIM DO PAGE SOURCE -----')
    })
})
