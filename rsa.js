const { random, randomInt, bignumber } = require("mathjs");
const mathjs = require("mathjs");


//-------------------------------------------------------Declarando funções------------------------------------------------------------
const findPrime = function (num) {
  let i,
    primes = [2, 3],
    n = 5;
  const isPrime = (n) => {
    let i = 1,
      p = primes[i],
      limit = Math.ceil(Math.sqrt(n));
    while (p <= limit) {
      if (n % p === 0) {
        return false;
      }
      i += 1;
      p = primes[i];
    }
    return true;
  };
  for (i = 2; i <= num; i += 1) {
    while (!isPrime(n)) {[]
      n += 2;
    }
    primes.push(n);
    n += 2;
  }
  return primes[num - 1];
};

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++)
    if (num % i === 0) return false;
  return num > 1;
};

const powMod = function (x, y, p) {
  let res = mathjs.bignumber(1); // Initialize result

  while (y > 0) {
    // If y is odd, multiply x with result
    if (y & 1) res = mathjs.multiply(res, x);

    // y must be even now
    y = mathjs.floor(mathjs.divide(y, 2)); // y = y/2
    x = mathjs.multiply(x, x); // Change x to x^2
  }
  return mathjs.bignumber(mathjs.mod(res, p));
};

const powmod2 = (base, exp, mod) => {
  let result = 1;

  base = base % mod;

  if (base == 0) return 0;
  while (exp > 0) {
    if (exp % 2) {
      result = (result * base) % mod;
    }
    exp = exp >> 1;
    base = (base * base) % mod;
  }
  return result;
};

String.prototype.getBytes = function () {
  var bytes = [];
  for (var i = 0; i < this.length; i++) {
    bytes.push(this.codePointAt(i));
  }

  return bytes;
};

const moduloInverso = function (a, b) {
  let result = egcd(a, b);
  if (result[0] != 1) console.error(`NoModular Inverse ${result}`);
  return result[1] % b;
};

var fastModularExponentiation = function (a, b, n) {
  a = a % n;
  var result = 1;
  var x = a;

  while (b > 0) {
    var leastSignificantBit = b % 2;
    b = Math.floor(b / 2);

    if (leastSignificantBit == 1) {
      result = result * x;
      result = result % n;
    }

    x = x * x;
    x = x % n;
  }
  return result;
};


const egcd = function (a, b) {
  if (b == 0) {
    return [1, 0, a];
  }

  temp = egcd(b, mathjs.mod(a, b));
  x = temp[0];
  y = temp[1];
  d = temp[2];
  return [
    y,
    mathjs.subtract(x, mathjs.multiply(y, Math.floor(mathjs.divide(a, b)))),
    d,
  ];
};

const gcd = function (a, b) {
  if (b == 0) return a;
  else return gcd(b, mathjs.mod(a, b));
};

const calcToltiente_N = (x, y) => {
  let lcm_value = mathjs.lcm(x, y);
  return lcm_value;
};

const areCoprimes = (num1, num2) => {
  const smaller = num1 > num2 ? num1 : num2;
  for (let ind = 2; ind < smaller; ind++) {
    const condition1 = num1 % ind == 0;
    const condition2 = num2 % ind == 0;
    if (condition1 && condition2) {
      return false;
    }
  }
  return true;
};

const gerarPrimo = (size) => {
  let x = 4;
  let iteracoes = 0;
  while (true) {
    x = bignumber(mathjs.randomInt([size], 0, 9).join(""));
    if (mathjs.isPrime(x)) {
      break;
    }
    if (iteracoes % 100 == 0) {
      //console.log(iteracoes);
    }
    iteracoes++;
  }
  return x;
};


//---------------------------------------------------------------------------------------------------------------------


//--------------------------------------------Definição de variaveis ----------------------------------------------------------------

console.log(`
----------Algoritimo RSA----------
--------------EC 10---------------
- Alunos:                        -
-   Rachel Moreira               -
-   Renan Castro                 -
-   Wellison Sousa               -
-   Wesley Campos                -
----------------------------------
`);

let msg = "The information security is of significant importance to ensure the privacy of communications";
const biteSize = 5; //Por questões de Overflow ertará reduzido para 9 bits
//let msg = `teste`;
let msgCrypted = null;
let msgDecrypted = null;
let n,
  d,
  e = mathjs.bignumber();
//--------------------------------------------------------------------------------------


let p = gerarPrimo(biteSize);

let q = gerarPrimo(biteSize);


console.log(`Numero primo P = `, p, `Numero primo Q =`, q);

n = mathjs.multiply(p, q);
console.log(`N = `, n);

let totineteN = calcToltiente_N(
  mathjs.subtract(p, mathjs.bignumber(1)),
  mathjs.subtract(q, mathjs.bignumber(1))
);
console.log(`totinete de N =`, totineteN);

e = gerarPrimo(biteSize);
while (true) {
  let x = gerarPrimo(biteSize);
  if (mathjs.isPrime(x)) {
    e = mathjs.bignumber(x);
    if (gcd(e, totineteN) == 1) {
      break;
    }
  }
}

console.log(`e final = `, e);
console.log(`chave publica (n,e) = `, n, ` , `, e);

d = mathjs.invmod(e, totineteN);

console.log(`d = `, d);


const encriptar = function () {
  let encryptedWordArray = [];
  console.log(msg.getBytes());
  for (let index = 0; index < msg.length; index++) {
    let charCode = msg.charCodeAt(index);
    let C = powMod(mathjs.bignumber(charCode), e, n);
    let Cnew = fastModularExponentiation(mathjs.bignumber(charCode), e, n) % n;
    encryptedWordArray.push(C);
  }
  return encryptedWordArray;
};

const decriptar = function () {
  let arr = [];
  let arrBytes = [];
  let frase = "";
  arr = msgCrypted;
  arr.forEach((element) => {
    let P = powMod(mathjs.bignumber(element), d, n);
    let PNew = powmod2(mathjs.bignumber(element), d, n);
    arrBytes.push(P);
  });
  console.log(arrBytes);
  arrBytes.forEach(element => {
    frase += String.fromCodePoint(element);
  });
  console.log(frase);
  return frase;
};

msgCrypted = encriptar();
console.log(`
Mensagem Cifrada`,msgCrypted);

msgDecrypted = decriptar();
console.log(`
Mensagem decifrada`, msgDecrypted);

