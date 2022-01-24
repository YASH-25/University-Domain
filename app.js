const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const dateEl = document.querySelector('#date');

const form = document.querySelector('#submit');


const checkname = () => {

    let valid = false;

    const min = 3,
        max = 25;

    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'Username cannot be blank.');
    } else if (!isBetween(name.length, min, max)) {
        showError(nameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkphone = () => {
    let valid = false;
    const phoneEl = phoneEl.value.trim();
    if (!isRequired(phone)) {
        showError(phoneEl, 'Phone no. cannot be blank.');
    } else if (!isphoneValid(phone)) {
        showError(phoneEl, 'Phone mo. is not valid.')
    } else {
        showSuccess(phoneEl);
        valid = true;
    }
    return valid;
};

const checkdate = () => {
    let valid = false;
    const dateEl = dateEl.value.trim();
    if (!isRequired(date)) {
        showError(dateEl, 'DOB cannot be blank.');
    } else if (!isdateValid(date)) {
        showError(dateEl, 'DOB is not valid.')
    } else {
        showSuccess(dateEl);
        valid = true;
    }
    return valid;
};




const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isphoneSecure = (phone) => {
    const re = new RegExp("/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/");
    return re.test(phone);
};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isnameValid = checkname(),
        isEmailValid = checkEmail(),
        isphoneValid = checkphone(),
        isdateValid = checkdate();

    let isFormValid = isnameValid &&
        isEmailValid &&
        isphoneValid &&
        isdateValid;

    // submit to the server if the form is valid
    if (isFormValid) {

    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkname();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkphone();
            break;
        case 'date':
            checkdate();
            break;
    }
}));