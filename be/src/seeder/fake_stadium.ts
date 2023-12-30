// Thu tu seed data:
// User --> Stadium --> Stadium Area --> Team
// https://viblo.asia/p/seeder-va-faker-de-tao-du-lieu-mau-cho-mongodb-nodejs-YWOZryANKQ0
// mot so thong tin trong link tren da loi thoi

import { faker } from '@faker-js/faker';
import { Connection } from 'mongoose';
import { IStadium } from '../models/Stadium.model';

export function fakeDataUser(conn : Connection) {
  let items = [];
  for(let i=0;i<8;++i){
  items.push({
    name: faker.location.state(),
    contact: faker.phone.number(),
    description: "",
    rules: "",
    time_open: faker.date.anytime().toTimeString(),
    time_close: faker.date.anytime().toTimeString(),
    location: faker.location.city(),
    avatar: "",
    images: [],
    funds: {},
    slug: "slug-example",
    createAt: new Date(),
    updateAt: new Date(),
    deleteAt: new Date(),
    user: ObjectId,
    find: () => true
  })};
  for (let item of items) {
    conn.collection<IStadium>("stadia").insertOne(item);
  }
}