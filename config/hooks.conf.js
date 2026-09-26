export let hooksConf = {
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        await driver.takeScreenshot();

        if (!passed) {
            const source = await driver.getPageSource();
            console.log('----- PAGE SOURCE NO MOMENTO DA FALHA -----');
            console.log(source);
            console.log('----- FIM DO PAGE SOURCE -----');
        }

        await driver.terminateApp('br.com.lojaebac');
    },
    beforeTest: async function () {
        let state = await driver.queryAppState('br.com.lojaebac');
        if (state !== 4) {
            await driver.activateApp('br.com.lojaebac');
        }
    }
};
