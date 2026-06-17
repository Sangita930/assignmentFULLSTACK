import { Jimp } from "jimp";
import jsQR from "jsqr";
console.log("QR file loaded");
async function  decodeQR(imagePath) {
 const image = await Jimp.read(imagePath)
 const {width,height,data}= image.bitmap
 const result = jsQR(data,width,height)
 if(result === null){
    throw new Error("No QR found");
    
 }
 return result.data
    
}
export{ decodeQR };