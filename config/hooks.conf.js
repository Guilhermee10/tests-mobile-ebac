export let hooksConf = {
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        await driver.takeScreenshot();
        await driver.execute('mobile: terminateApp', { bundleId: 'br.com.lojaebac' });
    },
    beforeTest: async function () {
        let state = await driver.queryAppState('br.com.lojaebac');
        if (state !== 4) {
            await driver.execute('mobile: launchApp', { bundleId: 'br.com.lojaebac' });
        }

    }
};
