
// Game Settings / Start

let ko_current_mode = "2 PLAYER";
let ko_score_limit = 15;
let ko_game_started = false;

let ko_red_score = 0;
let ko_blue_score = 0;

let ko_red_temp_points = 0;
let ko_blue_temp_points = 0;

let ko_blue_hammer = "";
let ko_red_hammer = "";

let ko_red_status = "";
let ko_blue_status = "";

const ko_current_mode_display = document.getElementById("game-mode");
const ko_score_limit_display = document.getElementById("score-limit");

const ko_red_status_display = document.getElementById("red-status");
const ko_blue_status_display = document.getElementById("blue-status");

const ko_red_hammer_display = document.getElementById("red-hammer");
const ko_blue_hammer_display = document.getElementById("blue-hammer");

const ko_red_subtotal_display = document.getElementById("red-sub-total");
const ko_red_score_display = document.getElementById("red-score");

const ko_blue_subtotal_display = document.getElementById("blue-sub-total");
const ko_blue_score_display = document.getElementById("blue-score");

const ko_red_hc_13 = document.getElementById("red-hc-13");
const ko_red_hc_26 = document.getElementById("red-hc-26");

const ko_blue_hc_13 = document.getElementById("blue-hc-13");
const ko_blue_hc_26 = document.getElementById("blue-hc-26");

const ko_red_hc_4 = document.getElementById("red-hc-4");
const ko_blue_hc_4 = document.getElementById("blue-hc-4");

addEventListener("load", () => {
    load_game()
});


addEventListener("beforeunload", () => {
    save_game()
});


function save_game() {
    const ls = localStorage;
    ls.setItem("ko_game_saved", "true");

    ls.setItem("ko_current_mode",`${ko_current_mode}`);
    ls.setItem("ko_score_limit",`${ko_score_limit}`);
    ls.setItem("ko_game_started",`${ko_game_started}`);

    ls.setItem("ko_red_score",`${ko_red_score}`);
    ls.setItem("ko_blue_score",`${ko_blue_score}`);

    ls.setItem("ko_red_hammer", `${ko_red_hammer}`);
    ls.setItem("ko_blue_hammer", `${ko_blue_hammer}`);

    ls.setItem("ko_red_status", `${ko_red_status}`);
    ls.setItem("ko_blue_status", `${ko_blue_status}`);
    
    ls.setItem("ko_red_temp_points", `${ko_red_temp_points}`);
    ls.setItem("ko_blue_temp_points", `${ko_blue_temp_points}`);

}


function load_game() {
    const ls = localStorage;

    const ko_game_saved = ls.getItem('ko_game_saved');

    if (ko_game_saved === null) return;

    ko_current_mode = ls.getItem("ko_current_mode");
    ko_current_mode_display.textContent = ko_current_mode;

    ko_game_started = ls.getItem("ko_game_started") === 'true';
    
    if (ko_game_started) {
        ko_score_limit = parseInt(ls.getItem("ko_score_limit"));
        ko_score_limit_display.textContent = ko_score_limit + " - PLAY!";
        
    } else {
        ko_score_limit = parseInt(ls.getItem("ko_score_limit"));
        ko_score_limit_display.textContent = ko_score_limit + " - READY?";
    }

    ko_red_score = parseInt(ls.getItem("ko_red_score"));
    ko_red_score_display.textContent = ko_red_score;

    ko_blue_score = parseInt(ls.getItem("ko_blue_score"));
    ko_blue_score_display.textContent = ko_blue_score;

    ko_red_hammer = ls.getItem("ko_red_hammer");
    ko_red_hammer_display.textContent = ko_red_hammer;

    ko_blue_hammer = ls.getItem("ko_blue_hammer");
    ko_blue_hammer_display.textContent = ko_blue_hammer;

    ko_red_status = ls.getItem("ko_red_status");
    ko_red_status_display.textContent = ko_red_status;
    
    ko_blue_status = ls.getItem("ko_blue_status");
    ko_blue_status_display.textContent = ko_blue_status;
    
    ko_red_temp_points = parseInt(ls.getItem("ko_red_temp_points"));
    ko_red_subtotal_display.textContent = ko_red_temp_points;

    ko_blue_temp_points = parseInt(ls.getItem("ko_blue_temp_points"));
    ko_blue_subtotal_display.textContent = ko_blue_temp_points;
    
}


function change_game_mode() {
    if (ko_game_started) ko_game_started = false;

    ko_red_hammer = "";
    ko_blue_hammer = "";

    ko_red_hammer_display.textContent = ko_red_hammer;
    ko_blue_hammer_display.textContent = ko_blue_hammer;

    ko_red_score = 0;
    ko_blue_score = 0;

    ko_red_score_display.textContent = ko_red_score;
    ko_blue_score_display.textContent = ko_blue_score;

    ko_red_status = "";
    ko_blue_status = "";

    ko_red_status_display.textContent = ko_red_status;
    ko_blue_status_display.textContent = ko_blue_status;

    if (ko_current_mode === "2 PLAYER") {
        ko_current_mode = "4 PLAYER";
        ko_current_mode_display.textContent = ko_current_mode;

        ko_score_limit = 21;
        ko_score_limit_display.textContent = ko_score_limit.toString() + " - READY?";
    }

    else if (ko_current_mode === "4 PLAYER") {
        ko_current_mode = "Horse Collar";
        ko_current_mode_display.textContent = ko_current_mode;

        ko_red_hc_13.className = "red-btn";
        ko_red_hc_26.className = "red-btn";

        ko_blue_hc_13.className = "blue-btn";
        ko_blue_hc_26.className = "blue-btn";

        ko_blue_hc_4.className = "blue-btn-disabled";
        ko_red_hc_4.className = "red-btn-disabled";

        ko_score_limit = 52;
        ko_score_limit_display.textContent = ko_score_limit.toString() + " - READY?";
    }

    else if (ko_current_mode === "Horse Collar") {
        ko_current_mode = "2 PLAYER";
        ko_current_mode_display.textContent = ko_current_mode;

        ko_red_hc_13.className = "red-btn-disabled";
        ko_red_hc_26.className = "red-btn-disabled";
        ko_blue_hc_13.className = "blue-btn-disabled";
        ko_blue_hc_26.className = "blue-btn-disabled";

        ko_blue_hc_4.className = "blue-btn";
        ko_red_hc_4.className = "red-btn";

        ko_score_limit = 15;
        ko_score_limit_display.textContent = ko_score_limit.toString() + " - READY?";
    }
}

