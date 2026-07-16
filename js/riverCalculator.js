/*
==========================================================
Southease River Tide v3.0
riverCalculator.js

Converts Newhaven tide predictions into Southease tide
predictions and determines the current river state.
==========================================================
*/

const RiverCalculator = {

    HIGH_OFFSET: 3, // hours
    LOW_OFFSET: 1,  // hours

    addHours(timeString, hours) {

        const parts = timeString.split(":");

        const date = new Date();

        date.setHours(parseInt(parts[0], 10));
        date.setMinutes(parseInt(parts[1], 10));
        date.setSeconds(0);
        date.setMilliseconds(0);

        date.setHours(date.getHours() + hours);

        return this.formatTime(date);

    },

    formatTime(date) {

        return date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

    },

    timeToDate(timeString) {

        const parts = timeString.split(":");

        const date = new Date();

        date.setHours(parseInt(parts[0], 10));
        date.setMinutes(parseInt(parts[1], 10));
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;

    },

    calculateSoutheaseTides(newhavenData) {

        const southease = [];

        newhavenData.tides.forEach(tide => {

            const offset =
                tide.type === "High"
                    ? this.HIGH_OFFSET
                    : this.LOW_OFFSET;

            southease.push({

                type: tide.type,

                originalTime: tide.time,

                time: this.addHours(tide.time, offset)

            });

        });

        return southease;

    },

    getCurrentState(southeaseTides) {

        const now = new Date();

        let previous = null;
        let next = null;

        for (const tide of southeaseTides) {

            const tideTime = this.timeToDate(tide.time);

            if (tideTime <= now) {

                previous = tide;

            }

            if (tideTime > now) {

                next = tide;
                break;

            }

        }

        // Before first tide today
        if (!previous) {

            previous = southeaseTides[southeaseTides.length - 1];

        }

        // After last tide today
        if (!next) {

            next = southeaseTides[0];

        }

        return {

            currentState:
                previous.type === "Low"
                    ? "🌊 Flood Tide"
                    : "🌊 Ebb Tide",

            nextEvent:
                next.type + " Water",

            nextTime:
                next.time,

            previous,

            next

        };

    },

    calculate(newhavenData) {

        const southeaseTides =
            this.calculateSoutheaseTides(newhavenData);

        const state =
            this.getCurrentState(southeaseTides);

        return {

            southeaseTides,

            state

        };

    }

};
