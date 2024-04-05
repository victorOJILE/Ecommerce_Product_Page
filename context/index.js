import { createContext, useContext } from 'react';

export const AppProvider = createContext(null);

export function AppContext() {
	return useContext(AppProvider);
}