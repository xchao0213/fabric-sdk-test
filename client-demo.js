/**
 * Fabric client demo
 */

var hfc = require('fabric-client');
var hfca = require('fabric-ca-client');
var user = require('fabric-client/lib/User.js');
var cac = require('./ca-client-demo.js');
var config = require('./config.json');

let client = new hfc();
let channel = client.newChannel('composerchannel');
let peer = client.newPeer('grpc://' + config.server + config.peerPort);
channel.addPeer(peer);

let ca = new cac();
let usr = new user('admin');

// async function init() {
//     let store = await hfc.newDefaultKeyValueStore({ path: '/tmp/kvs' });
//     client.setStateStore(store);
//     let enrollment = await ca.enroll('admin', 'adminpw');
//     await usr.setEnrollment(r.key, r.certificate, 'Org1MSP');
//     client.setUserContext(usr);
// }

// function queryInfo() {
//     channel.queryInfo(peer).then((rr) => {
//         console.log(rr);
//     });
// }


function query() {
    hfc.newDefaultKeyValueStore({ path: '/tmp/kvs' }).then((store) => {
        client.setStateStore(store);
        ca.enroll('admin', 'adminpw').then((r) => {
            usr.setEnrollment(r.key, r.certificate, 'Org1MSP').then(() => {
                client.setUserContext(usr);
                channel.queryInfo(peer).then((rr) => {
                    console.log(rr);
                });

            })
        })
    })
}

query();




//create a new channel


//send channel information to a peer to join


//install chaincode on a peer


//instantiate chaincode in a channel, which involves two steps: propose and transact


//submitting a transaction, which also involves two steps: propose and transact


//query a chaincode for the latest application state

/**
 * various query capabilities
 */

//channel height
// channel.queryInfo(peer);

//block-by-number, block-by-hash


//all channels that a peer is part of


//all installed chaincodes in a peer


//all instantiated chaincodes in a channel


//transaction-by-id


//channel configuration data

/**
 * monitoring events
 */

//connect to a peer's event stream


//listen on block events


//listen on transactions events and find out if the transaction was successfully committed to the ledger or marked invalid


//listen on custom events produced by chaincodes


//serializable User object with signing capabilities


//hierarchical configuration settings with multiple layers of overrides: files, environment variable, program arguments, in-memory settings


//logging utility with a built-in logger (winston) and can be overriden with a number of popular loggers including log4js and bunyan


/**
 * pluggable CryptoSuite interface describe the cryptographic operations required for successful interactions with the Fabric. Two implementations are provided out of box
 */

//Software-based ECDSA


//PKCS#11-compliant ECDSA

/**
 * pluggable State Store interface for persisting state caches such as users 
 */

//File-based store


//CouchDB-base store which works with both CouchDB database and IBM Cloudant


//customizable Crypto Key Store for any software-based cryptographic suite implementation


//supports both TLS (grpcs://) or non-TLS (grpc://) connections to peers and orderers, see Remote which is the superclass for peers and orderers