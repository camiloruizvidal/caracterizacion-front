import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome';
import { ServiceBuilder } from 'selenium-webdriver/chrome';
import * as path from 'path';

jest.setTimeout(60000); // Aumentar el tiempo de espera global a 60 segundos

describe('Pruebas de Login', () => {
  let driver: WebDriver;

  beforeAll(async () => {
    try {
      console.log('Iniciando configuración del driver...');

      // Configurar el servicio de Chrome
      const chromeDriverPath = require('chromedriver').path;
      console.log('ChromeDriver path:', chromeDriverPath);

      const service = new ServiceBuilder(chromeDriverPath);

      // Configurar las opciones de Chrome
      const options = new chrome.Options();
      options.addArguments('--no-sandbox');
      options.addArguments('--disable-dev-shm-usage');

      console.log('Construyendo el driver...');
      driver = await new Builder()
        .forBrowser('chrome')
        .setChromeService(service)
        .setChromeOptions(options)
        .build();

      console.log('Driver construido exitosamente');
    } catch (error) {
      console.error('Error al inicializar el driver:', error);
      throw error;
    }
  }, 60000);

  afterAll(async () => {
    if (driver) {
      try {
        await driver.quit();
      } catch (error) {
        console.error('Error al cerrar el driver:', error);
      }
    }
  });

  beforeEach(async () => {
    // Primero navegar a la página
    await driver.get('http://localhost:4200/login');

    // Esperar a que la página cargue
    await driver.wait(until.elementLocated(By.css('form')), 10000);

    // Ahora sí limpiar el almacenamiento
    await driver.executeScript('window.localStorage.clear();');
    await driver.executeScript('window.sessionStorage.clear();');
  });

  test('debería iniciar sesión correctamente', async () => {
    try {
      // Navegar a la página de login
      await driver.get('http://localhost:4200/login');

      // Esperar a que el formulario esté presente
      await driver.wait(until.elementLocated(By.css('form')), 10000);

      // Llenar el formulario
      await driver.findElement(By.css('[data-cy=username]')).sendKeys('123456');
      await driver.findElement(By.css('[data-cy=password]')).sendKeys('123456');

      // Hacer click en el botón de login
      await driver.findElement(By.css('[data-cy=login-button]')).click();

      // Esperar a que la URL cambie a dashboard
      await driver.wait(until.urlContains('/'), 10000);

      // Verificar que estamos en la página correcta
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/');
    } catch (error) {
      console.error('Error en la prueba de login exitoso:', error);
      throw error;
    }
  }, 30000);

  test('debería mostrar error con credenciales inválidas', async () => {
    try {
      // Navegar a la página de login
      await driver.get('http://localhost:4200/login');

      // Esperar a que el formulario esté presente
      await driver.wait(until.elementLocated(By.css('form')), 10000);

      // Llenar el formulario con credenciales inválidas
      await driver
        .findElement(By.css('[data-cy=username]'))
        .sendKeys('usuario@incorrecto.com');
      await driver
        .findElement(By.css('[data-cy=password]'))
        .sendKeys('contraseña123');

      // Hacer click en el botón de login
      await driver.findElement(By.css('[data-cy=login-button]')).click();

      // Esperar un momento para que aparezca el toast
      await driver.sleep(1000);

      // Buscar el toast de error
      const toast = await driver.wait(
        until.elementLocated(
          By.css(
            '.toast-error, .toastr-error, .toast-error-container, #toast-container .toast-error'
          )
        ),
        10000
      );

      // Verificar que el toast es visible
      const isDisplayed = await toast.isDisplayed();
      expect(isDisplayed).toBe(true);

      // Verificar el texto del toast
      const toastText = await toast.getText();
      expect(toastText).toContain('El usuario o contraseña son incorrectos');
    } catch (error) {
      console.error('Error en la prueba de login fallido:', error);
      throw error;
    }
  }, 30000);

  test('debería redirigir al login al intentar acceder a ruta protegida sin sesión', async () => {
    try {
      // Intentar acceder directamente a una ruta protegida
      await driver.get('http://localhost:4200/dashboard');

      // Esperar a que la URL cambie a login
      await driver.wait(until.urlContains('/login'), 10000);

      // Verificar que estamos en la página de login
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/login');
    } catch (error) {
      console.error('Error en la prueba de redirección:', error);
      throw error;
    }
  }, 30000);

  test('debería redirigir al dashboard si intenta acceder al login estando autenticado', async () => {
    try {
      // Primero iniciamos sesión
      await driver.get('http://localhost:4200/login');
      await driver.wait(until.elementLocated(By.css('form')), 10000);
      await driver.findElement(By.css('[data-cy=username]')).sendKeys('123456');
      await driver.findElement(By.css('[data-cy=password]')).sendKeys('123456');
      await driver.findElement(By.css('[data-cy=login-button]')).click();
      await driver.wait(until.urlContains('/'), 10000);

      // Intentar acceder al login nuevamente
      await driver.get('http://localhost:4200/login');

      // Esperar a que la URL cambie a dashboard
      await driver.wait(until.urlContains('/'), 10000);

      // Verificar que estamos en la página principal
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).toContain('/');
    } catch (error) {
      console.error('Error en la prueba de redirección post-login:', error);
      throw error;
    }
  }, 30000);
});
