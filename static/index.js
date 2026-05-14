/*
Multiline comment in JS
*/
var game_status = []; // [0]=win status; [1]=turn number; [2]=next row enable; [3]=submit enable
const MAX_COLORS = 10;
var color_changer = 0;
var board_colors = [];
var ans_key = [];

init_color_board();
ans_key = generate_answer_key();


function init_color_board() {
    var temp, i, j;
    for (i=0; i<9; i++) {
        temp = [];
        for(j=0; j<4; j++) {
            temp[j] = 0;
        }
        board_colors[i] = temp;
    }
    game_status[0] = 0
    game_status[1] = 1
    game_status[2] = 1
    game_status[3] = 0
}

function generate_answer_key() {
    answer = []
    for (var i = 0; i < 4; i++) {
        answer[i] = getRandomInt(1,11)
    }
    // return [1,2,3,4]
    return answer
}

// min is inclusive, max is not
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const actionPegs = document.querySelector('#mmTable');

actionPegs.addEventListener('click', function (x) {
    if (x.target.classList.contains('tpeg')) {
        getRowColumnDetails();
    }
});

function analyzeRow() {
    // disable function if player has won or used all of their turns 
    // or has not added the next row after a submit
    if (game_status[0] == 1 || game_status[1] > 9 || game_status[3] == 0) {
        return
    }
    // after a submit press: disable submit functionality until the next row has been added 
    game_status[2] = 1
    game_status[3] = 0

    // show next row button and remove submit button
    var submit = document.getElementById("submit")
    submit.classList.add("is-hidden")
    submit.classList.remove("is-visible")
    var nextrow = document.getElementById("nextrow")
    nextrow.classList.add("is-visible")
    nextrow.classList.remove("is-hidden")

    var table = document.getElementById("mmTable")
    var tbodyRowCount = table.tBodies[0].rows.length;
    cell = table.tBodies[0].rows[tbodyRowCount-1].cells;

    var xCount = 0
    var oCount = 0
    var xCol1 = 0
    var xCol2 = 0
    var xCol3 = 0
    var xCol4 = 0
    // set the temp answer key "key" equal to the master answer key
    key0 = ans_key[0]
    key1 = ans_key[1]
    key2 = ans_key[2]
    key3 = ans_key[3]

    // If guess is found in answer key, make that value 99 so it cannot be matched again
    // Check for exactly correct guesses
    if (board_colors[tbodyRowCount-2][0] == key0){
        xCount++;
        xCol1 = 1;
        key0 = 99;
    }
    if (board_colors[tbodyRowCount-2][1] == key1){
        xCount++;
        xCol2 = 1;
        key1 = 99;
    }
    if (board_colors[tbodyRowCount-2][2] == key2){
        xCount++;
        xCol3 = 1;
        key2 = 99;
    }
    if (board_colors[tbodyRowCount-2][3] == key3){
        xCount++;
        xCol4 = 1;
        key3 = 99;
    }
    // Check for Column 1 guessed number found in a different column
    if (xCol1 != 1){
        if (board_colors[tbodyRowCount-2][0] == key1){
            oCount++
            key1 = 99
        }
        else if (board_colors[tbodyRowCount-2][0] == key2){
            oCount++
            key2 = 99
        }
        else if (board_colors[tbodyRowCount-2][0] == key3){
            oCount++
            key3 = 99
        }
    }
    // Check for Column 2 guessed number found in a different column
    if (xCol2 != 1){
        if (board_colors[tbodyRowCount-2][1] == key0){
            oCount++
            key0 = 99
        }
        else if (board_colors[tbodyRowCount-2][1] == key2){
            oCount++
            key2 = 99
        }
        else if (board_colors[tbodyRowCount-2][1] == key3){
            oCount++
            key3 = 99
        }
    }
    // Check for Column 3 guessed number found in a different column
    if (xCol3 != 1){
        if (board_colors[tbodyRowCount-2][2] == key0){
            oCount++
            key0 = 99
        }
        else if (board_colors[tbodyRowCount-2][2] == key1){
            oCount++
            key1 = 99
        }
        else if (board_colors[tbodyRowCount-2][2] == key3){
            oCount++
            key3 = 99
        }
    }
    // Check for Column 4 guessed number found in a different column
    if (xCol4 != 1){
        if (board_colors[tbodyRowCount-2][3] == key0){
            oCount++
            key0 = 99
        }
        else if (board_colors[tbodyRowCount-2][3] == key1){
            oCount++
            key1 = 99
        }
        else if (board_colors[tbodyRowCount-2][3] == key2){
            oCount++
            key2 = 99
        }
    }
    // Populate the four clue columns with the number of X's and O's found
    if (xCount == 4){
        cell[4].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        cell[5].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        cell[6].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        cell[7].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        game_status[0] = 1
    }
    else if (xCount == 3){
        cell[4].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        cell[5].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        cell[6].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
    }
    else if (xCount == 2){
        cell[4].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        cell[5].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        if (oCount == 2){
            cell[6].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
            cell[7].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        }
        else if (oCount == 1){
            cell[6].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        }
    }
    else if (xCount == 1){
        cell[4].innerHTML = '<button class="rpegbk" style="visibility: visible;">x</button>'
        if (oCount == 3){
            cell[5].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
            cell[6].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
            cell[7].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        }
        else if (oCount == 2){
            cell[5].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
            cell[6].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        }
        else if (oCount == 1){
            cell[5].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        }
    }
    else if (oCount == 4){
        cell[4].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        cell[5].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        cell[6].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        cell[7].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
    }
    else if (oCount == 3){
        cell[4].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        cell[5].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        cell[6].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
    }
    else if (oCount == 2){
        cell[4].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
        cell[5].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
    }
    else if (oCount == 1){
        cell[4].innerHTML = '<button class="rpegwh" style="visibility: visible;">x</button>'
    }
    else {
        cell[4].innerHTML = '<button class="rpegx" style="visibility: visible;">x</button>'
        cell[5].innerHTML = '<button class="rpegx" style="visibility: visible;">x</button>'
        cell[6].innerHTML = '<button class="rpegx" style="visibility: visible;">x</button>'
        cell[7].innerHTML = '<button class="rpegx" style="visibility: visible;">x</button>'
    }

    // remove current row event listeners
    if (tbodyRowCount > 1) {
        prevCell0 = table.rows[tbodyRowCount-1].cells[0]
        prevCell1 = table.rows[tbodyRowCount-1].cells[1]
        prevCell2 = table.rows[tbodyRowCount-1].cells[2]
        prevCell3 = table.rows[tbodyRowCount-1].cells[3]
        prevCell0.removeEventListener('click', getRowColumnDetails)
        prevCell1.removeEventListener('click', getRowColumnDetails)
        prevCell2.removeEventListener('click', getRowColumnDetails)
        prevCell3.removeEventListener('click', getRowColumnDetails)
    }
    // increment turn
    game_status[1]++
    
    // check for win or lose condition
    if (game_status[0] == 1){
        addWin()
    }
    else if (game_status[1] > 9){
        addResult()
    }
}

