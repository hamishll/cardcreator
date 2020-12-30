let queryString = window.location.search;
// eg:  ?product=shirt&color=blue&newuser&size=m
let urlParams = new URLSearchParams(queryString);
cardKey = urlParams.get('c');
// console.log(queryString);
if (cardKey === null) {
    cardKey = "ztkbnfospga";
    console.log("Card loaded is " + cardKey);
}
else {
    console.log("Card loaded is " + cardKey);
};

/* READ CARD */
// var cardKey = "KiIEFUuqXiEsYTumd6Yc";
var docRef = db.collection("cards").doc(cardKey);

var storageRef = storage.ref();

docRef.get().then(function(doc) {
    if (doc.exists) {
        // console.log("Document data:", doc.data());
        // console.log(doc.data().img1);
        // console.log(doc.data().img2);
        // console.log(doc.data().message);
        var cardDoc = doc.data();
        var message = document.getElementById('message');
        message.innerHTML = cardDoc.message.replaceAll('{NEWLINE}','\n');
        
        storageRef.child('images/' + cardKey + '/' + cardDoc.img1).getDownloadURL().then(function(url) {
            var image1 = document.getElementById('img1');
            image1.src = url;
            }).catch(function(error) {
            // Handle any errors
            });
        storageRef.child('images/' + cardKey + '/' + cardDoc.img2).getDownloadURL().then(function(url) {
            var image2 = document.getElementById('img2');
            image2.src = url;
            }).catch(function(error) {
            // Handle any errors
            });
        
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


/* Unique ID generation function */

function ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 22 characters
    // after the decimal.
    return '' + Math.random().toString(36).substr(2, 22);
};

/* ASYNC UPLOAD FUNCTION */
async function uploadImage(img,newID) {
    var imageToUpload = document.getElementById('img'+img).src;
    let blob = await fetch(imageToUpload).then(r => r.blob());
    console.log(imageToUpload);
    console.log(blob);
    return new Promise((resolve, reject) => {
        
        var uploadTask = storageRef.child('images/' + newID + '/' + img + '.jpg').put(blob);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + Math.round(progress,2) + '% done');
        document.getElementById('savebar').innerHTML = 'Image '+ img +' is ' + Math.round(progress,2) + '% uploaded';
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            //console.log('Upload is running');
            break;
        }
        }, function(error) {
        // Handle unsuccessful uploads
            reject('Failed');
        }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            resolve('Success');
        });
        });
    });
}

/* SAVE CARD */
async function saveCard() {

    // Get message value
    var message = document.getElementById('message').value.replaceAll("\n", "{NEWLINE}");
    
    // Set a unique ID for the element
    var newID = ID();
    console.log("Card saved as " + newID);

    // Set savebar to "Saving..."
    document.getElementById('savebar').innerHTML = "Saving...";
    document.getElementById('savebar').style.background = "orange";

    // Upload images
    await uploadImage(1,newID);
    await uploadImage(2,newID);

    // Write to Firestore
    db.collection("cards").doc(newID).set({
        message: message,
        img1: "1.jpg",
        img2: "2.jpg",
        timstamp: Date.now()
    })
    .then(async function() {
        console.log("Document successfully written!");
        document.getElementById('savebar').style.background = "green";
        document.getElementById('savebar').innerHTML = "Card successfully saved! Forwarding you to the new card.";
        //document.getElementById('savebar').innerHTML = "Card successfully saved! <a href='"+window.location.href.split('?')[0]+"?c="+newID+"'>Here's your shareable link!</a>";
        console.log('timer started');
        setTimeout(() => {
            console.log('timer ended');
            window.location.href = window.location.href.split('?')[0]+"?c="+newID;
        },1500);
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}