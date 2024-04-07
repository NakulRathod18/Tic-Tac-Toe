
let theme = 'cadetblue';
document.querySelector('.theme-bton').addEventListener('change', (e) => {
    const selectedTheme = e.target.value.toLowerCase().replace(' ', ''); // Get the selected theme and normalize it
    theme = selectedTheme;
    document.querySelector('html').setAttribute('data-theme', theme);
});


let isComputer = false;
let click = 1;
let key = 0;
let key1 = 0;
let a = [];
let c = [];
let o;
let x;
let checkwinner = 0;
let restart = document.querySelector('.startbtn');
let turn = document.querySelector('.ans');
turn.innerHTML = 'X';
turn.style.fontSize = '1em';
const winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];


function computer() {
    isComputer = true;
}

function showWinnerPopup(winner) {
    const popup = document.getElementById('popup');
    const winnerText = document.getElementById('winner-text');
    if (winner == 'D') winnerText.textContent = "Match draw !";
    else winnerText.textContent = winner + " wins!";
    popup.style.display = 'flex';
}

function restartGame() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    setTimeout(() => {
        location.reload();
    }, 100);
}

function endGame() {
    setTimeout(() => {
        location.reload();
    }, 500);
}

function combination(array, arrays, combination) {
    o = combination.every(num => array.includes(num));
    x = combination.every(num => arrays.includes(num));
    if (o) {
        checkwinner = 1;
        showWinnerPopup('O');
    }
    if (x) {
        checkwinner = 1;
        showWinnerPopup('X');
    }
}


function handleClick(e) {
    if (click % 2 == 0) {
        a[key] = parseInt(e.target.classList[1]);
        e.target.innerHTML = 'O';
        click++;
        turn.innerHTML = 'X';
        e.target.removeEventListener('click', handleClick);
        key++;
    }
    else {
        c[key1] = parseInt(e.target.classList[1]);
        key1++;
        e.target.innerHTML = 'X';
        click++;
        e.target.removeEventListener('click', handleClick);
        turn.innerHTML = 'O';
    }


    setTimeout(() => {
        combination(a, c, [1, 2, 3]);
        combination(a, c, [4, 5, 6]);
        combination(a, c, [7, 8, 9]);
        combination(a, c, [1, 4, 7]);
        combination(a, c, [2, 5, 8]);
        combination(a, c, [3, 6, 9]);
        combination(a, c, [1, 5, 9]);
        combination(a, c, [3, 5, 7]);

        if (key + key1 === 9 && checkwinner != 1) {
            showWinnerPopup('D');
        }
    }, 10)

    if (isComputer && click % 2 == 0) {
        playwithcomputer();
    }
}
restart.addEventListener('click', endGame);

document.querySelectorAll('.boxes').forEach((b) => {
    b.addEventListener('click', handleClick);
})


function playwithcomputer(e) {
    let arr = [undefined, -1, -1, -1, -1, -1, -1, -1, -1, -1];
    for (const iterator of a) {
        arr[iterator] = 1;
    }
    for (const iterator of c) {
        arr[iterator] = 1;
    }
    let empty = [];
    for (let idx = 1; idx <= 9; idx++) {
        if (arr[idx] === -1) {
            empty.push(idx);
        }
    }
    let size = empty.length;
    for (const move of empty) {
        let tempA = [...a, move];
        for (const combination of winningCombinations) {
            if (combination.every(num => tempA.includes(num))) {
                document.getElementsByClassName(`${move}`)[0].click();
                return;
            }
        }
    }

    for (const move of empty) {
        let tempC = [...c, move];
        for (const combination of winningCombinations) {
            if (combination.every(num => tempC.includes(num))) {
                document.getElementsByClassName(`${move}`)[0].click();
                return;
            }
        }
    }
    let random = Math.floor(Math.random() * size);
    document.getElementsByClassName(`${empty[random]}`)[0].click();


}
