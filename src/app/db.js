import PouchDB from 'pouchdb';

function DB() {
    const db = new PouchDB('exchange');

    const getPassphrase = async () => {
        const passphrase = await db.allDocs({ include_docs: true })
        return passphrase.rows
    }

    const addPassphrase = async (passphraseData) => {
        const res = await db.post(passphraseData) 
        return res
    }

    const clearData = async () => {
        const res = await db.destroy()
        return res
    }

    return {
        getPassphrase,
        addPassphrase,
        clearData
    }
}

export default DB
