function gridSize(event) {
    event.target.parentElement.parentElement.classList.toggle("doubleWidth");
  }
  
  function addtoGrid() {
    document.getElementById("wrapper").innerHTML +=
      '<div class="grid-item"><div class="iconCorner"><div class="icon arrow-v"></div><div class="icon arrow-h" onclick="gridSize(event);"></div></div></div>';
  }
  