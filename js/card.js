/* ScrollReveal */

// ScrollReveal().reveal('.card', { duration: 5000, delay: 000 });
// ScrollReveal().reveal('.message', { duration: 5000, delay: 000 });

let previousTime = Date.now();

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
    message = document.getElementById('message');
    message.contentEditable = true;
    message.addEventListener("focus", function () {
        this.style.backgroundColor = "rgb(245,245,245)";  
    });
    message.addEventListener("focusout", function () {
        this.style.backgroundColor = "rgb(255,255,255)";  
    });
    // document.querySelectorAll('.message').forEach(item => {
    //     item.contentEditable = true;
    //     console.log("this should be true:"+item.contentEditable);
    //     item.addEventListener("focus", function () {
    //         this.style.backgroundColor = "rgb(245,245,245)";  
    //     });
    //     item.addEventListener("focusout", function () {
    //         this.style.backgroundColor = "rgb(255,255,255)";  
    //         // console.log("focusout");
    //     });
    // });
}
function endEdit() {
    document.getElementById('editprompt').setAttribute('style','display: inline block');
    document.getElementById('savebar').setAttribute('style', 'display: flex;');
    document.querySelectorAll('.custom-file-upload').forEach(item => {
        item.setAttribute('style', 'display: none;');
    });
    document.querySelectorAll('.message').forEach(item => {
        item.contentEditable = false;
        item.removeEventListener("focus", function () {
            this.style.backgroundColor = "rgb(245,245,245)";  
        });
        item.removeEventListener("focusout", function () {
            this.style.backgroundColor = "rgb(255,255,255)";  
            // console.log("focusout");
        });
    });
}

document.querySelectorAll('.paper').forEach(item => {

    item.addEventListener("mousedown", function(event) {
        let msg = document.getElementById('message');
        // console.log(event.target);
        // console.log(msg);
        // console.log(msg.contentEditable);
        if ((event.target.classList.contains('reveal') || event.target.classList.contains('custom-file-upload')) && msg.contentEditable === 'true') {}
        else {
        //msg.classList.add("reveal");
        let messageDelay = -1;
        document.querySelectorAll('.reveal').forEach(item => {
            messageDelay = messageDelay+1.5;
            item.style.animationDelay = messageDelay+"s";
            //console.log("animation delay applied "+messageDelay);
            item.style.animationName = "reveal";
        });
        const pages = document.querySelectorAll('.paper');
        const numberOfPages = pages.length;
        //console.log("There are "+numberOfPages+" pages");

        //console.log(event.target);
        for (let i = 0; i <= 10; i++) {
            if (item === document.querySelectorAll('.paper')[i]) {
                //console.log('matched element '+i);

                try {
                    pages[i-1].style.zIndex = numberOfPages - pages[i-1].style.zIndex+1;
                }
                catch {
                }

                pages[i].classList.toggle('is-flipped');
                //pages[i].style.zIndex = numberOfPages - pages[i].style.zIndex+1;
                //pages[i].classList.toggle('is-flipped');
                break;
            }
            else{

            }
        }
    }

    })

});
