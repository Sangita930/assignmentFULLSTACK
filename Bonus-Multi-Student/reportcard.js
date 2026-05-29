import fs from "fs";


const data = fs.readFileSync("students.json","utf-8");

// console.log(data);
const studentsData = JSON.parse(data);
// console.log(studentsData)

class Student{
    constructor(name,scores){
        this.name=name,
        this.scores=scores

    }
 getTotal() {
    let total=0;
    for(let i of this.scores){
        total = total+i;
    }
    return total;
    
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
getAverage(){
    return this.getTotal() / this.scores.length;
}
getLetterGrade(){ 
    let average =this.getAverage();
    if(average >=90){
        return "A";
    }
    
    else if(average >=75){
        return "B";
    }
     else if(average >=50){
        return "C";
    }
    else if(average>=25){
        return "D";
    }
    else{
         return "F";
    }
}
summary(){
    let highest = this.scores[0];
    let lowest = this.scores[0];
    for(let score of this.scores){
        if(score>highest){
            highest =score;
        }
        if(score<lowest){
            lowest =score;
        }
    }
    return{
        highest,
        lowest
    }
}
getRemark(grade){
    switch(grade){
        case "A":
            return "Excellent";
        case "B":
            return "Good";
        case "C":
            return "Average" ;
        case "D":
            return "Need Improvement";
        case "F":
            return "Poor";           
    }
}


}
let topStudent = null;
let highestAverage = 0;

for(let students of studentsData){
    // console.log(students);
    // console.log(students.name);
    // console.log(students.scores);
    const studentObj = new Student (students.name,students.scores);
    // console.log(studentObj.name)

    // console.log(studentObj.getAverage())
    // console.log(studentObj.getLetterGrade())
    const currentAverage = studentObj.getAverage();
    if(currentAverage>=highestAverage){
        highestAverage = currentAverage;
        topStudent =studentObj;
    }
    const[marks1,marks2,...remaining]=students.scores
     const result = studentObj.summary();
 const resultStatus =studentObj.getAverage()>=60?"PASS":"FAIL";
 const Grade =studentObj.getLetterGrade();
 const resultRemark =studentObj.getRemark(Grade);
  console.log(`
    ==========REPORT CARD=========
    Student Name : ${studentObj.name}
    Scores:${studentObj.scores.join(",")}
    Highest:${result.highest}
    Lowest:${result.lowest}
    First Score:${marks1}
    Second Score :${marks2}
    Remaining marks:${remaining.join(",")}
    Total:${studentObj.getTotal()}
    Average:${studentObj.getAverage().toFixed(1)}
    Grade:${studentObj.getLetterGrade()}
    Remark:${resultRemark}
    Status:${resultStatus}
    ============================
    `)

}
console.log(`
    ==========TOP PERFORMER ========
    NAME:${topStudent.name};
    AVERAGE:${topStudent.getAverage().toFixed(1)};
    `)


