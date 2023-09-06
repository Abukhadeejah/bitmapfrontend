import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import WebSocket from "ws";
import { init, addUser, checkBitmap, saveTeam, saveColor } from "./db.js";

import { registerModel } from "./model/register.js"
import { usersModel } from "./model/users.js";


// load the environment variables from the .env file
dotenv.config({
  path: ".env",
});

const app = express();
const server = http.createServer(app);
server.timeout = 600000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let walletAddress = "bc1pc2vwcl6r95hu3jctujzj94scuar6wf0ph99l0sw4an4f7kva5nnsgle45a";

const ws = new WebSocket('wss://ws.blockchain.info/inv');

const getNewTxMessage = JSON.stringify({
  "op": "unconfirmed_sub"
});

ws.on('open', () => {
  console.log('websocket connected.');
  ws.send(getNewTxMessage);
});




ws.on('message', async (message) => {
  let response = JSON.parse(message);
  let getOutputs = response.x.out;
  // console.log(getOutputs)
  for (let i = 0; i < getOutputs.length; i++) {
    let outAdd = getOutputs[i].addr;
    if (outAdd && outAdd.toLocaleLowerCase() === walletAddress.toLocaleLowerCase()) {
      let amount = response.x.out[i].value;
      amount = Number(amount);      // decimals checked
      console.log(amount)
      const sender = response.x.inputs[0].prev_out.addr;
      if (amount === 15000) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>", sender)
        const user = await usersModel.findOne({ address: sender });
        if (user) {
          console.log("user", user);
          const newResiger = new registerModel({ value: user.value })
          console.log("user", newResiger);
          await newResiger.save(function (err, book) {
            if (err) return console.error(err);
            console.log(newResiger, "Registered new user Successful")
            return true;
          })
          await usersModel.findByIdAndDelete(user._id);
        } else {
          console.log("there is no user now")
        }
        console.log('btc amount: ', amount);
      }
    }
  }
});


init();

app.post("/register", async (req, res) => {
  try {
    const address = req.body.address;
    const value = req.body.bmp;
    const saveUser = await addUser(address, value);
    res.send(saveUser)
  } catch (error) {
    console.log(error, ">>>> Error");
  }
});




app.post("/checkBitmap", async (req, res) => {
  try {
    const bmp = req.body.bmp;

    const check = await checkBitmap(bmp);
    console.log("check", check)
    res.send(check);
  } catch (error) {
    console.error(error)
  }
});


// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.listen(port, () => {
    console.log(`>> Listening on port ${port}`);
    return;
  });
})();
