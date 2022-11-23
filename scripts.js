function gridSize(event) {
    event.target.parentElement.parentElement.classList.toggle("doubleWidth");
  }
  
  function addtoGrid() {
    document.getElementById("wrapper").innerHTML +=
      '<div class="grid-item" onclick="gridSize(event);"></div>';
  }
  