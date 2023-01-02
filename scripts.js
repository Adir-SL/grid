function gridSize(event) {
    event.target.parentElement.parentElement.classList.toggle("double-width");
  }

function gridSizeV(event) {
  event.target.parentElement.parentElement.classList.toggle("half-height");
}
  
  function addtoGrid() {
    // document.getElementById("wrapper").innerHTML +=
    //   '<div class="grid-item grid-new"><div class="action-icon pin" tooltip="Pin to top" onclick="pinItem(event);"></div><div class="action-icon close-x" tooltip="Delete item" onclick="removeItem(event);"></div><div class="icon-corner"><input type="color" tooltip="Change color" class="action-icon color-picker" onchange="changeColor(event);" value="#ffffff" /><div class="action-icon arrow-v" tooltip="Change item height" onclick="gridSizeV(event);"></div><div class="action-icon arrow-h" tooltip="Change item width" onclick="gridSize(event);"></div></div><div class="content"></div></div>';
      // setInterval(function(){removeNew();}, 500);

      var elemDiv = document.createElement('div');
      elemDiv.className = 'grid-item';
      elemDiv.innerHTML = '<div class="action-icon pin" tooltip="Pin to top" onclick="pinItem(event);"></div><div class="action-icon close-x" tooltip="Delete item" onclick="removeItem(event);"></div><div class="icon-corner"><input type="color" tooltip="Change color" class="action-icon color-picker" onchange="changeColor(event);" value="#ffffff" /><div class="action-icon arrow-v" tooltip="Change item height" onclick="gridSizeV(event);"></div><div class="action-icon arrow-h" tooltip="Change item width" onclick="gridSize(event);"></div></div><div class="content"></div>';
      document.body.appendChild(elemDiv);
  }

  function removeNew(){
    var x = document.getElementsByClassName("grid-item");
    var i;
    for (i = 0; i < x.length; i++) {
      x[i].classList.remove("grid-new");
    }
  }
  
  function changeColor(event){
    console.log(event.target.value);
    event.target.parentElement.parentElement.style.backgroundColor = event.target.value;
    console.log(event.target.value)
  }

  function removeItem(event){
    window.wrapperState = document.getElementById("wrapper").innerHTML;
    event.target.parentElement.style.height = "0";
    event.target.parentElement.style.opacity = "0";
    setTimeout(function(){
      event.target.parentElement.outerHTML = "";
      document.getElementById("wrapper").innerHTML += '<button class="button-alert" onclick="undo();">Undo delete item</button>'

      setTimeout(function(){
        var x = document.getElementsByClassName("button-alert");
        var i;
        for (i = 0; i < x.length; i++) {
          x[i].outerHTML = '';
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
    document.getElementById("wrapper").innerHTML = window.wrapperState;
  }