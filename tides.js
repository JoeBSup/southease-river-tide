let tides=[];


function southeaseTime(time,type){

let d=new Date();

let p=time.split(":");

d.setHours(
Number(p[0]),
Number(p[1])
);


if(type==="high"){

d.setHours(
d.getHours()+1
);

}
else {

d.setHours(
d.getHours()-3
);

}


return d.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
);

}



function renderTides(){

let box=document.getElementById("tides");

box.innerHTML="";


tides.forEach(t=>{


box.innerHTML += `

<div class="tide">

<b>${t.type}</b><br>

Newhaven:
${t.time}

<br>

Southease:
${southeaseTime(
t.time,
t.raw
)}

</div>

`;

});


}



function addTide(){

let type=
document.getElementById("type").value;


let time=
document.getElementById("newhaven").value;


if(!time)return;


tides.push({

type:
type==="high"
?
"⬆ High Water"
:
"⬇ Low Water",

raw:type,

time:time

});


renderTides();

}