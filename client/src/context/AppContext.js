import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({});

    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
};
