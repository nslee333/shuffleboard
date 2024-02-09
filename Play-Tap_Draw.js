// Game variables.

let td_current_mode = "Tap & Draw";
let td_score_limit = 15;
let td_game_started = false;

let td_red_score = 0;
let td_blue_score = 0;

let td_red_temp_points = 0;
let td_blue_temp_points = 0;

let td_red_temp_array = [];
let td_blue_temp_array = [];

let td_blue_hammer = "";
let td_red_hammer = "";

let td_red_status = "";
let td_blue_status = "";

let td_blue_scored = 0;
let td_red_scored = 0;

const td_current_mode_display = document.getElementById("game-mode");
const td_score_limit_display = document.getElementById("score-limit");

const td_red_status_display = document.getElementById("red-status");
const td_blue_status_display = document.getElementById("blue-status");

const td_red_hammer_display = document.getElementById("red-hammer");
const td_blue_hammer_display = document.getElementById("blue-hammer");

const td_red_subtotal_display = document.getElementById("red-sub-total");
const td_red_score_display = document.getElementById("red-score");

const td_blue_subtotal_display = document.getElementById("blue-sub-total");
const td_blue_score_display = document.getElementById("blue-score");

const td_red_hc_13 = document.getElementById("red-hc-13");
const td_red_hc_26 = document.getElementById("red-hc-26");

const td_blue_hc_13 = document.getElementById("blue-hc-13");
const td_blue_hc_26 = document.getElementById("blue-hc-26");

const td_red_hc_4 = document.getElementById("red-hc-4");
const td_blue_hc_4 = document.getElementById("blue-hc-4");


addEventListener("load", () => {
    load_game()
});


addEventListener("beforeunload", () => {
    save_game()
});

// Utilities related to the game.

function save_game() {
    const ls = localStorage;
    ls.setItem("td_game_saved", "true");

    ls.setItem("td_current_mode",`${td_current_mode}`);
    ls.setItem("td_score_limit",`${td_score_limit}`);
    ls.setItem("td_game_started",`${td_game_started}`);

    ls.setItem("td_red_score",`${td_red_score}`);
    ls.setItem("td_blue_score",`${td_blue_score}`);

    ls.setItem("td_red_hammer", `${td_red_hammer}`);
    ls.setItem("td_blue_hammer", `${td_blue_hammer}`);

    ls.setItem("td_red_status", `${td_red_status}`);
    ls.setItem("td_blue_status", `${td_blue_status}`);
    
    ls.setItem("td_red_temp_points", `${td_red_temp_points}`);
    ls.setItem("td_blue_temp_points", `${td_blue_temp_points}`);

}


function load_game() {
    const ls = localStorage;

    const td_game_saved = ls.getItem('td_game_saved');

    if (td_game_saved === null) return;

    td_current_mode = ls.getItem("td_current_mode");
    td_current_mode_display.textContent = td_current_mode;

    td_game_started = ls.getItem("td_game_started") === 'true';
    
    if (td_game_started) {
        td_score_limit = parseInt(ls.getItem("td_score_limit"));
        td_score_limit_display.textContent = td_score_limit + " - PLAY!";
        
    } else {
        td_score_limit = parseInt(ls.getItem("td_score_limit"));
        td_score_limit_display.textContent = td_score_limit + " - READY?";
    }

    td_red_score = parseInt(ls.getItem("td_red_score"));
    td_red_score_display.textContent = td_red_score;

    td_blue_score = parseInt(ls.getItem("td_blue_score"));
    td_blue_score_display.textContent = td_blue_score;

    td_red_hammer = ls.getItem("td_red_hammer");
    td_red_hammer_display.textContent = td_red_hammer;

    td_blue_hammer = ls.getItem("td_blue_hammer");
    td_blue_hammer_display.textContent = td_blue_hammer;

    td_red_status = ls.getItem("td_red_status");
    td_red_status_display.textContent = td_red_status;
    
    td_blue_status = ls.getItem("td_blue_status");
    td_blue_status_display.textContent = td_blue_status;
    
    td_red_temp_points = parseInt(ls.getItem("td_red_temp_points"));
    td_red_subtotal_display.textContent = td_red_temp_points;

    td_blue_temp_points = parseInt(ls.getItem("td_blue_temp_points"));
    td_blue_subtotal_display.textContent = td_blue_temp_points;
    
}


