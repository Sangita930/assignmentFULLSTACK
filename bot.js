
import dotenv from "dotenv";
import  TelegramBot from "node-telegram-bot-api";
import { decodeQR } from "./qr.js";
import { getRollNumber,isRegistered } from "./parser.js";
import { markPresent,getStats } from "./attendance.js";
dotenv.config();

const bot = new TelegramBot(
    process.env.BOT_TOKEN,
    {polling : true}
);
console.log("Bot is running")

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "Send an IITK ID card photo."
    );
});
bot.onText(/\/report/, (msg) => {
const stats = getStats();

bot.sendMessage(
    msg.chat.id,
    `Total Present: ${stats.total}

${stats.rollNumbers.join("\n")}`
);
});

bot.on("photo", async(msg)=>{
    try{
    bot.sendMessage(msg.chat.id,"Photo received")
    const photo = msg.photo[msg.photo.length-1]
    const fileId = photo.file_id
    console.log(fileId)
    const filePath = await bot.downloadFile(fileId,"./download")
    console.log(filePath)
    const qrText =
        await decodeQR(filePath);

    const rollNumber =
        getRollNumber(qrText);

    if (!rollNumber) {
        await bot.sendMessage(
            msg.chat.id,
            "No roll number found in QR."
        );
        return;
    }

    if (!isRegistered(rollNumber)) {
        await bot.sendMessage(
            msg.chat.id,
            `Roll number ${rollNumber} is not registered.`
        );
        return;
    }

    const result =
        markPresent(rollNumber);

    if (result.success) {
        await bot.sendMessage(
            msg.chat.id,
            `Attendance marked for ${rollNumber}`
        );
    } else {
        await bot.sendMessage(
            msg.chat.id,
            `Already marked at ${result.timestamp}`
        );
    }

} catch (error) {

    if (
        error.message ===
        "No QR found"
    ) {
        await bot.sendMessage(
            msg.chat.id,
            "No QR code found in image."
        );
    } else {
        console.error(error);

        await bot.sendMessage(
            msg.chat.id,
            "Something went wrong."
        );
    }
}


})