const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
    {
        user_Id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
        name: {
            type: String,
            required: [true, "Enter the Name"],
        },
        email: {
            type: String,
            required: [true, "Enter the Email"],
        },
        phone: {
            type: Number,
            required: [true, "Enter the Number"],
        },
    },
    {
        timestamps: true,
    }
);

const contactModel = model("contacts", contactSchema);

module.exports = contactModel;
