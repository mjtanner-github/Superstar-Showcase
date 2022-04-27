document.getElementById("time").innerHTML=moment(new Date().getTime()).format("dddd, MMMM Do");document.getElementById("time").innerHTML=moment(new Date().getTime()).format("dddd, MMMM Do");

// Colors the "task" panes according to specifications governed by the hour. 
function colorize(){
    var hour = moment(new Date().getTime()).format("H");
    for(var i = 9; i < 18; i++){
        if(i < hour)
            document.getElementById("t" + i.toString()).style.backgroundColor="gray";
        else if(i == hour)
            document.getElementById("t" + i.toString()).style.backgroundColor="red";
        else
            document.getElementById("t" + i.toString()).style.backgroundColor="green";   
    }
}

// Calls the colorized function once every 10 seconds.
function update() {
    timerInterval = setInterval(function() {
        if(!focusOn){
            colorize();
        }
    }, 10000);
}

// The schedule area returns a click event, then we find out where it came from.
function clickEvent(e){
    if(e.target.className == "lock"){
       
        // Lex a little to convert to task handles. 
        var content = document.getElementById("t" + e.target.id.substr(1)).value;
        if(localStorage.getItem("t" + e.target.id.substr(1)) == null){
            localStorage.setItem("t" + e.target.id.substr(1),content);
        }
        else{
            document.getElementById("t" + e.target.id.substr(1)).value = "";
            localStorage.removeItem("t" + e.target.id.substr(1));            
        }
    }
}

// Repopulates the schedule area from localStorage after restart.
function populate(){
    const textContainers = ["t9", "t10", "t11", "t12", "t13", "t14", "t15", "t16", "t17"];
    for(var i =0; i < textContainers.length; i++){
        document.getElementById(textContainers[i]).value = localStorage.getItem(textContainers[i]);
        document.getElementById(textContainers[i]).style.backgroundColor = "gray";
    }
}

// Global focus state for collision management.
var focusOn = false;

// when task fields recieve the focus, the change to a more readable color.
function onFocus(element){
    focusOn = true;
    element.style.backgroundColor="AliceBlue";
    console.log(focusOn);
}

// Upon losing focus, just re-color everything.
function onBlur(element){
    focusOn = false;
    colorize();
}

// Mouse-over changed field color unless the focus is alreading on 
// a schedule task element.
function onMouseOver(element){
    if(!focusOn)
        element.style.backgroundColor="AliceBlue";
}

// MouseLeave is disabled when the focus is on a task element.
function onMouseLeave(element){
    if(!focusOn)
        colorize();
}

populate();
colorize();
update();
