import CryptoJS from 'crypto-js';
import { useSelector } from 'react-redux';

function useEncrypt() {
    const key = useSelector(state => state.deviceFingerprint.deviceFingerprint)

    const encryptString = (text) => {
        const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
        return encryptedText
    };

    const decryptString = (ciphertext) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const originalText = bytes?.toString(CryptoJS.enc.Utf8);
        return originalText;
    };

    return {
        encryptString,
        decryptString
    }

}

export default useEncrypt