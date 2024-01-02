import { faker } from '@faker-js/faker';
import mongoose, { Connection } from 'mongoose';
import { IStadium } from '../models/Stadium.model';

export async function fakeDataStadium(conn: Connection) {
  // console.log("check")
  // Lấy danh sách _id từ collection "users"
  const userIDs = await conn.collection("users").distinct("_id");

  // let items = [];
  for (let i = 0; i < 6; ++i) {
    const randomUserID : mongoose.Schema.Types.ObjectId = userIDs[Math.floor(Math.random() * userIDs.length)];

    conn.collection<IStadium>("stadia").insertOne({
      name: faker.location.state(),
      contact: faker.phone.number(),
      description: "",
      rules: "",
      time_open: faker.date.anytime().toTimeString(),
      time_close: faker.date.anytime().toTimeString(),
      location: {
        province: {
          code: faker.string.alphanumeric(),
          name: faker.location.state(),
        },
        district: {
          code: faker.string.alphanumeric(),
          name: faker.location.city(),
        },
        ward: {
          code: faker.string.alphanumeric(),
          name: faker.location.city(),
        },
        address: faker.location.streetAddress(),
      },
      avatar: "",
      images: [],
      funds: {},
      slug: "slug-example",
      createAt: new Date(),
      updateAt: new Date(),
      deleteAt: new Date(),
      user: randomUserID, // Gán một giá trị _id từ danh sách
      // find: () => true
    });
  }
}