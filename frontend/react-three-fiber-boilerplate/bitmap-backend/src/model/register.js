import mongoose from "mongoose";

const registerSchema = new mongoose.Schema(
    {
        value: String
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

export const registerModel = mongoose.model("register", registerSchema)