export const RED = '#ff000c';
export const BLUE = '#0222f2';



export let mockMatchupsFactory = {
    0: {
        homeTeam : {
            name: 'red',
            color: RED
        },
        awayTeam : {
            name: 'blue',
            color: BLUE
        },
        home_score: 1,
        away_score: 0,
        final: false,
        match_time: 30,
        timer_running: false
    },
    1: {
        homeTeam : {
            name: 'red 2',
            color: RED
        },
        awayTeam : {
            name: 'blue 2',
            color: BLUE
        },
        home_score: 1,
        away_score: 0,
        final: true,
        match_time: 0,
        timer_running: false
    },
    $loaded: function(){return true;}
}