import { z } from 'zod';

export const zodValidations = {
    validEmail: z.string().email(),
} 

export function isNumber( any ){
    return !isNaN( Number( any ))
}

export const validPhone = ( phoneNumber ) => {
    const isPhoneNumber = isNumber( phoneNumber )
    if (!isPhoneNumber) return 'Provide number!'

    const stringNumber = String( phoneNumber);
    if (stringNumber.length != 9) return 'Number length must be 9 characters'

    return null
} 