// Js  十进制转二十以内进制算法

function getInturn(num, N , array) {
    if(typeof(array) == 'undefined') var array = '';

    var chars = ['A','B','C','D','E','F','G','H','I','J','K'];
    var remainder = num%N;
    if(remainder >= 10) {
        remainder = chars[remainder-10];
    }
    array = remainder + array;
    var quotient = parseInt(num/N);

    if(quotient < N) {
        return (quotient + array);
    }else {
        return getInturn(quotient,N,array);
    }
}