function change_game_mode() {
    if (td_game_started) td_game_started = false;

    td_red_hammer = "";
    td_blue_hammer = "";

    td_red_hammer_display.textContent = td_red_hammer;
    td_blue_hammer_display.textContent = td_blue_hammer;

    td_red_score = 0;
    td_blue_score = 0;

    td_red_score_display.textContent = td_red_score;
    td_blue_score_display.textContent = td_blue_score;

    td_red_status = "";
    td_blue_status = "";

    td_red_status_display.textContent = td_red_status;
    td_blue_status_display.textContent = td_blue_status;
    
    if (td_score_limit === 15) {

        td_red_hc_13.className = "red-btn";
        td_red_hc_26.className = "red-btn";

        td_blue_hc_13.className = "blue-btn";
        td_blue_hc_26.className = "blue-btn";

        td_blue_hc_4.className = "blue-btn-disabled";
        td_red_hc_4.className = "red-btn-disabled";

        td_score_limit = 51;
        td_score_limit_display.textContent = td_score_limit.toString() + " - READY?";

    } else if (td_score_limit === 51) {

        td_red_hc_13.className = "red-btn-disabled";
        td_red_hc_26.className = "red-btn-disabled";
        td_blue_hc_13.className = "blue-btn-disabled";
        td_blue_hc_26.className = "blue-btn-disabled";

        td_blue_hc_4.className = "blue-btn";
        td_red_hc_4.className = "red-btn";

        td_score_limit = 15;
        td_score_limit_display.textContent = td_score_limit.toString() + " - READY?";
    }
}

// This uses the Math.random to randomly select who starts and who gets the hammer
function select_who_starts() {
    let random = Math.floor(Math.random() * 2)

    if (random === 0) {
        td_red_hammer = "STARTS";
        td_blue_hammer = "HAMMER";


        td_red_hammer_display.textContent = td_red_hammer;
        td_blue_hammer_display.textContent = td_blue_hammer;

    } else {
        td_red_hammer = "HAMMER";
        td_blue_hammer = "STARTS";


        td_red_hammer_display.textContent = td_red_hammer;
        td_blue_hammer_display.textContent = td_blue_hammer;
    }
}


function start_game() {
    if (td_game_started) {
        td_game_started = false;

        td_score_limit_display.textContent = td_score_limit.toString() + " - READY?";

        td_red_score = 0;
        td_blue_score = 0;

        td_blue_score_display.textContent = td_blue_score;
        td_red_score_display.textContent = td_red_score;

        td_red_hammer = "";
        td_blue_hammer = "";

        td_red_hammer_display.textContent = td_red_hammer;
        td_blue_hammer_display.textContent = td_blue_hammer;

    } else if (td_red_status != "") {
        td_red_hammer = "";
        td_blue_hammer = "";

        td_red_hammer_display.textContent = td_red_hammer;
        td_blue_hammer_display.textContent = td_blue_hammer;

        td_red_score = 0;
        td_blue_score = 0;

        td_blue_score_display.textContent = td_blue_score;
        td_red_score_display.textContent = td_red_score;

        td_score_limit_display.textContent = td_score_limit.toString() + " - READY?";

    } else {
        select_who_starts()
    
        td_game_started = true;
    
        td_score_limit_display.textContent = td_score_limit.toString() + " - PLAY!";

    } 

    td_red_status = "";
    td_blue_status = "";

    td_red_status_display.textContent = td_red_status;
    td_blue_status_display.textContent = td_blue_status;

}

function determine_winner(who_scored) {
    if (td_red_score < td_score_limit && td_blue_score < td_score_limit) return;

    if (who_scored === "blue") {
        td_blue_scored += 1;
        
    } else if (who_scored === "red") {
        td_red_scored += 1;
    } 
    
    if (td_blue_scored === 1 && td_red_scored === 1) {
        set_winner()
    } else if (td_blue_scored === 2 && td_red_scored === 0 ) {
        set_winner()
    } else if (td_blue_scored === 0 && td_red_scored === 2) {
        set_winner()
    }
}