// This uses the Math.random to randomly select who starts and who gets the hammer
function select_who_starts() {
    let random = Math.floor(Math.random() * 2)

    if (random === 0) {
        ko_red_hammer = "STARTS";
        ko_blue_hammer = "HAMMER";


        ko_red_hammer_display.textContent = ko_red_hammer;
        ko_blue_hammer_display.textContent = ko_blue_hammer;

    } else {
        ko_red_hammer = "HAMMER";
        ko_blue_hammer = "STARTS";


        ko_red_hammer_display.textContent = ko_red_hammer;
        ko_blue_hammer_display.textContent = ko_blue_hammer;
    }
}


function start_game() {
    if (ko_game_started) {
        ko_game_started = false;

        ko_score_limit_display.textContent = ko_score_limit.toString() + " - READY?";

        ko_red_score = 0;
        ko_blue_score = 0;

        ko_blue_score_display.textContent = ko_blue_score;
        ko_red_score_display.textContent = ko_red_score;

        ko_red_hammer = "";
        ko_blue_hammer = "";

        ko_red_hammer_display.textContent = ko_red_hammer;
        ko_blue_hammer_display.textContent = ko_blue_hammer;

    } else if (ko_red_status != "") {
        ko_red_hammer = "";
        ko_blue_hammer = "";

        ko_red_hammer_display.textContent = ko_red_hammer;
        ko_blue_hammer_display.textContent = ko_blue_hammer;

        ko_red_score = 0;
        ko_blue_score = 0;

        ko_blue_score_display.textContent = ko_blue_score;
        ko_red_score_display.textContent = ko_red_score;

        ko_score_limit_display.textContent = ko_score_limit.toString() + " - READY?";

    } else {
        select_who_starts()
    
        ko_game_started = true;
    
        ko_score_limit_display.textContent = ko_score_limit.toString() + " - PLAY!";

    } 

    ko_red_status = "";
    ko_blue_status = "";

    ko_red_status_display.textContent = ko_red_status;
    ko_blue_status_display.textContent = ko_blue_status;

}

// Red Team Status 

function red_add_points(amount) {
    if (ko_game_started === false) return;

    if (amount === 13 || amount === 26) {
        if (ko_current_mode !== "Horse Collar") return;
    } else if (amount === 4) {
        if (ko_current_mode === "Horse Collar") return;
    }

    ko_red_temp_points += amount;
    ko_red_subtotal_display.textContent = ko_red_temp_points;

}

function red_clear() {
    if (ko_game_started === false) return;

    ko_red_temp_points = 0;
    ko_red_subtotal_display.textContent = "0";
}

function red_enter() {
    if (ko_game_started === false) return;
    if (ko_red_temp_points === 0) return;

    ko_red_score += parseInt(ko_red_subtotal_display.textContent);
    ko_red_score_display.textContent = ko_red_score.toString();

    if (ko_red_score >= ko_score_limit) {
        ko_red_status = "WINNER!";
        ko_blue_status = "GAME OVER!";


        ko_red_status_display.textContent = ko_red_status;
        ko_blue_status_display.textContent = ko_blue_status;

        ko_game_started = false;
    }
    
    ko_red_hammer = "STARTS";
    ko_blue_hammer = "HAMMER";

    ko_red_hammer_display.textContent = ko_red_hammer;
    ko_blue_hammer_display.textContent = ko_blue_hammer;

    ko_red_subtotal_display.textContent = "0";
    ko_red_temp_points = 0;
}

// Blue Team / Guest status 

function blue_add_points(amount) {
    if (ko_game_started === false) return;

    if (amount === 13 || amount === 26) {
        if (ko_current_mode !== "Horse Collar") return;
    } else if (amount === 4) {
        if (ko_current_mode === "Horse Collar") return;
    }


    ko_blue_temp_points += amount;
    ko_blue_subtotal_display.textContent = ko_blue_temp_points;
}

function blue_clear() {
    if (ko_game_started === false) return;

    ko_blue_temp_points = 0;
    ko_blue_subtotal_display.textContent = 0;
}

function blue_enter() {
    if (ko_game_started === false) return;
    if (ko_blue_temp_points === 0) return;

    ko_blue_score += parseInt(ko_blue_subtotal_display.textContent);
    ko_blue_score_display.textContent = ko_blue_score.toString();

    if (ko_blue_score >= ko_score_limit) {
        ko_blue_status = "WINNER";
        ko_red_status = "GAME OVER";


        ko_blue_status_display.textContent = ko_blue_status;
        ko_red_status_display.textContent = ko_red_status;

        ko_game_started = false;
    }

    ko_blue_hammer = "STARTS";
    ko_red_hammer = "HAMMER";

    ko_blue_hammer_display.textContent = ko_blue_hammer;
    ko_red_hammer_display.textContent = ko_red_hammer;


    ko_blue_temp_points = 0;
    ko_blue_subtotal_display.textContent = "0";
}
