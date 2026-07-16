window.onload = function () {

    const tides = getTodaysTides();

    document.getElementById("nextTide").innerHTML =
        "<strong>" + tides[0].type + "</strong><br>" + tides[0].time;

    document.getElementById("tides").innerHTML =
        "▲ " + tides[0].type + " " + tides[0].time +
        "<br><br>" +
        "▼ " + tides[1].type + " " + tides[1].time;

    document.getElementById("state").textContent =
        "Flood Tide";

};
