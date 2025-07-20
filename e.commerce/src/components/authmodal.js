   import React, { useState } from 'react';
   import { useApp } from '../context/AppContext';
   import { Eye, EyeOff, X } from 'lucide-react';

   const AuthModal = () => {
     const { showAuthModal, setShowAuthModal, authMode, setAuthMode, setUser  } = useApp();
     const [formData, setFormData] = useState({
       name: '',
       email: '',
       password: '',
       confirmPassword: ''
     });
     const [showPassword, setShowPassword] = useState(false);

     const handleInputChange = (e) => {
       setFormData({
         ...formData,
         [e.target.name]: e.target.value
       });
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       // Authentication logic here...
     };

     if (!showAuthModal) return null;

     return (
       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
         {/* Modal content here... */}
       </div>
     );
   };

   export default AuthModal;
   