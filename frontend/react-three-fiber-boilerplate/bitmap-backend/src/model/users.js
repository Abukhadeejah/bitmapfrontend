import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        address: String,
        value: String
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

export const usersModel = mongoose.model("request", usersSchema)