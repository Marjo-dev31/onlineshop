function isEmpty(value) {
    return !value || value.trim() === '';
};


function userCredentialsAreValid(email, password) {
    const userIsValid =  !!email && !!email.includes('@') && !!password /* && password.trim().length > 5 */
 return userIsValid
};

function userIsValid(email, password, name, street, postal, city) {
    const userIsValid = userCredentialsAreValid(email, password) &&  
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)

    return userIsValid
};

function emailIsConfirmed(email, confirmEmail) {
    return email === confirmEmail
}

module.exports = {
    userIsValid: userIsValid,
    emailIsConfirmed: emailIsConfirmed,
};