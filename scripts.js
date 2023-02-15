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
      scrollFunc();
  }

  function scrollFunc(){
    setTimeout(function(){
      window.tempScroll = document.documentElement.scrollTop;
      window.scrollTo(0,document.documentElement.scrollTop + 50);
      if(document.documentElement.scrollTop !== window.tempScroll){
        scrollFunc();
      }else{
        var elemDiv = document.createElement('div');
        elemDiv.className = 'grid-item grid-new';
        elemDiv.innerHTML = '<div class="action-icon pin" tooltip="Pin to top" onclick="pinItem(event);"></div><div class="action-icon close-x" tooltip="Delete item" onclick="removeItem(event);"></div><div class="icon-corner"><input type="color" tooltip="Change color" class="action-icon color-picker" onchange="changeColor(event);" onclick="changeAllColors();" value="#ffffff" /><div class="action-icon arrow-v" tooltip="Change item height" onclick="gridSizeV(event);"></div><div class="action-icon arrow-h" tooltip="Change item width" onclick="gridSize(event);"></div></div><div class="content"></div>';
        document.getElementById("wrapper").appendChild(elemDiv);
        window.scrollTo(0,document.body.scrollHeight);
      }
  }, 10);
  }

  function changeTheme(){
    var x = document.querySelectorAll(".grid-item");
    var i;
    for (i = 0; i < x.length; i++) {
      tempColor = window.getComputedStyle(x[i] ,null).getPropertyValue('background-color');
      tempColor = tempColor.slice(4,-1);
      tempR = tempColor.slice(0,tempColor.indexOf(','));
      tempColor = tempColor.slice(tempColor.indexOf(',')+2);
      tempG = tempColor.slice(0,tempColor.indexOf(','));
      tempColor = tempColor.slice(tempColor.indexOf(',')+2);
      tempB = tempColor;
      tempHex = rgbToHex(Number(tempR), Number(tempG), Number(tempB));
      x[i].value = tempHex;
      if(tempR == 255 && tempB == 255 && tempG == 255){
        x[i].style.backgroundColor = "#333333";
        // window.mode = "light";
      }else{
        if(tempR == 51 && tempB == 51 && tempG == 51){
          x[i].style.backgroundColor = "#ffffff";
          // window.mode = "dark";
        }
      }
    }
    setTimeout(function(){
      setAllColors();
    }, 500);
  }

  window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
    changeTheme();
  });

  function setAllColors(){
    var x = document.querySelectorAll("input[type='color']");
    var i;
    for (i = 0; i < x.length; i++) {
      tempColor = window.getComputedStyle(x[i].parentElement.parentElement ,null).getPropertyValue('background-color');
      tempColor = tempColor.slice(4,-1);
      tempR = tempColor.slice(0,tempColor.indexOf(','));
      tempColor = tempColor.slice(tempColor.indexOf(',')+2);
      tempG = tempColor.slice(0,tempColor.indexOf(','));
      tempColor = tempColor.slice(tempColor.indexOf(',')+2);
      tempB = tempColor;
      tempHex = rgbToHex(Number(tempR), Number(tempG), Number(tempB));
      x[i].value = tempHex;

      if(tempHex == "#ffffff"){
        window.mode = "light";
      }else{
        window.mode = "dark";
      }

      colorContrast = hexToRgb(x[i].value).r + hexToRgb(x[i].value).g + hexToRgb(x[i].value).b;
      
      if(colorContrast < 255){
        x[i].parentElement.parentElement.style.color = "#ffffff";
      }else{
        x[i].parentElement.parentElement.style.color = "#333333";
      }
    }
  }

  function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
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
        x[i].parentElement.parentElement.style.color = "#333333";
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
      event.target.parentElement.parentElement.style.color = "#333333";
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
    document.getElementById("overlay-img").style.visibility = "hidden";
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function imgHover(event){
    document.getElementById("overlay-img").getElementsByClassName("content-img")[0].src = event.target.src;
  }

  function imgFunc(event){
    bigMargin = getComputedStyle(document.getElementById("overlay-img")).getPropertyValue('--bigOverlayMargin').slice(1,-2);
    bigMargin = Number(bigMargin);
    document.getElementById("overlay-img").style.visibility = "visible";
    window.imgForLater = event.target.parentElement.parentElement;
    event.target.parentElement.parentElement.style.visibility = "hidden";
    document.getElementById("overlay-img").style.top = event.target.parentElement.parentElement.getBoundingClientRect().top + "px";
    document.getElementById("overlay-img").style.left = event.target.parentElement.parentElement.getBoundingClientRect().left - 10 + "px";
    document.getElementById("overlay-img").style.width = event.target.parentElement.parentElement.offsetWidth - bigMargin + "px";
  
    document.getElementById("overlay-img").style.height = event.target.parentElement.parentElement.offsetHeight - bigMargin + "px";
    document.getElementById("overlay-img").style.animationName = "none";
    document.getElementById("overlay-img").getElementsByClassName("content-img")[0].src = event.target.src;
    setTimeout(function(){
      document.getElementById("overlay-img").style.animationName = "overlayAnim";
      document.getElementById("overlay-img").style.pointerEvents = "all";
  }, 10);
  }

  function closeOverlay(){
    document.getElementById("overlay-img").style.animationName = "removeOverlay";
    document.getElementById("overlay-img").style.width = "calc(90% - var(--bigOverlayMargin))";
    document.getElementById("overlay-img").style.height = "calc(90% - var(--bigOverlayMargin))";
    document.getElementById("overlay-img").style.top = "calc(5% - 12px)";
    document.getElementById("overlay-img").style.left = "calc(5% - 12px)";
    document.getElementById("overlay-img").style.pointerEvents = "none";
    window.imgForLater.style.opacity = "0";
    setTimeout(function(){
      window.imgForLater.style.visibility = "visible";
      window.imgForLater.style.opacity = "1";
  }, 100);
  }