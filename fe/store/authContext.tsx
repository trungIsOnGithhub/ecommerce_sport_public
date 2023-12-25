import { createContext, useEffect, useReducer } from 'react';
import authService from '../services/authService';

// Interface
interface InitStateType {
    name: string;
    phone: string;
    email: string;
    photo: string;
    role: string;
    gender: string;
    dateOfBirth: string;
    address: string;
    isLoginIn: boolean;
}

interface ActionType {
    type: string;
    payload: any;
}

interface ChildrenProps {
    children: React.ReactNode;
}

// Reducer event name
enum ActionKind {
    SET_USER = 'SET_USER',
}

// Initial State
const initState: InitStateType = {
    name: '',
    phone: '',
    email: '',
    photo: '',
    role: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    isLoginIn: false,
};

// Reducer
const reducer = (state: InitStateType, action: ActionType) => {
    const { type, payload } = action;
    switch (type) {
        case ActionKind.SET_USER:
            return { ...state, ...payload };
        default:
            return state;
    }
};

// Create context
const AuthContext = createContext<{
    state: InitStateType;
    dispatch: React.Dispatch<ActionType>;
}>({
    state: initState,
    dispatch: () => null,
});

const AuthContextProvider = ({ children }: ChildrenProps) => {
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        const getUser = async () => {
            try {
                const user = await authService.getCurrentUser();
                dispatch({ type: 'SET_USER', payload: { isLoginIn: true, ...user.data.data } });
            } catch (error) {}
        };
        getUser();
    }, [state.isLoginIn, dispatch]);
    return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