function removeRow() {
    //reset the game table
    var table = document.getElementById("mmTable")
    var tbodyRowCount = table.tBodies[0].rows.length;
    for (var i = 0; i < tbodyRowCount - 1; i++) {
        table.deleteRow(-1)
    }
    //reset the end of game answer
    var table1 = document.getElementById("mmComment")
    var tbodyRowCount = table1.tBodies[0].rows.length;
    for (var j = 0; j < tbodyRowCount - 1; j++) {
        table1.deleteRow(-1)
    }
    //reset the end of game comment
    var result = document.getElementById("mmResult")
    result.innerHTML = ''
    //reset the color board and get new answer key
    init_color_board()
    ans_key = generate_answer_key();

    // show next row button and remove submit button
    var submit = document.getElementById("submit")
    submit.classList.add("is-hidden")
    submit.classList.remove("is-visible")
    var nextrow = document.getElementById("nextrow")
    nextrow.classList.add("is-hidden")
    nextrow.classList.remove("is-visible")
    var start = document.getElementById("start")
    start.classList.add("is-visible")
    start.classList.remove("is-hidden")
}

function addResult() {
    var result = document.getElementById("mmResult")
    result.innerHTML = '<h4>You lose. This is the correct answer:</h4>'
    // add answer
    var table = document.getElementById("mmComment")
    var row = table.insertRow(-1)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)
    var cell5 = row.insertCell(4)
    var cell6 = row.insertCell(5)
    var cell7 = row.insertCell(6)
    var cell8 = row.insertCell(7)
    cell1.innerHTML = get_color(ans_key[0])
    cell2.innerHTML = get_color(ans_key[1])
    cell3.innerHTML = get_color(ans_key[2])
    cell4.innerHTML = get_color(ans_key[3])
    cell5.innerHTML = '<button class="rpegx" style="visibility: hidden;">x</button>'
    cell6.innerHTML = '<button class="rpegx" style="visibility: hidden;">x</button>'
    cell7.innerHTML = '<button class="rpegx" style="visibility: hidden;">x</button>'
    cell8.innerHTML = '<button class="rpegx" style="visibility: hidden;">x</button>'
}

