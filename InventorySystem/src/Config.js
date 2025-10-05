const envVariable = import.meta.env;
const conf = {
    apikey: String(envVariable.VITE_API_KEY),
    authdomain: String(envVariable.VITE_AUTH_DOMAIN),
    projectid: String(envVariable.VITE_PROJECT_ID),
    storagebucket: String(envVariable.VITE_STORAGE_BUCKET),
    messagingsenderid: String(envVariable.VITE_MESSAGING_SENDER_ID),
    appid: String(envVariable.VITE_APP_ID),
    measurementid: String(envVariable.VITE_MEASUREMENT_ID)
}

export default conf