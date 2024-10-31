const { I } = inject();

const pageMap: Record<string, string> = {
  'входа': '/login',
  'регистрации': '/register',
  'создания товара': '/admin/products/new',
};

const userPasswords = {
  'admin@shop.local': '1@345qWert'
}

Given('я нахожусь на странице {string}', (page: string) => {
  I.amOnPage(pageMap[page]);
});

Given('я залогинен как {string}', (userEmail: string) => {
  I.amOnPage(pageMap['входа']);
  I.fillField('Email', userEmail);
  I.fillField('Password', userPasswords[userEmail]);
  I.click(`//button[contains(., 'Sign in')]`);
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
  I.fillField(name, value);
});

When('нажимаю на кнопку {string}', (name: string) => {
  I.click(`//button[contains(., '${name}')]`);
});

Then('я вижу сообщение {string}', (message: string) => {
  I.see(message);
});

Then('я жду {int} секунд', (seconds: number) => {
  I.wait(seconds);
});