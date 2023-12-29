// Thu tu seed data:
// User --> Stadium --> Stadium Area --> Team
// https://viblo.asia/p/seeder-va-faker-de-tao-du-lieu-mau-cho-mongodb-nodejs-YWOZryANKQ0
// mot so thong tin trong link tren da loi thoi

const { faker } = require('@faker-js/faker');
const seeder = require('mongoose-seed');

let items = [];
for(i=0;i<9;++i){
items.push(
{
  name: faker.internet.userName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  password: "",
  passwordConfirm: "",
  dateOfBirth: Date.now(),
  gender: "nam",
  address: "268 Ly Thuong Kiet, phuong 14, quan 10, TP.HCM",
  photo: "",
  role: "player",
  points: 686,
  isRealPhone: true,
  passwordChangedAt: Date.now(),
  otp: 696969,
  otpExpires: undefined,
  comparePassword: () => true,
  changedPasswordAfter: () => true,
  createPasswordResetToken: () => true,
  createSendOTP: () => true,
}
)
}

const modelName = 'Category';
let data = [{
    'model': modelName,
    'documents': items
}];

seeder.connect('mongodb://localhost:27017/hihi', function() {
  seeder.loadModels(['schema.js']);
  seeder.clearModels([modelName], function() {
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});