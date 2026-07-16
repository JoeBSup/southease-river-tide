/*
==========================================================
Southease River Tide v3.0
countdown.js

Displays a live countdown to the next tide event.
==========================================================
*/

const Countdown = {

    timer: null,

    targetTime: null,

    setTarget(timeString) {

        const parts = timeString.split(":");

        const target = new Date();

        target.setHours(parseInt(parts[0], 10));
        target.setMinutes(parseInt(parts[1], 10));
        target.setSeconds(0);
        target.setMilliseconds(0);

        // If today's time has already passed,
        // assume the event is tomorrow.
        if (target < new Date()) {
            target.setDate(target.getDate() + 1);
        }

        this.targetTime = target;

        this.start();

    },

    start() {

        if (this.timer) {
            clearInterval(this.timer);
        }

        this.update();

        this.timer = setInterval(() => {
            this.update();
        }, 1000);

    },

    update() {

        if (!this.targetTime) {
            return;
        }

        const now = new Date();

        let diff = Math.floor((this.targetTime - now) / 1000);

        if (diff <= 0) {

            document.getElementById("countdown").textContent =
                "Updating...";

            clearInterval(this.timer);

            return;
        }

        const hours = Math.floor(diff / 3600);

        diff %= 3600;

        const minutes = Math.floor(diff / 60);

        const seconds = diff % 60;

        document.getElementById("countdown").textContent =
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

    }

};
