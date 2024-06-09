checkLoggedIn();

var userEmail = document.querySelector('#userEmail');
var userPassword = document.querySelector('#userPassword');
var loginBtn = document.querySelector('#loginBtn');
var invalid = document.querySelector('#invalid');
var form = document.querySelector('form');

var users=getUsers();

loginBtn.addEventListener('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    var email = userEmail.value;
    var password = hash(userPassword.value);
    var user = lookUp(email,password);
    if(user==-1){
        invalid.classList.remove('d-none');
        return;
    }
    localStorage.setItem('activeUser',user);
    window.location.href='home.html';
})

form.addEventListener('click',function(){
    invalid.classList.add('d-none');
})

function lookUp(email,password){
    for(let i = 0; i < users.length; i++){
        if(users[i].Email == email && users[i].Password==password) return i;
    }
    return -1;
}