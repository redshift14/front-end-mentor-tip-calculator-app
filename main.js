const peopleInput = document.getElementById('people-number-input');
const billInput = document.getElementById('bill-input');
const percentageButtons = document.querySelectorAll('.grid-input input[type=button]');
const hint = document.querySelector('.hint');
const tipAmountValue = document.getElementById('tip-amount');
const totalAmountValue = document.getElementById('total-amount');
const resetButton = document.getElementById('reset-btn');
const percentageInput = document.getElementById('percentage-input');

let bill, percentage, peopleCount, personTipAmount, totalTipAmount;

billInput.addEventListener('focus', function(e) {
    e.target.value = '';
});

billInput.addEventListener('input', function(e) {
    if(e.target.value > 1000000) {
        e.target.value = 1000000;
    }
    bill = e.target.value;
    calculateTip(peopleCount, bill, percentage);
});

percentageButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        percentageButtons.forEach(btn => {
            btn.classList.remove('selected-percentage');
        });
        button.classList.add('selected-percentage');
        percentageInput.value = '';
        switch (e.target.value) {
            case '5%': percentage = 5;
            break;
            case '10%': percentage = 10;
            break
            case '15%': percentage = 15;
            break
            case '25%': percentage = 25;
            break
            case '50%': percentage = 50;
            break
            default: percentage = undefined;
        }
        calculateTip(peopleCount, bill, percentage);
    });
});

percentageInput.addEventListener('input', function(e) {
    if (e.target.value > 99) {
        e.target.value = 99;
    }
    if (e.target.value > 0) {
        percentageButtons.forEach(btn => {
            btn.classList.remove('selected-percentage');
        });
        percentage = e.target.value;
        calculateTip(peopleCount, bill, percentage);
    }
});

peopleInput.addEventListener('focus', function(e) {
    hint.classList.add('visible-hint');
    e.target.value = '';
});

peopleInput.addEventListener('focusout', function() {
    hint.classList.remove('visible-hint');
});

peopleInput.addEventListener('input', function(e) {
    if(e.target.value > 1000) {
        e.target.value = 1000;
    }
    peopleCount = e.target.value;
    calculateTip(peopleCount, bill, percentage);
});

calculateTip = function(people, billAmount, percentageAmount) {
    if(people > 0 && billAmount > 0 && percentageAmount > 0) {
        personTipAmount = (billAmount / 100) * percentageAmount;
        roundedPersonTipAmount = Math.round((personTipAmount + Number.EPSILON) * 100) / 100;
        totalTipAmount = people * roundedPersonTipAmount;
        roundedTotalTipAmount = Math.round((totalTipAmount + Number.EPSILON) * 100) / 100;
        tipAmountValue.innerHTML = `$${roundedPersonTipAmount}`;
        totalAmountValue.innerHTML = `$${roundedTotalTipAmount}`;
        if (tipAmountValue.innerHTML !== '$0.00' && totalAmountValue.innerHTML !== '$0.00') {
            resetButton.classList.remove('deactivated');
        }
        else if (tipAmountValue.innerHTML == '$0.00' && totalAmountValue.innerHTML == '$0.00') {
            resetButton.classList.add('deactivated');
        }
    }
}

resetButton.addEventListener('click', function() {
    peopleCount = 0;
    bill = 0;
    percentage = 0;
    roundedTotalTipAmount = 0;
    roundedPersonTipAmount = 0;
    tipAmountValue.innerHTML = '$0.00';
    totalAmountValue.innerHTML = '$0.00';
    resetButton.classList.add('deactivated');
    billInput.value = '';
    peopleInput.value = '';
    percentageButtons.forEach(btn => {
        btn.classList.remove('selected-percentage');
    });
}); 