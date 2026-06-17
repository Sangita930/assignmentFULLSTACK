
// const qr =" 02.240930,1,MEQCIDlQJegytMSkLE7Gbjh7e+v6uhPI6GVmCLxbQJVSmZbOAiAcsl1JhdiVHVBDER1IxRx6wK5tXWiyktGNSLQ1A+uf7Q==.iitkidcard";
function getRollNumber(qrString){
    const match = qrString.match(/\d{6}/g);
    
     if(!match){
         return null;
     }
     else {
        return match[0];

     }

}
function isRegistered(rollNumber){
    const num =Number(rollNumber);
    return(
        num >=240001 && num<=240400
    );
}
export{getRollNumber,isRegistered};