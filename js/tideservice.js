/*
==========================================================
Southease River Tide v3.0
tideService.js

Provides Newhaven tide data.

Currently uses sample data.

Later this file will fetch live data from the UKHO API.
==========================================================
*/

const TideService = {

    getTodaysTides() {

        return {

            location: "Newhaven",

            date: new Date(),

            tides: [

                {
                    type: "High",
                    time: "03:18"
                },

                {
                    type: "Low",
                    time: "09:41"
                },

                {
                    type: "High",
                    time: "15:42"
                },

                {
                    type: "Low",
                    time: "22:08"
                }

            ]

        };

    }

};
