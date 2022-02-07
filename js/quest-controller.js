'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing);
$('.btn-yes').click({ ans: 'yes' }, onUserResponse);
$('.btn-no').click({ ans: 'no' }, onUserResponse);
$('.btn-add-guess').click(onAddGuess);

function init() {
    console.log('Started...');
    createQuestsTree();
}

function onStartGuessing() {
    $('.game-start').hide();
    renderQuest();
    $('.quest').show();
}

function renderQuest() {
    $('.quest h2').text(getCurrQuest().txt);

}

function onUserResponse(ev) {
    var res = ev.data.ans;
    // If this node has no children
    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {
            // alert('Yes, I knew it!');
            modalPopout('Yes, I knew it!');
            // TODO: improve UX
            $('.quest').hide();
            onRestartGame();
        } else {
            // alert('I dont know...teach me!');
            modalPopout('I dont know...teach me!');
            $('.quest').hide();
            $('.new-quest').show();
        }
    } else {
        // TODO: update the lastRes global var
        gLastRes = res;
        moveToNextQuest(res);
        renderQuest();
    }
}

function onAddGuess(ev) {
    ev.preventDefault();
    var newGuess = $('#newGuess').val();
    var newQuest = $('#newQuest').val();

    // TODO: Get the inputs' values
    // TODO: Call the service addGuess
    addGuess(newQuest, newGuess, gLastRes);

    onRestartGame();
}

function onRestartGame() {
    $('.new-quest').hide();
    $('.game-start').show();
    gLastRes = null;
    gameRestart();
}

function modalPopout(txt) {
    var $modal = $('.modal');
    $('.modal h3').text(txt);
    $modal.css('top', '40vh');
    setTimeout(function(){$modal.css('top', '-7em');},2000)
}