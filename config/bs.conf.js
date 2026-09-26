import { generalConf } from "./general.conf.js";

export let bsConf = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    hostname: 'hub.browserstack.com',

    capabilities: process.env.PLATFORM === 'android' ? [
        {
            "platformName": "Android",
            'appium:deviceName': 'Samsung.*',
            'appium:platformVersion': '10',
            'appium:automationName': 'UiAutomator2',
            'appium:app': process.env.BROWSERSTACK_APP_URL, // preenchido pelo workflow a cada upload

        }

    ] : [
        {
            "platformName": "ios",
            'appium:deviceName': 'iphone 15',
            'appium:platformVersion': '17.0',
            'appium:automationName': 'XCUITest',
            'appium:app': process.env.BROWSERSTACK_APP_URL,
        }
    ],
    commonCapabilities: {
        'bstack:options': {
            projectName: 'BrowserStack EBAC',
            buildName: 'browserstack build',
            sessionName: `test ${process.env.PLATFORM}`,
            // debug: true,
            // networkLogs: true,
        }
    },
    ...generalConf


};
