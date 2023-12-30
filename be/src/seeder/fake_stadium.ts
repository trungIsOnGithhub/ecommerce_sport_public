import { faker } from '@faker-js/faker';
import { Connection, Types } from 'mongoose';
import { IStadium } from '../models/Stadium.model';

export async function fakeDataStadium(conn: Connection) {
  console.log("check")
  // Lấy danh sách _id từ collection "users"
  const userIDs = await conn.collection("users").distinct("_id");

  // let items = [];
  for (let i = 0; i < 8; ++i) {
    // Chọn một giá trị _id ngẫu nhiên từ danh sách
    const randomUserID : Types.ObjectId = userIDs[Math.floor(Math.random() * userIDs.length)];

    conn.collection<IStadium>("stadia").insertOne({
      name: faker.location.state(),
      contact: faker.phone.number(),
      description: "",
      rules: "",
      time_open: faker.date.anytime().toTimeString(),
      time_close: faker.date.anytime().toTimeString(),
      location: {
        province: {
          code: faker.random.alphaNumeric(),
          name: faker.address.state(),
        },
        district: {
          code: faker.random.alphaNumeric(),
          name: faker.address.city(),
        },
        ward: {
          code: faker.random.alphaNumeric(),
          name: faker.address.city(),
        },
        address: faker.address.streetAddress(),
      },
      avatar: "",
      images: [],
      funds: {},
      slug: "slug-example",
      createAt: new Date(),
      updateAt: new Date(),
      deleteAt: new Date(),
      user: randomUserID, // Gán một giá trị _id từ danh sách
      find: () => true
    });
  }
}