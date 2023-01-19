function gridSize(event) {
  if(event.target.parentElement.parentElement.classList.contains("double-width") == true){
    event.target.parentElement.parentElement.classList.toggle("full-width");
    event.target.parentElement.parentElement.classList.toggle("double-width");
  }else{
    if(event.target.parentElement.parentElement.classList.contains("full-width") == true){
      event.target.parentElement.parentElement.classList.toggle("full-width");
    }else{
      event.target.parentElement.parentElement.classList.toggle("double-width");
    }
  }
  }

function gridSizeV(event) {
  event.target.parentElement.parentElement.classList.toggle("half-height");
}
  
  function addtoGrid() {
      var elemDiv = document.createElement('div');
      elemDiv.className = 'grid-item grid-new';
      elemDiv.innerHTML = '<div class="action-icon pin" tooltip="Pin to top" onclick="pinItem(event);"></div><div class="action-icon close-x" tooltip="Delete item" onclick="removeItem(event);"></div><div class="icon-corner"><input type="color" tooltip="Change color" class="action-icon color-picker" onchange="changeColor(event);" onclick="changeAllColors();" value="#ffffff" /><div class="action-icon arrow-v" tooltip="Change item height" onclick="gridSizeV(event);"></div><div class="action-icon arrow-h" tooltip="Change item width" onclick="gridSize(event);"></div></div><div class="content"></div>';
      document.getElementById("wrapper").appendChild(elemDiv);
  }

  function changeAllColors(){
    var x = document.querySelectorAll("input[type='color']");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].parentElement.parentElement.style.backgroundColor = x[i].value;
      colorContrast = hexToRgb(x[i].value).r + hexToRgb(x[i].value).g + hexToRgb(x[i].value).b;
      
      if(colorContrast < 255){
        x[i].parentElement.parentElement.style.color = "#ffffff";
      }else{
        x[i].parentElement.parentElement.style.color = "unset";
      }
    }
    colorAll = setTimeout(function () {
      changeAllColors();
    }, 500);
  }
  
  function changeColor(event){
    event.target.parentElement.parentElement.style.backgroundColor = event.target.value;
    colorContrast = hexToRgb(event.target.value).r + hexToRgb(event.target.value).g + hexToRgb(event.target.value).b;

    if(colorContrast < 255){
      event.target.parentElement.parentElement.style.color = "#ffffff";
    }else{
      event.target.parentElement.parentElement.style.color = "unset";
    }
    event.target.outerHTML = '<input type="color" tooltip="Change color" class="action-icon color-picker" onchange="changeColor(event);" onclick="changeAllColors();" value="' + event.target.value + '">';
    clearTimeout(colorAll);
  }

  function removeItem(event){
    window.wrapperState = document.getElementById("wrapper").innerHTML;
    event.target.parentElement.style.height = "0";
    event.target.parentElement.style.opacity = "0";
    setTimeout(function(){
      event.target.parentElement.outerHTML = "";
      var elemDiv = document.createElement('button');
      elemDiv.className = 'button-alert';
      elemDiv.addEventListener("click", undo, false);
      elemDiv.innerText = 'Undo delete item';
      document.getElementById("wrapper").appendChild(elemDiv);

      undoTimeOut = setTimeout(function () {
        var x = document.getElementsByClassName("button-alert");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].outerHTML = "";
        }
      }, 5000);

  }, 350);
  }

  function pinItem(event){
    if(event.target.parentElement.classList.contains("stickyItem") == true){
      event.target.parentElement.classList.remove("stickyItem");
    }else{
      event.target.parentElement.classList.add("stickyItem");
    }
  }

  function undo(){
    clearTimeout(undoTimeOut);
    document.getElementById("wrapper").innerHTML = window.wrapperState;
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function imgFunc(event){
    // console.log(event.target);
    event.target.parentElement.parentElement.style.visibility = "hidden";
    document.getElementById("overlay-img").style.top = event.target.parentElement.parentElement.offsetTop + "px";
    document.getElementById("overlay-img").style.left = event.target.parentElement.parentElement.offsetLeft + "px";
  }