let maxKeyLength;

let maxKeysCountButton = document.getElementById('max-keys-count-button');
maxKeysCountButton.onclick = function() {
  maxKeyLength = ownMathPow(BigInt(2), getCheckedRadioValue('bits-count'));
  document.getElementById('max-keys-count-output')
    .textContent = maxKeyLength;
}

function ownMathPow(base, exponent) {
  let result = base;
  
  for (let i = 2; i <= exponent; i++) {
  	result *= base;
  }
  
  return result;
}

function getCheckedRadioValue(group) {
  let allInputs = document.querySelectorAll('input');

  for (let i = 0; i < allInputs.length; i++) {
    if (allInputs[i].name == group && allInputs[i].checked == true) {
      return allInputs[i].value;
    }
  }
}
// first task end

let randomKey;

let randomKeyButton = document.getElementById('random-key-button');
randomKeyButton.onclick = function() {
  randomKey = randBigInt(maxKeyLength);
  document.getElementById('random-key-output')
    .textContent = "0x" + randomKey.toString(16).toUpperCase();
    // to hexadecimal system
}

function randBigInt(range) {
  let rand = BigInt(0);
  let digits = range.toString().length / 9 + 2 | 0;
  
  while(digits--) {
    rand *= BigInt(1000000000);
    rand += BigInt(Math.random() * 1000000000 | 0);
  }
  
  return rand % range;
}
// second task end

let crackingTime;

let bruteForceButton = document.getElementById('brute-force-button');
bruteForceButton.onclick = function() {
  crackingTime = bruteForceEmulator(maxKeyLength, randomKey);
  document.getElementById('brute-force-output')
    .textContent = crackingTime + "ms"; 
}

function bruteForceEmulator(maxKeyLength, randomKey) {
  let startTimestamp = Date.now();

  for (let i = 0; i < maxKeyLength; i++) {
    if (i == randomKey) {
      return Date.now() - startTimestamp;
    }
  }
}
// third task end

// doc navigation
let allInputs = document.querySelectorAll('input');
for (let i = 0; i < allInputs.length; i++) {
  allInputs[i].onfocus = radioHandler;
}

function radioHandler() {
  document.getElementById('max-keys-count-button').disabled = false;
  document.getElementById('random-key-button').disabled = true;
  document.getElementById('brute-force-button').disabled = true;
}


document.getElementById('max-keys-count-button')
  .addEventListener("click", () => {
    document.getElementById('max-keys-count-button').disabled = true;
    document.getElementById('random-key-button').disabled = false;
    document.getElementById('brute-force-button').disabled = false;
});