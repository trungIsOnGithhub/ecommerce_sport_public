// Thu tu seed data:
// User --> Stadium --> Stadium Area --> Team
// https://viblo.asia/p/seeder-va-faker-de-tao-du-lieu-mau-cho-mongodb-nodejs-YWOZryANKQ0
// mot so thong tin trong link tren da loi thoi

import { faker } from '@faker-js/faker';
import { Connection } from 'mongoose';
import { IUser } from '../models/User.model';

export function fakeDataUser(conn : Connection) {
  for(let i=0;i<8;++i){
    conn.collection<IUser>("users").insertOne({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      password: "",
      passwordConfirm: "",
      dateOfBirth: new Date(),
      gender: "nam",
      address: faker.location.city(),
      photo: "",
      role: "player",
      points: 686,
      isRealPhone: true,
      passwordChangedAt: new Date(),
      otp: 696969,
      otpExpires: undefined,
      comparePassword: () => true,
      changedPasswordAfter: () => true,
      createPasswordResetToken: () => true,
      createSendOTP: () => true,
  })};
}

// const modelName = 'User';
// let data = [{
//     'model': modelName,
//     'documents': items
// }];

// seeder.connect('mongodb://127.0.0.1:27017/hihi', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: false
// },function(err) {
//   if(err) throw new Error("Connect error to MongoDB");

//   seeder.loadModels(['schema_user.js']);
//   seeder.clearModels([modelName], function() {
//     seeder.populateModels(data, function() {
//       seeder.disconnect();
//     });
//   });
// });