import create from 'zustand'

export const useUserStore = create(set => ({
    authData: JSON.parse(localStorage.getItem('authData')),
    setAuthentication: (isAuthenticated, name) => {
      let authData = {isAuthenticated, name}
      localStorage.setItem('authData', JSON.stringify(authData));
      set({authData});
    }
}));
