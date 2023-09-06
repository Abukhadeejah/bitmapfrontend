import axios from "axios";

export const addUser = async (address, bmp) => {
    try {
        const res = await axios.post("http://localhost:3002" + "/register", { address, bmp })
        return res.data
    } catch (error) {
        console.error(error)
    }
}

//check if the user is whitelist
export const checkWhitelist = async (address) => {
    try {
        const res = await axios.post("http://localhost:3002" + "/getwhitelist", { address })
        return res.data
    } catch (error) {

    }
}

//if whitelist, directly save user to register db
export const saveWhitelist = async (address, bmp) => {
    try {
        const res = await axios.post("http://localhost:3002" + "/registerWhitelist", { address, bmp })
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

//check if my bitmap is registered

export const checkBitmap = async (bmp) => {
    try {
        const res = await axios.post("http://localhost:3002" + "/checkBitmap", { bmp })
        return res.data;
    } catch (error) {

    }
}
