let settings = {
  gridSettings: {
    maxGridCount: 8,
    minGridCount: 4
  },
  gameSetting: {
    winningValue: 2048
  }
};
function detectMobile() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
     return true;
   }
  else {
     return false;
   }
 }

function reloadCss() {
  var links = document.getElementsByTagName("link");
  for (var cl in links) {
    var link = links[cl];
    if (link.rel === "stylesheet") link.href += "";
  }
}

function createGrid(size) {
  let table = document.createElement("TABLE");
  for (let x = 0; x < size; x++) {
    maxExpansion = window.innerWidth < (window.innerHeight - 200) ? window.innerWidth : window.innerHeight - 200;
    let gridWidth = 100 < maxExpansion / size ? 100 : maxExpansion / size;
    if(detectMobile())
      gridWidth = (window.innerWidth-50) / size;

    let tr = document.createElement("TR");
    for (let y = 0; y < size; y++) {
      let td = document.createElement("TD");
      let textNode = document.createTextNode("0");
      td.appendChild(textNode);
      td.style.width = gridWidth;
      td.style.height = gridWidth;
      tr.appendChild(td);
    }
    table.appendChild(tr);
    table.id = "grid";
  }
  return table;
}

let tableDic = {};
function createTables() {
  for (
    let x = settings.gridSettings.minGridCount;
    x <= settings.gridSettings.maxGridCount;
    ++x
  ) {
    tableDic[x] = createGrid(x);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let table;
function renderTable(grid) {
  console.log(table.rows);
  console.log(table.rows[0].cells[0]);
  let ind = action.newValueIndex;
  let xCord = Math.floor(ind / action.size);
  let yCord = ind % action.size;
  console.log(action.getNewValueIndex());
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      table.rows[x].cells[y].innerHTML = grid[x][y];
      if (xCord == x && yCord == y)
        table.rows[x].cells[y].classList.add("newCell");
      else
        table.rows[x].cells[y].classList.remove("newCell");
    }
  }
}

function renderAnimation(grids) {
  grids.forEach(grid => {
    sleep(500);
    renderTable(grid);
  });
}

let action;
function createTabs() {
  let parent = document.getElementById("tab");
  for (
    let x = settings.gridSettings.minGridCount;
    x <= settings.gridSettings.maxGridCount;
    ++x
  ) {
    let button = document.createElement("BUTTON");
    button.id = x;
    button.class = "tablinks";
    if(detectMobile)
      button.style.fontSize = 42;
      
    button.onclick = function (evt) {
      let GameGrid = document.getElementById("GameGrid");
      if (GameGrid.hasChildNodes())
        GameGrid.removeChild(document.getElementById("grid"));
      table = tableDic[evt.currentTarget.id];
      GameGrid.appendChild(table);
      action = new Action(
        evt.currentTarget.id,
        settings.gameSetting.winningValue,
        function () {
          alert("You Won");
        },
        function () {
          alert("You Lost");
        }
      );
      renderTable(action.grid);
      reloadCss();
    };
    button.appendChild(document.createTextNode(`${x}x${x}`));
    parent.appendChild(button);
  }
}

function keyTrigger(evt) {
  let keyCode = evt.keyCode;
  if (keyCode == 38)
    renderAnimation(action.moveUp());
  else if (keyCode == 40)
    renderAnimation(action.moveDown());
  else if (keyCode == 37)
    renderAnimation(action.moveLeft());
  else if (keyCode == 39)
    renderAnimation(action.moveRight());
}

function touchAction(el, type) {
  if (type == "u")
    renderAnimation(action.moveUp());
  else if (type == "d")
    renderAnimation(action.moveDown());
  else if (type == "l")
    renderAnimation(action.moveLeft());
  else if (type == "r")
    renderAnimation(action.moveRight());
}

detectswipe("GameGrid",touchAction);
createTables();
createTabs();
