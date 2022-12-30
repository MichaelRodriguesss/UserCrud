let errors = [];

function ValidationContract() {
    errors = [];
}

ValidationContract.prototype.isRequired = (value, error) => {
    if (!value || value.length <= 0)
        errors.push({ message: error });
}

ValidationContract.prototype.isEmail = (value, error) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: error });
}

ValidationContract.prototype.isSamePassword = (password, confirmpassword, error) => {
    if (password != confirmpassword)
        errors.push({ message: error });
}

ValidationContract.prototype.errors = () => {
    return errors[0];
}

ValidationContract.prototype.clear = () => {
    errors = [];
}

ValidationContract.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = ValidationContract;