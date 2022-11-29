function gridSize(event) {
    event.target.parentElement.parentElement.classList.toggle("double-width");
  }

function gridSizeV(event) {
  event.target.parentElement.parentElement.classList.toggle("half-height");
}
  
  function addtoGrid() {
    document.getElementById("wrapper").innerHTML +=
      '<div class="grid-item"><div class="action-icon close-x" onclick="removeItem(event);"></div><div class="icon-corner"><input type="color" class="action-icon color-picker" onchange="changeColor(event);" value="#ffffff" /><div class="action-icon arrow-v" onclick="gridSizeV(event);"></div><div class="action-icon arrow-h" onclick="gridSize(event);"></div></div></div>';
  }
  
  function changeColor(event){
    console.log(event.target.value);
    event.target.parentElement.parentElement.style.backgroundColor = event.target.value;
    console.log(event.target.value)
  }

  function removeItem(event){

  }