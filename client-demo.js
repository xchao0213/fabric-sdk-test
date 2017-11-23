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
let orderer = client.newOrderer('grpc://' + config.server + config.ordererPort);
channel.addOrderer(orderer);

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
    hfc.newDefaultKeyValueStore({ path: '/tmp/kvs' })

        .then((store) => {
            client.setStateStore(store);
            ca.enroll('beetle', 'alpha')
                .then((r) => {
                    usr.setEnrollment(r.key, r.certificate, 'Org1MSP')
                        .then(() => {
                            client.setUserContext(usr);
                            queryfunc(7);

                        })
                })
        })
}



//create a new channel


//send channel information to a peer to join


//install chaincode on a peer


//instantiate chaincode in a channel, which involves two steps: propose and transact


//submitting a transaction, which also involves two steps: propose and transact


//query a chaincode for the latest application state

/**
 * various query capabilities
 */

function queryfunc(con) {
    switch (con) {
        case 1:
            //query channel height
            channel.queryInfo(peer).then((rr) => {
                console.log(JSON.stringify(rr));
            });
            break;
        case 2:
            //query block-by-number
            channel.queryBlock(1, peer).then((rr) => {
                console.log(JSON.stringify(rr))
            });
            break;
        case 3:
            //query block-by-hash
            channel.queryBlockByHash(Buffer.from('9309039e7e980f138c1950f2b4a672e725c17465f82a31773ad98bb5f7135aa8', 'Hex'), peer).then((rr) => {
                console.log(rr);
            });
            break;
        case 4:
            //all channels tha a peer is part of
            client.queryChannels(peer).then((rr) => {
                console.log(JSON.stringify(rr));
            });
            break;
        case 5:
            //all installed chaincodes in a peer (not work yeat!)
            client.queryInstalledChaincodes(peer).then((rr) => {
                console.log(rr)
            });
            break;
        case 6:
            //all instantiated chaincodes in a channel (not work yeat!)
            channel.queryInstantiatedChaincodes(peer).then((rr) => {
                console.log(rr)
            });
            break;
        case 7:
            //query transaction-by-id
            channel.queryTransaction('4f7d58399537881b532c48a94ebc5b8ac77491ab99eb6c6a82760b51023ab72e', peer).then((rr) => {
                console.log(JSON.stringify(rr))
            });
            break;

        case 8:
            //channel configuration data
            channel.getChannelConfig().then((rr) => {
                console.log(rr)
            });
            break;

    }








}

query()

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