export const ALGORAND = 'ALGORAND';
export const RIPPLE = 'RIPPLE';
export const ALGO = 'algo';
export const XRP = 'xrp';
export const ALGORAND_TEST_NET = 'ALGORAND_TEST_NET';
export const ALGORAND_MAIN_NET = 'ALGORAND_MAIN_NET';

export const networkDataToReturn = { 
    algorand(state) {
        return state.algorand.activeWallet
    },
    ripple(state) {
        return state.algorand.activeWallet
    }
}

export const coinToReturn = {
    algorand: 'algo',
    ripple: 'xrp'
}

