import { $ } from '@wdio/globals'

class HomePage {

    async openMenu(menu){
        await $(`~tab-${menu}`).click()
    }

}

export default new HomePage();
