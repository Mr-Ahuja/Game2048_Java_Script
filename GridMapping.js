let settings = {
  gridSettings: {
    maxGridCount: 8,
    minGridCount: 4
  },
  gameSetting: {
    winningValue: 2048
  }
};

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
    maxExpansion = screen.width < screen.height ? screen.width : screen.height;
    gridWidth = 100 < maxExpansion / size ? 100 : maxExpansion / size;

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
  for(let x = 0 ; x < grid.length ; x++)
  {
    for(let y = 0 ; y < grid.length ; y++)
    {
      table.rows[x].cells[y].innerHTML = grid[x][y];
      if(xCord == x && yCord == y)
        table.rows[x].cells[y].classList.add("newCell");
      else
        table.rows[x].cells[y].classList.remove("newCell");
    }
  }
}

function renderAnimation(grids){
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
    button.onclick = function(evt) {
      let GameGrid = document.getElementById("GameGrid");
      if (GameGrid.hasChildNodes())
        GameGrid.removeChild(document.getElementById("grid"));
      table = tableDic[evt.currentTarget.id];
      GameGrid.appendChild(table);
      action = new Action(
        evt.currentTarget.id,
        settings.gameSetting.winningValue,
        function() {
          alert("You Won");
        },
        function() {
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

function keyTrigger(evt){
  let keyCode = evt.keyCode;
  if(keyCode == 38)
    renderAnimation(action.moveUp());
  else if(keyCode == 40)
    renderAnimation(action.moveDown());
  if(keyCode == 37)
    renderAnimation(action.moveLeft());
  else if(keyCode == 39)
    renderAnimation(action.moveRight());
}




createTables();
createTabs();