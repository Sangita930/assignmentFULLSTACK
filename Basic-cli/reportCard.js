
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
// console.log(process.argv);
const args =process.argv.slice(2);
// console.log(args);
const name =args[0];
// console.log(name);
const marks = args.slice(1).map(Number);
// console.log(marks);
const[marks1,marks2,...remaining]=marks;
if(marks.length <3){
    console.log("Please enter at least 3 numbers.");
    process.exit(1);
}
 const student1 = new Student(name,marks);
 const result = student1.summary();
 const resultStatus =student1.getAverage()>=60?"PASS":"FAIL";
 const Grade =student1.getLetterGrade();
 const resultRemark =student1.getRemark(Grade);

//  console.log(student1.getTotal());
//  console.log(student1.getAverage());
//  console.log(student1.getLetterGrade());
  console.log(`
    ==========REPORT CARD=========
    Student Name : ${student1.name}
    Scores:${student1.scores.join(",")}
    Highest:${result.highest}
    Lowest:${result.lowest}
    First Score:${marks1}
    Second Score :${marks2}
    Remaining marks:${remaining.join(",")}
    Total:${student1.getTotal()}
    Average:${student1.getAverage().toFixed(1)}
    Grade:${student1.getLetterGrade()}
    Remark:${resultRemark}
    Status:${resultStatus}
    ============================
    `)
