// River calculation for Southease.
//
// Assumptions:
//
// Flood reaches Southease 3 hours after Newhaven High Water.
// Ebb reaches Southease 1 hour after Newhaven High Water.
//
// (We'll refine this logic later.)

function getRiverState() {

    return {

        state: "Flood Tide",

        nextChange: "18:42",

        paddling: true

    };

}
