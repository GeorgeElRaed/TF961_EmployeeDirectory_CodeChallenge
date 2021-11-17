module.exports = conditions = {
    EQUALS: (value, compared) => String(value) === String(compared),
    NOT_EQUALS: (value, compared) => !conditions.EQUALS(value, compared),
    CONTAINS: (value, compared) => String(value).includes(String(compared)),
    NOT_CONTAINS: (value, compared) => !conditions.CONTAINS(value, compared),
    STARTS_WITH: (value, compared) => String(value).startsWith(String(compared)),
    ENDS_WITH: (value, compared) => String(value).endsWith(String(compared)),
}
