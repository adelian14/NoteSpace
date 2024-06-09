checkLoggedIn();

var userName = document.querySelector('#newUserName');
var userEmail = document.querySelector('#newUserEmail');
var userPassword = document.querySelector('#newUserPassword');
var userConfirmPassword = document.querySelector('#newUserConfirmPassword');
var userNameAfter = document.querySelector('#userNameAfter');
var userEmailAfter = document.querySelector('#userEmailAfter');
var userPasswordAfter = document.querySelector('#userPasswordAfter');
var userConfirmPasswordAfter = document.querySelector('#userConfirmPasswordAfter');
var passwordBar = document.querySelector('.password-bar');
var passwordStat = document.querySelector('.password-stat small');
var signupBtn = document.querySelector('#signup');
var showBtn = document.querySelector('fieldset');
var signupDone = document.querySelector('#signupDone');
var form = document.querySelector('form');

var users = getUsers();
var valid = [0,0,0,0];
var passwordMessages = ['Too short', 'Weak', 'Good', 'Strong', 'Very strong'];
var passwordWidth = ['20%','40%','60%','80%','100%'];
var passwordColors = ['#E55353','#FFB74D','#FFF176','#AED581','#81C784'];

function changeButton(){
    var sum=0;
    for(let i = 0; i < 4; i++){
        sum+=valid[i];
    }
    if(sum==4){
        showBtn.removeAttribute('disabled');
    }
    else{
        showBtn.setAttribute('disabled','');
    }
}

function clearForm(){
    valid=[0,0,0,0];
    userEmail.value='';
    userName.value='';
    userPassword.value='';
    userConfirmPassword.value='';
    userConfirmPasswordAfter.classList.add('opacity-0');
    userPasswordAfter.classList.add('opacity-0');
    userNameAfter.classList.add('opacity-0');
    userEmailAfter.classList.add('opacity-0');
    changeButton();
}

function canUpdate(user){
    for(let i = 0; i < users.length; i++){
        if(user.Email==users[i].Email) return false;
    }
    return true;
}

function updateUsers(user){
    users.push(user);
    localStorage.setItem('noteSpaceUsers',JSON.stringify(users));
}

function createUser(){
    var user = {
        Name : userName.value,
        Email : userEmail.value,
        Password: hash(userPassword.value),
        Image: 0,
        nextNoteId: 0,
        Notes:[]
    }
    return user;
}

signupBtn.addEventListener('click',function(e){
    e.preventDefault();
    e.stopPropagation();
    var user = createUser();
    if(canUpdate(user)){
        updateUsers(user);
        signupDone.children[0].innerHTML = 'Account created successfully';
        signupDone.classList.remove('d-none');
        clearForm();
    }
    else{
        userEmailAfter.children[0].children[0].innerHTML = 'This email is associated with another account';
        userEmailAfter.classList.remove('opacity-0');
    }
})

form.addEventListener('click',function(e){
    e.stopPropagation();
    signupDone.classList.add('d-none');
})

//input validation

userEmail.addEventListener('input',function(){
    var email = userEmail.value;
    if(validEmail(email)){
        valid[0]=1;
        userEmailAfter.classList.add('opacity-0');
    }
    else{
        valid[0]=0;
        userEmailAfter.children[0].children[0].innerHTML = 'Invalid Email';
        userEmailAfter.classList.remove('opacity-0');
    }
    changeButton();
})

userName.addEventListener('input',function(){
    var name = userName.value;
    if(validName(name)){
        valid[1]=1;
        userNameAfter.classList.add('opacity-0');
    }
    else{
        valid[1]=0;
        userNameAfter.classList.remove('opacity-0');
    }
    changeButton();
})

userPassword.addEventListener('input',function(){
    var password = userPassword.value;
    var p = userConfirmPassword.value;
    if(password!=p){
        valid[3]=0;
    }
    var idx=evalPassword(password);
    if(idx > 0) valid[2]=1;
    else valid[2]=0;
    userPasswordAfter.classList.remove('opacity-0');
    passwordBar.style.width=passwordWidth[idx];
    passwordBar.style.backgroundColor=passwordColors[idx];
    passwordStat.innerHTML = passwordMessages[idx];
    passwordStat.style.color = passwordColors[idx];
    changeButton();
})

userConfirmPassword.addEventListener('input',function(){
    var p1=userPassword.value;
    var p2=userConfirmPassword.value;
    if(p1==p2){
        valid[3]=1;
        userConfirmPasswordAfter.classList.add('opacity-0');
    }
    else{
        valid[3]=0;
        userConfirmPasswordAfter.classList.remove('opacity-0');
    }
    changeButton();
})
