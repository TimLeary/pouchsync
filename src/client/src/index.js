import PouchDB from 'pouchdb-browser';

/**
 * It works when the cors options are allow this
 * For more information see: https://github.com/pouchdb/add-cors-to-couchdb
 * Or just use config/couchdb/docker.ini
 */

PouchDB.plugin(require('pouchdb-replication'));
const db = new PouchDB('http://localhost:5984/com');
const localDb = new PouchDB('com');


localDb.sync(db, { live: true, retry: true })
    .on('change', function (change) {
        console.log('something changed!');
    })
    .on('paused', function (info) {
        console.log('replication was paused, usually because of a lost connection');
    })
    .on('active', function (info) {
        console.log('replication was resumed');
    })
    .on('denied', function (err) {
        console.log('a document failed to replicate (e.g. due to permissions)');
    })
    .on('complete', function (info) {
        console.log('handle complete');
    })
    .on('error', () => {
        console.log('unhandled error');
    });


localDb.info()
    .then((info) => { console.log(info); });

const addMsg = (text) => {
    let msg = {
        _id: new Date().toISOString(),
        title: text
    };

    localDb.put(msg, (err, result) => {
        if(!err) {
            console.log('Message added!');
        }
    });
}

const ulStart = `<ul>`;
const ulEnd = `</ul>`;
const liStart = `<li>`;
const liEnd = `</li>`;
const divList = document.getElementById("MessageList");

const showMsgs = () => {
    localDb.allDocs({include_docs: true, descending: true}, (err, doc) => {
        let msgList = ulStart;
        doc.rows.forEach(element => {
            msgList += liStart + element.doc.title + liEnd;
        });
        msgList += ulEnd;
        divList.innerHTML = msgList;
    });
}

localDb.changes({
    since: 'now',
    live: true
}).on('change', showMsgs);

document.getElementById("SendButton")
    .addEventListener("click", () => {
        let value = document.getElementsByName("Message")[0].value;
        document.getElementsByName("Message")[0].value="";
        addMsg(value);
    });