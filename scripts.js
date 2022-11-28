function gridSize(event) {
    event.target.parentElement.parentElement.classList.toggle("double-width");
  }

function gridSizeV(event) {
  event.target.parentElement.parentElement.classList.toggle("half-height");
}
  
  function addtoGrid() {
    document.getElementById("wrapper").innerHTML +=
      '<div class="grid-item"><div class="icon-corner"><input type="color" class="action-icon color-picker" value="#ffffff" /><div class="action-icon arrow-v"></div><div class="action-icon arrow-h" onclick="gridSize(event);"></div></div></div>';
  }
  
  function changeColor(event){
    console.log(event.target.parentElement.parentElement)
  }