
 import fs from "fs";

let store;
try{
    const data = fs.readFileSync("attendance.json","utf8");
    store=JSON.parse(data)
}
catch{
    store={};
}
function markPresent(rollNumber){
    if(store[rollNumber]){
        return {
            success:false,
            reason:"already marked",
            timestamp:store[rollNumber]
        };
    }
    store[rollNumber]= new Date().toISOString()
    fs.writeFileSync("attendance.json",JSON.stringify(store, null,2))
    return{
        success:true
    };


}

function getStats(){
    const rolls = Object.keys(store);
    const sortedRoll = rolls.sort();
    const total =rolls.length;
    return{
        total : total,
        rollNumbers : sortedRoll
    };
    


}


export{markPresent,getStats};