function addWin() {
    var result = document.getElementById("mmResult")
    result.innerHTML = '<h4>You win!</h4>'
}

function addRow() {
    // disable function if player has won or used all of their turns
    if (game_status[0] == 1 || game_status[1] > 9 || game_status[2] == 0) {
        return
    }

    var table = document.getElementById("mmTable")
    var row = table.insertRow(-1)
    var cell1 = row.insertCell(0)
    var cell2 = row.insertCell(1)
    var cell3 = row.insertCell(2)
    var cell4 = row.insertCell(3)
    var acell1 = row.insertCell(4)
    var acell2 = row.insertCell(5)
    var acell3 = row.insertCell(6)
    var acell4 = row.insertCell(7)
    cell1.innerHTML = '<button class="tpeg"></button>'
    cell2.innerHTML = '<button class="tpeg"></button>'
    cell3.innerHTML = '<button class="tpeg"></button>'
    cell4.innerHTML = '<button class="tpeg"></button>'
    acell1.innerHTML = '<button class="rpegx" style="visibility: hidden;">x</button>'
    acell2.innerHTML = '<button class="rpegx" style="visibility: hidden;">x</button>'
    acell3.innerHTML = '<button class="rpegx" style="visibility: hidden;">x</button>'
    acell4.innerHTML = '<button class="rpegx" style="visibility: hidden;">x</button>'

    cell1.addEventListener('click', getRowColumnDetails)
    cell2.addEventListener('click', getRowColumnDetails)
    cell3.addEventListener('click', getRowColumnDetails)
    cell4.addEventListener('click', getRowColumnDetails)

    // after a next row press: disable next row functionality until 
    // current row has been submitted 
    game_status[2] = 0
    game_status[3] = 1

    // show submit button and remove add row and start button
    var submit = document.getElementById("submit")
    submit.classList.add("is-visible")
    submit.classList.remove("is-hidden")
    var nextrow = document.getElementById("nextrow")
    nextrow.classList.add("is-hidden")
    nextrow.classList.remove("is-visible")
    var start = document.getElementById("start")
    start.classList.add("is-hidden")
    start.classList.remove("is-visible")
}

function getRowColumnDetails(event) {
    // Get the clicked button element
    const button = event.currentTarget;

    // Find the parent <td> (cell) containing the button
    const cell = button.closest('td'); 
    // closest('td') traverses up the DOM to find the nearest <td> ancestor

    if (!cell) {
        alert('No table cell found!');
        return;
    }

    // Find the parent <tr> (row) containing the cell
    const row = cell.closest('tr');

    if (!row) {
        alert('No table row found!');
        return;
    }

    // Get row index (0-based)
    const rowIndex = row.rowIndex - 1; 
    // Subtract 1 to exclude the <thead> row (since row.rowIndex includes it)

    // Get column index (0-based)
    const columnIndex = cell.cellIndex;

    // increment the color value in the master board colors array and change the button to the next tpeg type
    color_increment(rowIndex, columnIndex);
    button.innerHTML = get_color(board_colors[rowIndex][columnIndex])
}

function color_increment(row, column) {
    var temp = board_colors[row][column];
    temp++;
    if (temp>10) {
        temp = 1;
    }
    board_colors[row][column] = temp;
}


function get_color(value) {
    if (value == 1) {
        return '<button class="tpeg1"></button>';
    }
    else if (value == 2) {
        return '<button class="tpeg2"></button>';
    }
    else if (value == 3) {
        return '<button class="tpeg3"></button>'
    }
    else if (value == 4) {
        return '<button class="tpeg4"></button>'
    }
    else if (value == 5) {
        return '<button class="tpeg5"></button>'
    }
    else if (value == 6) {
        return '<button class="tpeg6"></button>'
    }
    else if (value == 7) {
        return '<button class="tpeg7"></button>'
    }
    else if (value == 8) {
        return '<button class="tpeg8"></button>'
    }
    else if (value == 9) {
        return '<button class="tpeg9"></button>'
    }
    else {
        return '<button class="tpeg10"></button>';
    }  
}






