const { I } = inject();

Given('я нахожусь на странице регистрации', () => {
  I.amOnPage('/register');
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
  I.fillField(name, value);
});

When('нажимаю на кнопку {string}', (name: string) => {
  I.click(`//button[contains(., '${name}')]`);
});

Then('я вижу сообщение {string}', (message: string) => {
  I.see(message);
  I.wait(5);
});
