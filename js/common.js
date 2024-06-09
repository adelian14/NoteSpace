function checkLoggedIn(){
    var user = JSON.parse(localStorage.getItem('activeUser'));
    if(user!=null) window.location.href = 'home.html';
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var ampm = ['AM','PM'];
function getTimeNow() {
    let dateObj = new Date(new Date().getTime());
    let h=dateObj.getHours();
    let idx=0;
    if(h > 12) h-=12,idx=1;
    if(h==0) h=12;
    if(h < 10) h='0'+h;
    var time = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()} | ${h}:${dateObj.getMinutes()} ${ampm[idx]}`;
    return time;
}


function updateUsersGlobal(){
    localStorage.setItem('noteSpaceUsers',JSON.stringify(users));
}

function getUsers(){
    var users=[];
    var temp = JSON.parse(localStorage.getItem('noteSpaceUsers'));
    if(temp) users=temp;
    return users;
}

function validEmail(email){
    var reg = new RegExp('^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$');
    return reg.test(email);
}

function validName(name){
    return name.length!=0;
}

function strongPassword(password){
    var val = 0;
    if(/^[\w]*[0-9][\w]*$/.test(password)) val++;
    if(/^[\w]*[a-z][\w]*$/.test(password)) val++;
    if(/^[\w]*[A-Z][\w]*$/.test(password)) val++;
    if(val==3) return 2;
    return 1;
}

function stripPassword(password){
    var s = '';
    for(let i = 0; i < password.length; i++){
        if(/[\w]/.test(password[i])) s+=password[i];
    }
    return s;
}

function evalPassword(password){
    if(password.length < 4) return 0;
    var strippedPassword = stripPassword(password);
    var value = 0
    if(strippedPassword!=password) value++;
    if(password.length >= 8) value++;
    value+=strongPassword(strippedPassword);
    return value;
}