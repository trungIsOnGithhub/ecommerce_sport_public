import twilio from 'twilio';


const accountSid = process.env.TWILLIO_ACCOUNTSID || '';
const authToken = process.env.TWILLIO_AUTHTOKEN || '';

const client = twilio(accountSid, authToken);

export const sendOTP = async (phoneNumber: string, otp: number) => {
    await client.messages.create({ body: `OTP: ${otp}`, from: '+14793413455', to: phoneNumber });
};
