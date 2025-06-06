// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const signup = async (userData) => {
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const existingUser = users.find(u => u.email === userData.email);
    
//     if (existingUser) {
//       throw new Error('User already exists');
//     }

//     if (userData.email === 'admin@agriguide.com') {
//       throw new Error('Cannot create admin account');
//     }

//     const { confirmPassword, ...userDataWithoutConfirm } = userData;
//     const newUser = { 
//       id: Date.now(), 
//       ...userDataWithoutConfirm,
//       role: 'user'
//     };
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
    
//     const userWithoutPassword = { ...newUser };
//     delete userWithoutPassword.password;
    
//     setUser(userWithoutPassword);
//     localStorage.setItem('user', JSON.stringify(userWithoutPassword));
//   };

//   const login = async (email, password) => {
//     if (email === 'admin@agriguide.com' && password === 'admin123') {
//       const adminUser = {
//         id: 'admin',
//         email: 'admin@agriguide.com',
//         role: 'admin',
//         fullName: 'Admin User'
//       };
//       setUser(adminUser);
//       localStorage.setItem('user', JSON.stringify(adminUser));
//       return;
//     }

//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find(u => u.email === email && u.password === password);
    
//     if (!user) {
//       throw new Error('Invalid credentials');
//     }

//     const userWithoutPassword = { ...user };
//     delete userWithoutPassword.password;
    
//     setUser(userWithoutPassword);
//     localStorage.setItem('user', JSON.stringify(userWithoutPassword));
//   };

//   const logout = async () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   const isAdmin = () => {
//     return user?.role === 'admin';
//   };

//   const updateProfile = async (updatedData) => {
//     if (!user) return;

//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const updatedUsers = users.map(u => 
//       u.id === user.id ? { ...u, ...updatedData } : u
//     );
//     localStorage.setItem('users', JSON.stringify(updatedUsers));
    
//     const updatedUser = { ...user, ...updatedData };
//     setUser(updatedUser);
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//   };

//   const value = {
//     user,
//     loading,
//     signup,
//     login,
//     logout,
//     isAdmin,
//     updateProfile
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === userData.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    if (userData.email === 'admin@agriguide.com') {
      throw new Error('Cannot create admin account');
    }

    const { confirmPassword, ...userDataWithoutConfirm } = userData;
    const newUser = { 
      id: Date.now(), 
      ...userDataWithoutConfirm,
      role: 'user'
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;

    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const login = async (email, password) => {
    if (email === 'admin@agriguide.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin',
        email: 'admin@agriguide.com',
        role: 'admin',
        fullName: 'Admin User'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    setUser(userWithoutPassword);
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const updateProfile = async (updatedData) => {
    if (!user) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...updatedData } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    isAdmin,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
