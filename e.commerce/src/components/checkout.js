    import React, { useState } from 'react';
    import { useApp } from '../context/AppContext';
    import { CreditCard, Check } from 'lucide-react';

    const Checkout = () => {
      const { cart, clearCart, setCurrentView, setOrders } = useApp();
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: ''
      });
      const [isProcessing, setIsProcessing] = useState(false);
      const [orderComplete, setOrderComplete] = useState(false);

      const handleInputChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        // Checkout logic here...
      };

      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Checkout form and summary here... */}
        </div>
      );
    };

    export default Checkout;
    