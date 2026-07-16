function updateNextTide(){

    const next =
    document.getElementById("nextTide");


    let now = new Date();


    let upcoming = [];


    newhavenTides.forEach(t => {


        let d = new Date();

        let parts =
        t.time.split(":");


        d.setHours(
            parts[0],
            parts[1],
            0
        );


        if(d > now){

            upcoming.push({
                name:t.type,
                time:d
            });

        }

    });


    if(upcoming.length===0){

        next.innerHTML =
        "Tomorrow's tides";

        return;

    }


    upcoming.sort(
        (a,b)=>a.time-b.time
    );


    let tide =
    upcoming[0];


    let minutes =
    Math.floor(
        (tide.time-now)/60000
    );


    next.innerHTML = `

    ${tide.name}

    <br>

    ${tide.time.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    })}

    <br>

    <small>
    in ${minutes} minutes
    </small>

    `;

}
