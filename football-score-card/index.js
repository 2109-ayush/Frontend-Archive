let rmaCount = 0;
let fcbCount = 0;
let rmaFouls = 0;
let fcbFouls = 0;

let rmaCountEl = document.getElementById('rma-count-el');
let fcbCountEl = document.getElementById('fcb-count-el');
let rmaFoulsEl = document.getElementById('rma-fouls');
let fcbFoulsEl = document.getElementById('fcb-fouls');

// RMA FUNCTIONS
function increment_by_one_rma() {
    rmaCount += 1;
    rmaCountEl.textContent = rmaCount;
}

function increment_by_two_rma() {
    rmaCount += 2;
    rmaCountEl.textContent = rmaCount;
}

function increment_by_three_rma() {
    rmaCount += 3;
    rmaCountEl.textContent = rmaCount;
}

function increment_foul_rma() {
    rmaFouls += 1;
    rmaFoulsEl.textContent = `FOULS: ${rmaFouls}`;
}

// FCB FUNCTIONS
function increment_by_one_fcb() {
    fcbCount += 1;
    fcbCountEl.textContent = fcbCount;
}

function increment_by_two_fcb() {
    fcbCount += 2;
    fcbCountEl.textContent = fcbCount;
}

function increment_by_three_fcb() {
    fcbCount += 3;
    fcbCountEl.textContent = fcbCount;
}

function increment_foul_fcb() {
    fcbFouls += 1;
    fcbFoulsEl.textContent = `FOULS: ${fcbFouls}`;
}

function new_game_reset() {
    rmaCount = 0;
    fcbCount = 0;
    rmaFouls = 0;
    fcbFouls = 0;
    rmaCountEl.textContent = rmaCount;
    fcbCountEl.textContent = fcbCount;
    rmaFoulsEl.textContent = `FOULS: ${rmaFouls}`;
    fcbFoulsEl.textContent = `FOULS: ${fcbFouls}`;
}
