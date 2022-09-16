import { isProjectNameAvailable } from "./../models/Projects";

function emailValidator() {
    return function email(value) {
        return (
            (value &&
                !!value.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )) ||
            "Please enter a valid email"
        );
    };
}

function requiredValidator() {
    return function required(value) {
        return (
            (value !== undefined && value !== null && value !== "") || ""
            // "This field is required"
        );
    };
}

function validateStackName() {
    return function required(value) {
        return (
            isProjectNameAvailable(value) ||
            "Project name already taken by other app please select new project name"
        );
    };
}

export { emailValidator, requiredValidator, validateStackName };
