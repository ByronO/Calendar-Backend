const moment = require("moment");

const isDate = (value) => {
    if (!value) {
        return false;
    }

    if (moment(value).isValid()) {
        return true;
    }
    return false;
};

module.exports = {
    isDate,
};
