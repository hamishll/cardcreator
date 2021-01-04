/* ScrollReveal */

ScrollReveal().reveal('.card', { duration: 5000, delay: 000 });
ScrollReveal().reveal('.message', { duration: 5000, delay: 000 });

let previousTime = Date.now();

/* Detect changes */

// document.querySelectorAll('.message').forEach(item => {
//     item.addEventListener('keydown', event => {
//         //handle click
//         document.getElementById('savebar').setAttribute('style', 'display: block;');
//     })
// })

/* Handle Image Upload */

const loadFile = function(event) {
	const image = document.getElementById('img1');
    image.src = URL.createObjectURL(event.target.files[0]);
    // document.getElementById('savebar').setAttribute('style', 'display: block;');
};
const loadFile2 = function(event) {
	const image = document.getElementById('img2');
    image.src = URL.createObjectURL(event.target.files[0]);
    // document.getElementById('savebar').setAttribute('style', 'display: block;');
};

function startEdit() {
    document.getElementById('editprompt').setAttribute('style','display: none');
    document.getElementById('savebar').setAttribute('style', 'display: flex;');
    document.querySelectorAll('.custom-file-upload').forEach(item => {
        item.setAttribute('style', 'display: block;');
    });
    document.querySelectorAll('.message').forEach(item => {
        item.readOnly = false;
        item.addEventListener("focus", function () {
            this.style.backgroundColor = "rgb(245,245,245)";  
        });
        item.addEventListener("focusout", function () {
            this.style.backgroundColor = "rgb(255,255,255)";  
            // console.log("focusout");
        });
    });
}
function endEdit() {
    document.getElementById('editprompt').setAttribute('style','display: inline block');
    document.getElementById('savebar').setAttribute('style', 'display: flex;');
    document.querySelectorAll('.custom-file-upload').forEach(item => {
        item.setAttribute('style', 'display: none;');
    });
    document.querySelectorAll('.message').forEach(item => {
        item.readOnly = true;
        item.removeEventListener("focus", function () {
            this.style.backgroundColor = "rgb(245,245,245)";  
        });
        item.removeEventListener("focusout", function () {
            this.style.backgroundColor = "rgb(255,255,255)";  
            // console.log("focusout");
        });
    });
}

// Flip card

document.querySelectorAll('.paper').forEach(item => {

    item.addEventListener("click", function(event) {
        console.log(event.target);
        const msg = document.getElementById('message');
        if (msg === event.target && msg.readOnly === false) {
            
        }
        else{
        
        //console.log("Flipping page");
        index = this.style.zIndex;
        //console.log('Original index:'+index);
        newIndex = 4-index;
        //console.log('New index:'+newIndex);

        el = this;
        //console.log(el);
        timeDelta = Date.now() - previousTime;

        if (newIndex <= index && timeDelta > 300) {
            this.classList.toggle('is-flipped');
            setTimeout(function(){ el.style.zIndex = newIndex; }, 750);
            console.log("page forward");
            previousTime = Date.now();
        }
        else if (timeDelta > 300) {
            el.style.zIndex = newIndex;
            setTimeout(function(){ el.classList.toggle('is-flipped')}, 750);
            console.log("page back");
            previousTime = Date.now();
        }
        else {
            console.log("you clicked too fast");
        };
        
        }
    })

});
