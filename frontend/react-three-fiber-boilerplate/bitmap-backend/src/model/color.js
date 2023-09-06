import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
    {
        color: String,
        index: String
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
    }
)

export const colorModel = mongoose.model("color", colorSchema)