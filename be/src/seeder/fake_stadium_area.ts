import { faker } from '@faker-js/faker';
import mongoose, { Connection } from 'mongoose';
import { IStadiumArea } from '../models/Stadium_area.model';

function getRandomInt(min : number, max : number) : number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function fakeDataStadiumArea(conn: Connection) {
  // console.log("check")
  // Lấy danh sách _id từ collection "users"
  const stadiumIDs = await conn.collection("stadia").distinct("_id");

  // let items = [];
  for (let i=0;i<6;++i) {
    // Chọn một giá trị _id ngẫu nhiên từ danh sách
    const randomStadiumID : mongoose.Schema.Types.ObjectId = stadiumIDs[Math.floor(Math.random() * stadiumIDs.length)];

    conn.collection<IStadiumArea>("stadiumareas").insertOne({
        name: "Sample Stadium Area: " + i,
        size: "sample-stadium-size",
        quantity: 269,
        description: "sample-stadium-area-description",
        type: "sample-stadium-area-type",
        status: "sample-stadium-area-status",
        default_price: getRandomInt(68000, 86000),
        time_price: [
            {
                from: getRandomInt(1,24),
                to: getRandomInt(1,24),
                price: getRandomInt(100000,240000),
            },
        ],
        extra_infor: [
            {
                key: "key",
                value: "value"
            },
        ],
        createAt: new Date(),
        updateAt: new Date(),
        deleteAt: new Date(),
        quantityOrder: 68,
        stadium: randomStadiumID,
        // find: () => true,
        // clone: () => true
    });
  }
}