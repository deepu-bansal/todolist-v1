module.exports=getdate;

function getdate(){
let today = new Date();
let date = today.toLocaleDateString("en-US");
return date;
}

// console.log(getdate());

