import database from "mongoose"
import { usersModel } from "./model/users.js"
import dotenv from "dotenv";
import { registerModel } from "./model/register.js";
import { colorModel } from "./model/color.js";

dotenv.config({
    path: ".env",
});

const DB_CONNECTION = process.env.DB_CONNECTION

export const init = () => {
    if (DB_CONNECTION === undefined) return;
    if (database.connection.readyState === database.ConnectionStates.connected)
        return;
    database
        .connect(DB_CONNECTION)
        .then((v) => {
            console.log(`mongodb database connected`);
        })
        .catch((e) => {
            console.error(`mongodb error ${e}`);
        });



};

export const addUser = async (address, value) => {
    try {
        console.log(address, value)
        let ts = new Date()
        const newUser = new usersModel({
            address: address,
            value: value
        })

        newUser.save(function (err, book) {
            if (err) return console.error(err);
            console.log(newUser, "Saved new user Successful")
        })
    } catch (error) {
        console.log("error");
    }
};


export const checkBitmap = async (bmp) => {
    try {
        const res = await registerModel.aggregate([{
            $match: {
                value: { $in: bmp }
            }
        },
        {
            $project: {
                value: 1
            }
        }

        ])
        return res;
    } catch (error) {
        console.log(error)
    }
}


export const saveTeam = async (bmp) => {
    try {
        const documents = bmp.map(item => {
            return { value: item.value };
        });

        await registerModel.insertMany(documents);
        console.log("Registered new users successfully");
    } catch (error) {
        console.error(error);
    }
};

export const saveColor = async (value, index) => {
    try {
        const documents = (() => {
            return { color: value, index: index };
        });

        await colorModel.insertMany(documents);
        console.log("Registered new colors successfully");
    } catch (error) {
        console.error(error);
    }
};
