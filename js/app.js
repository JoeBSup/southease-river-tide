/*
==========================================================
Southease River Tide v3.0
app.js

Main application controller.
==========================================================
*/

document.addEventListener("DOMContentLoaded", initialise);

function initialise() {

    console.log("Southease River Tide v3.0");

    const newhaven = TideService.getTodaysTides();

    const river = RiverCalculator.calculate(newhaven);

    displayRiver(river);

    displayNewhaven(newhaven);

    Countdown.setTarget(river.nextTime);

    registerServiceWorker();

}

function displayRiver(river) {

    document.getElementById("riverState").textContent =
        river.riverState;

    document.getElementById("nextEvent").textContent =
        `${river.nextEvent} Water - ${river.nextTime}`;

    document.getElementById("southeaseHigh").textContent =
        river.southeaseHigh;

    document.getElementById("southeaseLow").textContent =
        river.southeaseLow;

}

function displayNewhaven(data) {

    const highs = data.tides.filter(t => t.type === "High");

    const lows = data.tides.filter(t => t.type === "Low");

    document.getElementById("newhavenHigh").textContent =
        highs[0].time;

    document.getElementById("newhavenLow").textContent =
        lows[0].time;

}

function registerServiceWorker() {

    if (!("serviceWorker" in navigator)) {
        return;
    }

    navigator.serviceWorker
        .register("./service-worker.js")
        .then(() => {

            console.log("Service Worker registered");

        })
        .catch(error => {

            console.error("Service Worker failed", error);

        });

}
