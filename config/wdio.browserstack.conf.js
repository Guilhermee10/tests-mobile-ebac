// Config para rodar os testes no BrowserStack App Automate.
//
// Reaproveita tudo do wdio.conf.js atual (specs, mocha, reporters, hooks) e
// sobrescreve apenas o que muda na Device Farm: credenciais, servidor,
// serviço do BrowserStack e capabilities.
//
// Variáveis de ambiente:
//   BROWSERSTACK_USERNAME    (obrigatória)  usuário do BrowserStack
//   BROWSERSTACK_ACCESS_KEY  (obrigatória)  access key do BrowserStack
//   BROWSERSTACK_APP         (obrigatória)  caminho do .apk/.aab a enviar
//                                           ou id já enviado (bs://...)
//   BS_DEVICE                (opcional)     padrão: Google Pixel 7
//   BS_OS_VERSION            (opcional)     padrão: 13.0
//
// Execução: npm run test:browserstack

// Se o seu wdio.conf.js usar "export default", troque por:
//   import baseConfig from './wdio.conf.js';
import { config as baseConfig } from './wdio.conf.js';

const { BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_APP } = process.env;

if (!BROWSERSTACK_USERNAME || !BROWSERSTACK_ACCESS_KEY) {
  throw new Error(
    'Defina BROWSERSTACK_USERNAME e BROWSERSTACK_ACCESS_KEY (secrets do GitHub Actions ou variáveis de ambiente).'
  );
}

if (!BROWSERSTACK_APP) {
  throw new Error(
    'Defina BROWSERSTACK_APP com o caminho do .apk/.aab (ex.: ./app/ebacshop.apk) ou com o id bs://... do app já enviado.'
  );
}

const buildNumber = process.env.GITHUB_RUN_NUMBER || 'local';

export const config = {
  ...baseConfig,

  // Credenciais
  user: BROWSERSTACK_USERNAME,
  key: BROWSERSTACK_ACCESS_KEY,

  // Servidor do BrowserStack (substitui o Appium local em localhost:4723)
  hostname: 'hub.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  // Plano gratuito/trial costuma limitar a execução paralela
  maxInstances: 1,

  // O serviço faz o upload do app (quando é um caminho de arquivo) e injeta
  // a capability do app na sessão. Não usamos o serviço "appium" local aqui.
  services: [
    [
      'browserstack',
      {
        app: BROWSERSTACK_APP,
        browserstackLocal: false,
      },
    ],
  ],

  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': process.env.BS_DEVICE || 'Google Pixel 7',
      'appium:platformVersion': process.env.BS_OS_VERSION || '13.0',
      'appium:automationName': 'UiAutomator2',
      'bstack:options': {
        projectName: 'EBAC Shop - Testes Mobile',
        buildName: `ebac-shop-mobile #${buildNumber}`,
        sessionName: 'Testes mobile EBAC Shop',
        debug: true, // habilita screenshots a cada passo no dashboard
        networkLogs: true,
      },
    },
  ],
};
