var rotate = ["90deg", "180deg", "270deg", "0deg"];
var r = 3;
var slider = document.getElementById("myRange"),
    output = document.getElementById("output"),
    beforePic = document.getElementById("beforePic"),
    afterPic = document.getElementById("afterPic"),
    file = document.getElementById("file");

afterDiv.style = "overflow-y: auto;";
output.innerHTML = slider.value;
var c = document.getElementsByClassName("controale");
for (let i=0; i < c.length; i++) {
    c[i].setAttribute("disabled", true);
}
slider.setAttribute("disabled", true);

file.onchange = function (e) {
    var fReader = new FileReader();
    r = 3; // new file = reset rotate
    fReader.readAsDataURL(file.files[0]);
    fReader.onloadend = function (event) {
        beforePic.src = event.target.result;
        beforePic.style = "display: block;"; //show the picture
        // hide the text: "upload an image"
        var u = document.getElementsByClassName("uploadtext");
        u[0].style = "display: none;";
        u[1].style = "display: none;";
        // remove attribute width for div
        document.getElementById("beforeDiv").style.width = null;
        afterPic.src = event.target.result;
        afterPic.style = "display: block;";
        document.getElementById("afterDiv").style.width = null;       
    };
    var node = document.getElementById("detailsDiv");
    if (node) {
        afterPic.style = "display: block;";
        node.parentNode.removeChild(node);
        // show the image
        var nodes = document.getElementById("afterDiv").childNodes;
        for (let i=0; i < nodes.length; i++){
            nodes[i].style = "display: block";
        }
    }
    //enable controls
    var c = document.getElementsByClassName("controale");
    for (let i=0; i < c.length; i++) {
        c[i].removeAttribute("disabled");
    }
    //enable slider
    slider.removeAttribute("disabled");
};

slider.oninput = function () {
    var pic = document.getElementById("afterPic"),
        val = this.value / 100;
    output.innerHTML = this.value;
    pic.style = "opacity:" + val;
    hideDetails();
    r = 3;
};
function hideDetails () {
    var detailsDiv = document.getElementById("detailsDiv");
    // reset rotate
    // r = 0;
    if (detailsDiv) {
        afterPic.style = "display: block;";
        detailsDiv.parentNode.removeChild(detailsDiv);
        // show the image
        var nodes = document.getElementById("afterDiv").childNodes;
        for (let i=0; i < nodes.length; i++){
            nodes[i].style = "display: block";
        }
        //exceptie face acest <p> cu upload an image
        document.getElementsByClassName("uploadtext")[1].style = "display: none;";
        afterDiv.style = "overflow-y: auto;";
    }
};
function resetSlider () {
    // slider = 50
    slider.value = 50;
    output.innerHTML = slider.value;
}
document.getElementById("rotate").onclick = function () {
    afterPic.style = "transform: rotate(" + rotate[r++] + ")";
    if (r == 4) { r = 0};
    hideDetails();
    resetSlider();
};
document.getElementById("flipH").onclick = function () {
    afterPic.style = "transform: scaleX(-1)";
    r = 3;
    hideDetails();
    resetSlider();
};
document.getElementById("flipV").onclick = function () {
    afterPic.style = "transform: scaleY(-1)";
    r = 3;
    hideDetails();
    resetSlider();
};
document.getElementById("bw").onclick = function () {
    afterPic.style = "filter: grayscale(100%);";
    r = 3;
    hideDetails();
    resetSlider();
};
document.getElementById("details").onclick = function () {
    var detailsDiv = document.getElementById("detailsDiv");
    resetSlider();
    r = 3; // 0deg
    if (!detailsDiv) {
        // hide the picture
        var nodes = document.getElementById("afterDiv").childNodes;
        for (let i=0; i < nodes.length; i++){
            nodes[i].style = "display: none";
        }
        // create the elements to display
        var d = document.createElement("div");
        d.setAttribute("id", "detailsDiv");
        document.getElementById("afterDiv").appendChild(d);
        var p = document.createElement("p");
        p.innerHTML = "Details:";
        document.getElementById("detailsDiv").appendChild(p);
        //display the name of the file/picture
        var p = document.createElement("p");
        var name = file.value.split("\\");
        p.innerHTML = "File: "+ name[name.length-1];
        p.style = "font-size: 20px; word-break: break-all; ";
        document.getElementById("detailsDiv").appendChild(p);
        getExif(); 
        // set the scroll bar to afterDiv
        document.getElementById("afterDiv").style = "height: " + beforeDiv.offsetHeight;
        afterDiv.style = "overflow-y: scroll;";
    } 
};
    // Exif js
function getExif() {
    EXIF.getData(file.files[0], function() {
        let obj = EXIF.getAllTags(this);
        let tr = "";
        if (Object.entries(obj).length === 0 && obj.constructor === Object) {
            alert("No Exif Data Found ...");
        }
        Object.keys(obj).forEach(function(key) {
            tr += "<tr><th>" + key + "</th><td>" + obj[key] + "</td></tr>";
        });
        var t = document.createElement("table"),
            detailsDiv = document.getElementById("detailsDiv"),
            beforeDiv = document.getElementById("beforeDiv");
        t.setAttribute("id", "exifInfo");
        t.style = "font-size: 15px; word-break: break-all;";
        detailsDiv.appendChild(t);
        document.getElementById("exifInfo").innerHTML= tr; 
        // set the scroll bar
        detailsDiv.style = "overflow-y: scroll;";
        // set the height of detailsDiv
        //detailsDiv.style = "height: " + beforeDiv.offsetHeight;
        detailsDiv.style = "height: 300px";
    });  
};
//document.getElementById("about").onclick = function () {
//    let text = "bla blabla";
//    alert(text);
//}