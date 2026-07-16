function calculate(){

let type =
document.getElementById("type").value;


let time =
document.getElementById("time").value;


let date = new Date();

let parts=time.split(":");

date.setHours(parts[0]);
date.setMinutes(parts[1]);


if(type==="high"){

date.setHours(date.getHours()+1);

}
else {

date.setHours(date.getHours()-3);

}


let result =
date.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
});


document.getElementById("output").innerHTML =
result +
"<br><small>Southease tide time</small>";

}