window.onload = function () {

    const tides = getTodaysTides();
    const river = getRiverState();

    document.getElementById("nextTide").innerHTML =
        "<strong>Next High Water</strong><br>" +
        tides.highWater;

    document.getElementById("tides").innerHTML =
        "▲ High Water " + tides.highWater +
        "<br><br>" +
        "▼ Low Water " + tides.lowWater;

    document.getElementById("state").innerHTML =
        "<strong>" + river.state + "</strong><br>" +
        "Next change: " + river.nextChange;

};
