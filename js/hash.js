var primes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53];
var chars = '';
var preDope = 'sK2PV9AhpwVEGM36';
var postDope = 'uA7fGhBMvb0R1efR';

setChars();
function setChars(){
    for(let i = 48; i <= 57; i++){
        chars+=String.fromCharCode(i);
    }
    for(let i = 65; i <= 90; i++){
        chars+=String.fromCharCode(i);
    }
    for(let i = 97; i <= 122; i++){
        chars+=String.fromCharCode(i);
    }
}

function getMatrix(text){
    var mat=[];
    let k = 0;
    for(let i = 0; i < 16; i++){
        var s = '';
        for(let j = 0; j < 16; j++){
            s+=text[k%text.length];
            k++;
        }
        mat.push(s);
    }
    return mat;
}

function getTotalSum(mat){
    var sum=0;
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 16; j++){
            sum+=mat[i].charCodeAt(j);
        }
    }
    return sum;
}

function getSumCols(mat){
    var arr=[];
    for(let j = 0; j < 16; j++){
        let sum=0;
        for(let i = 0; i < 16; i++){
            sum=sum+mat[i].charCodeAt(j);
        }
        arr.push(sum);
    }
    return arr;
}
function getIdx(num,idx,sum){
    let val = num*primes[idx]*sum;
    return val%chars.length;
}

function hash(text){
    text=preDope+text+postDope;
    let mat = getMatrix(text);
    let totalSum = getTotalSum(mat);
    let sumCols = getSumCols(mat);
    let s='';
    for(let i = 0; i < 16; i++){
        let idx = getIdx(sumCols[i],i,totalSum);
        s+=chars[idx];
    }
    return s;
}