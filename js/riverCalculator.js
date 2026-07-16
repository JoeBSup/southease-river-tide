/*
==========================================================
Southease River Tide v3.0
riverCalculator.js
==========================================================
*/

const RiverCalculator = {

    HIGH_OFFSET: 3,
    LOW_OFFSET: 1,

    addHours(timeString, hours) {

        const [h, m] = timeString.split(":").map(Number);

        const date = new Date();

        date.setHours(h, m, 0, 0);

        date.setHours(date.getHours() + hours);

        return date;

    },

    formatTime(date) {

        return date.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
        });

    },

    calculateSoutheaseTides(newhavenData) {

        return newhavenData.tides.map(tide => {

            const offset =
                tide.type === "High"
                    ? this.HIGH_OFFSET
                    : this.LOW_OFFSET;

            const date = this.addHours(tide.time, offset);

            return {

                type: tide.type,
                date: date,
                time: this.formatTime(date)

            };

        });

    },

    getNextEvent(tides) {

        const now = new Date();

        for (const tide of tides) {

            if (tide.date > now) {
                return tide;
            }

        }

        const tomorrow = new Date(tides[0].date);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return {
            type: tides[0].type,
            date: tomorrow,
            time: this.formatTime(tomorrow)
        };

    },

    getNextByType(tides, type) {

        const now = new Date();

        for (const tide of tides) {

            if (tide.type === type && tide.date > now) {
                return tide;
            }

        }

        // First matching tide tomorrow
        const first = tides.find(t => t.type === type);

        const tomorrow = new Date(first.date);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return {

            type: first.type,
            date: tomorrow,
            time: this.formatTime(tomorrow)

        };

    },

    getRiverState(nextEvent) {

        return nextEvent.type === "High"
            ? "🌊 Flood Tide"
            : "🌊 Ebb Tide";

    },

    calculate(newhavenData) {

        const southeaseTides =
            this.calculateSoutheaseTides(newhavenData);

        const nextEvent =
            this.getNextEvent(southeaseTides);

        const nextHigh =
            this.getNextByType(southeaseTides, "High");

        const nextLow =
            this.getNextByType(southeaseTides, "Low");

        return {

            southeaseTides,

            southeaseHigh: nextHigh.time,

            southeaseLow: nextLow.time,

            nextEvent: nextEvent.type,

            nextTime: nextEvent.time,

            nextDate: nextEvent.date,

            riverState: this.getRiverState(nextEvent)

        };

    }

};
