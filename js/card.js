/* ScrollReveal */

ScrollReveal().reveal('.card', { duration: 5000, delay: 000 });
ScrollReveal().reveal('.message', { duration: 5000, delay: 000 });

/* Detect changes */

document.querySelectorAll('.message').forEach(item => {
    item.addEventListener('keydown', event => {
        //handle click
        document.getElementById('savebar').setAttribute('style', 'display: block;');
    })
})

/* Handle Image Upload */

var loadFile = function(event) {
	var image = document.getElementById('img1');
    image.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById('savebar').setAttribute('style', 'display: block;');
};
var loadFile2 = function(event) {
	var image = document.getElementById('img2');
    image.src = URL.createObjectURL(event.target.files[0]);
    document.getElementById('savebar').setAttribute('style', 'display: block;');
};

function startEdit() {
    document.querySelectorAll('.custom-file-upload').forEach(item => {
        item.setAttribute('style', 'display: inline-block;');
    });
    document.querySelectorAll('.message').forEach(item => {
        item.readOnly = false;
        item.addEventListener("focus", function () {
            this.style.backgroundColor = "rgb(245,245,245)";  
        });
        item.addEventListener("focusout", function () {
            this.style.backgroundColor = "rgb(255,255,255)";  
            console.log("focusout");
        });
    });
    
}