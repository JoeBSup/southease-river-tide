/*
==========================================================
Southease River Tide v3.0
app.js
Main application controller
==========================================================
*/

document.addEventListener("DOMContentLoaded", initialise);

function initialise() {

    console.log("Southease River Tide v3.0");

    const newhaven = TideService.getTodaysTides();

    const river = RiverCalculator.calculate(newhaven);

    displayRiver(river);

    displayTideTables(newhaven, river);

    Countdown.setTarget(river.nextTime);

    registerServiceWorker();

}

function displayRiver(river) {

    document.getElementById("riverState").textContent =
        river.riverState;

    document.getElementById("nextEvent").textContent =
        `Next ${river.nextEvent} Water - ${river.nextTime}`;

}

function displayTideTables(newhaven, river) {

    // Southease table
    const southeaseHTML = river.southeaseTides
        .map(tide => {

            const symbol =
                tide.type === "High"
                    ? "▲"
                    : "▼";

            return `
                <tr>
                    <td>${symbol} ${tide.type}</td>
                    <td>${tide.time}</td>
                </tr>
            `;

        })
        .join("");

    document.getElementById("southeaseHigh")
        .parentElement
        .parentElement
        .innerHTML = southeaseHTML;


    // Newhaven table
    const newhavenHTML = newhaven.tides
        .map(tide => {

            const symbol =
                tide.type === "High"
                    ? "▲"
                    : "▼";

            return `
                <tr>
                    <td>${symbol} ${tide.type}</td>
                    <td>${tide.time}</td>
                </tr>
            `;

        })
        .join("");

    document.getElementById("newhavenHigh")
        .parentElement
        .parentElement
        .innerHTML = newhavenHTML;

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

            console.error(error);

        });

}