function set_winner() {
    if (td_red_score >= td_score_limit && td_red_score > td_blue_score) {
        td_red_status = "WINNER!";
        td_blue_status = "GAME OVER!";


        td_red_status_display.textContent = td_red_status;
        td_blue_status_display.textContent = td_blue_status;

        td_game_started = false;
        td_blue_scored = 0;
        td_red_scored = 0;

    } else if (td_blue_score >= td_score_limit && td_blue_score > td_red_score) {
        td_blue_status = "WINNER!";
        td_red_status = "GAME OVER!";

        td_red_status_display.textContent = td_red_status;
        td_blue_status_display.textContent = td_blue_status;

        td_game_started = false;
        td_blue_scored = 0;
        td_red_scored = 0;

    } else if (td_blue_score === td_red_score) {
        td_blue_scored = 0;
        td_red_scored = 0;

    }
}


// Red Team Status 
function red_add_points(amount) {
    if (td_game_started === false) return;

    if (amount === 13 || amount === 26) {

        if (td_score_limit !== 51) return;

    } else if (amount === 4) {

        if (td_score_limit === 51) return;
    }

    td_red_temp_array.push(amount);

    td_red_temp_points += amount;
    td_red_subtotal_display.textContent = td_red_temp_points;

}

function check_for_minimum(array) {

    if (td_score_limit === 15) {

        for (let i = 0; i <= array.length; i++) {

            if (array[i] === 3 || array[i] === 4) {
                return true;
            }
        }

    } else if (td_score_limit === 51) {
        for (let i = 0; i <= array.length; i++) {

            if (array[i] === 13 || array[i] === 26) {
                return true;
            }
        }

    }
    return false;
}


function red_clear() {
    if (td_game_started === false) return;

    td_red_temp_points = 0;
    td_red_subtotal_display.textContent = "0";
    td_red_temp_array = [];
}

function red_enter() {
    if (td_game_started === false) return;
    if (td_red_temp_points === 0) return;

    const check = check_for_minimum(td_red_temp_array)
    td_red_temp_array = [];

    if (check === false) {
        td_red_subtotal_display.textContent = "0";
        td_red_temp_points = 0;

        return;
    };

    td_red_score += parseInt(td_red_subtotal_display.textContent);
    td_red_score_display.textContent = td_red_score.toString();

    
    determine_winner("red")

    td_red_hammer = "STARTS";
    td_blue_hammer = "HAMMER";

    td_red_hammer_display.textContent = td_red_hammer;
    td_blue_hammer_display.textContent = td_blue_hammer;

    td_red_subtotal_display.textContent = "0";
    td_red_temp_points = 0;
}

// Blue Team / Guest status 

function blue_add_points(amount) {
    if (td_game_started === false) return;

    if (amount === 13 || amount === 26) {
        if (td_score_limit !== 51) return;

    } else if (amount === 4) {
        if (td_score_limit === 51) return;
    }

    td_blue_temp_array.push(amount);

    td_blue_temp_points += amount;
    td_blue_subtotal_display.textContent = td_blue_temp_points;
}

function blue_clear() {
    if (td_game_started === false) return;

    td_blue_temp_points = 0;
    td_blue_subtotal_display.textContent = 0;
    td_blue_temp_array = [];
}

function blue_enter() {
    if (td_game_started === false) return;
    if (td_blue_temp_points === 0) return;

    const check = check_for_minimum(td_blue_temp_array);
    td_blue_temp_array = [];

    if (check === false)  {

        td_blue_temp_points = 0;
        td_blue_subtotal_display.textContent = "0";
        
        return;
    }


    td_blue_score += parseInt(td_blue_subtotal_display.textContent);
    td_blue_score_display.textContent = td_blue_score.toString();

    determine_winner("blue")

    td_blue_hammer = "STARTS";
    td_red_hammer = "HAMMER";

    td_blue_hammer_display.textContent = td_blue_hammer;
    td_red_hammer_display.textContent = td_red_hammer;


    td_blue_temp_points = 0;
    td_blue_subtotal_display.textContent = "0";
}
