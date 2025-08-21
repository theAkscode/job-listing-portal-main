import {createContext} from 'react';

export const AuthContext = createContext({
        isLoggedIn:false,
        userType:'',
        userTypeId:'',
        login: () => {},
        logout: () => {}
    }
);