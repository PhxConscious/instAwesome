export const dismissError = (id) => ({
    type: 'DISMISS_ERROR',
    id,
})

export const dismissErrors = (id) => ({
    type: 'DISMISS_ERRORS',
})

export const dismissErrorType = (errorType) => ({
    type: 'DISMISS_ERROR',
    errorType,
})
