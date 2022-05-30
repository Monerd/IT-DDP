export function isValid(value) {
    return value.length >= 8;
}

export function isValidInTransaction(value) {
    return value.length >= 4;
}