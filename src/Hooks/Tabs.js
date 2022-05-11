import { useState } from 'react';


function useTabs(initTabVal) {
    const  [tabValue, setTabValue] = useState(initTabVal);

    const handleTabChange = (e, newValue) => {
        setTabValue(newValue);
    }

    return {
        tabValue,
        handleTabChange
    }
}

export default useTabs;