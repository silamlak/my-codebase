export const ce = (status, message) => {
    const error = new Error()
    error.message = message
    error.status = status
    return error
}