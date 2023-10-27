function isEmpty(value) {
    return !value || value.trim() === '';
};


function userCredentialsAreValid(email, password) {
 return (
    email && email.includes('@') && password && password.trim().length > 5
 );
};

function userIsValid(email, password, name, street, postal, city) {
    return (
        userCredentialsAreValid(email, password) &&  
        !isEmpty(name) &&
        !isEmpty(street) &&
        !isEmpty(postal) &&
        !isEmpty(city)
    );
};

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail
}

module.export = {
    userIsValid: userIsValid,
    emailIsConfirmed: emailIsConfirmed,
};