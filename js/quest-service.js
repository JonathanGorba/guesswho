var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const STORAGE_KEY = 'questTreeDB';

function createQuestsTree() {
    gQuestsTree = loadFromStorage(STORAGE_KEY);
    if (!gQuestsTree) {
        gQuestsTree = createQuest('Male?');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');
    }
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = (res === 'yes') ? gCurrQuest.yes : gCurrQuest.no;
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
    // TODO: Create and Connect the 2 Quests to the quetsions tree
    var newQuest = createQuest(newQuestTxt);
    var newGuess = createQuest(newGuessTxt);
    newQuest.no = gCurrQuest;
    newQuest.yes = newGuess;
    gPrevQuest[lastRes] = newQuest;
    saveToStorage(STORAGE_KEY, gQuestsTree);
}

function getCurrQuest() {
    return gCurrQuest
}

function gameRestart(){
    createQuestsTree();
}