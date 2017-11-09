/**
 * fabric-ca-client demo
 */
var hfca = require('fabric-ca-client');
var user = require('fabric-client/lib/User.js')
var config = require('./config.json');

let tlsOptions = null; //only uses https
let caName = ''; //single ca can ignore
let cryptoSuite = null;

let ca = new hfca('http://' + config.server + config.caPort, tlsOptions, caName, cryptoSuite);


/**
 * register a new user 注册一个用户
 */
function register (username,password){
    let req = {
        enrollmentID: username,
        enrollmentSecret: password,
        role: 'user',
        affiliation: 'org1.department1'
    };
    
    let admin = new user('admin');
    
    ca.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: 'adminpw',
    }).then((r) => {
        // console.log(r);
        admin.setEnrollment(r.key,r.certificate,'Org1MSP').then((rr) => {
            ca.register(req, admin).then((rrr) => {
                console.log(rrr);
              }).catch((e) => {
                console.log(e);
              })
        }) 
    })
}

//enroll a user to obtain the enrollment certificate signed by the Fabric CA
//登记用户，获取签名证书
function enroll (username,password) {
    ca.enroll({
        enrollmentID: username,
        enrollmentSecret: password
    }).then((r) => {
        console.log(r);//an object with key and certificate
    })
}


//revoke an existing user by enrollment ID or revoke a specific certificate
//撤销用户
function revoke (username,reason) {
    let req = {
        enrollmentID: username,
        reason: reason
    };
    
    let admin = new user('admin');
    
    ca.enroll({
        enrollmentID: 'admin',
        enrollmentSecret: 'adminpw',
    }).then((r) => {
        // console.log(r);
        admin.setEnrollment(r.key,r.certificate,'Org1MSP').then((rr) => {
            ca.revoke(req, admin).then((rrr) => {
                console.log(rrr);
              }).catch((e) => {
                console.log(e);
              })
        }) 
    })
}

//reenroll a user
//重新签发证书

function reenroll (username,password) {
    let usr = new user(username);
    
    ca.enroll({
        enrollmentID: username,
        enrollmentSecret: password,
    }).then((r) => {
        // console.log(r);
        usr.setEnrollment(r.key,r.certificate,'Org1MSP').then((rr) => {
            ca.reenroll(usr).then((rrr) => {
                console.log(rrr);
              }).catch((e) => {
                console.log(e);
              })
        }) 
    })
}





// enroll('beetle4','alpha4');
// register('beetle4','alpha4');
// revoke('beetle4','fired');
// reenroll('beetle4','alpha4')