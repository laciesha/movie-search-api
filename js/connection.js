let db;
//name of db and 2 is the version of indexdb
var openRequest = indexedDB.open('movie_app_db', 2);


// 1. New Store is created with this function:
openRequest.onupgradeneeded = function(e) {
    var db = e.target.result;
    console.log('running onupgradeneeded',db.objectStoreNames);

    // create new data stores:
    if (!db.objectStoreNames.contains('comments')) {
        var storeOS = db.createObjectStore('comments',
        //table id will be incremented
        {keyPath: 'id', autoincrement: true});
    }
    if (!db.objectStoreNames.contains('apikey')) {
        var storeOS = db.createObjectStore('apikey',
        //table id will be incremented
        {keyPath: 'id', autoincrement: true});
    }
};


// 2. This function fires when the database has been opened.
// This is where we will add new comments to the datastore:
//It's gonna target the results take it in console.logs on success
//Takes whatever the values are and displays it
openRequest.onsuccess = function(e) {
    console.log('running onsuccess');
    db = e.target.result;
    // call this function to create a new comment:
     addDataToCommentsDataStore(db);
    readCommentsFromDataStore(db);
    saveApikey('2da20834')

};
     //save apikey
const saveApikey = (newkey)=>{
    openRequest.onsuccess = function(e) {
        console.log('running onsuccess');
        db = e.target.result;
        const transaction = db.transaction(['apikey'],'readwrite')
        const apikey = transaction.objectStore('apikey')
        const request = apikey.add({
            key:newkey
        })
        request.onerror = function(e) {
            console.log('Error', e.target.error.name);
        };
        request.onsuccess = function(e) {
            console.log('The apikey has been successfully added!');
        };
    
       // Commit: close connection
       transaction.oncomplete = () => {
            db.close();
       };
    };
}

const addDataToCommentsDataStore = (db) => {
     // this is the place where we can add data to our datastores:
     var transaction = db.transaction(['comments'], 'readwrite');
     var comments = transaction.objectStore('comments');
     console.log(comments);
    
     //add the attributes
     //hard code
     var request = comments.add({
         id: 147,
         name: "doordash order",
         email: "HboMax@gmail.com",
         comment: "Goldstar",
         timestamp: "8/8/2022 3:15:13PM"
     });
 
     request.onerror = function(e) {
         console.log('Error', e.target.error.name);
     };
     request.onsuccess = function(e) {
         console.log('The comment has been successfully added!');
     };
 
    // Commit: close connection
    transaction.oncomplete = () => {
         db.close();
    };
}

const readCommentsFromDataStore = (db) => {
    var transaction = db.transaction('comments', 'readonly');
    var objectStore = transaction.objectStore('comments');
    var cursorRequest = objectStore.openCursor();
    var commentList = [];
    cursorRequest.onsuccess = function (event){
        if (event.target.result){
            // if(event.target.result.value['id'] && event.target.result.value['id'] == value){ //compare values
                commentList.push(event.target.result.value);
            // }
            event.target.result['continue']();
        }
    };

    transaction.oncomplete = function (event) {
        console.log(commentList);
        // callback(agregate); // return items
    };
}


// 3. Handles errors:
openRequest.onerror = function(e) {
    console.log('onerror!');
    console.dir(e);
};

