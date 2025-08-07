import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import technetlogo from './Assets/technetlogo.png'; // σωστή διαδρομή
import { FaPhone, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';

function ContactInfo() {
  return (
    <div style={{
      backgroundColor: '#f7f9fc',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(10, 61, 98, 0.1)',
      maxWidth: '700px',
      margin: '40px auto',
      color: '#0a3d62',
      textAlign: 'center',
      fontSize: '18px',
      lineHeight: '1.8'
    }}>
      <h2>Επικοινωνήστε μαζί μας</h2>
      <p><FaPhone style={{ marginRight: '8px', color: '#0a3d62' }} /> Τηλέφωνο: <a href="tel:+306934086944" style={{ color: '#0a3d62', textDecoration: 'none' }}>+306934086944</a></p>
      <p><FaEnvelope style={{ marginRight: '8px', color: '#0a3d62' }} /> Email: <a href="mailto:akiskarou@gmail.com" style={{ color: '#0a3d62', textDecoration: 'none' }}>akiskarou@gmail.com</a></p>
      <p>
        <FaInstagram style={{ marginRight: '8px', color: '#E1306C' }} /> Instagram: 
        <a href="https://www.instagram.com/tech.net_solutions" target="_blank" rel="noreferrer" style={{ color: '#E1306C', textDecoration: 'none', marginLeft: '5px' }}>
          @tech.net_solutions
        </a>
      </p>
      <p>
        <FaFacebook style={{ marginRight: '8px', color: '#3b5998' }} /> Facebook: 
        <a href="https://www.facebook.com/profile.php?id=61568138280923" target="_blank" rel="noreferrer" style={{ color: '#3b5998', textDecoration: 'none', marginLeft: '5px' }}>
          TechNet Solutions
        </a>
      </p>
    </div>
  );
}

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div>
        <h1>Καλώς ορίσατε στην TechNet Solutions!</h1>
        <p>Αυτή η σελίδα είναι προς το παρόν κενή.</p>
        <p>Μπορείτε να δείτε τις υπηρεσίες μας ή να κάνετε αίτηση αν χρειάζεστε βοήθεια.</p>
      </div>

      <ContactInfo />
    </motion.div>
  );
}

function Services() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Υπηρεσίες</h1>
      <ul style={{ lineHeight: '1.8', fontSize: '18px', color: '#0a3d62' }}>
        <li>Επισκευή Laptop</li>
        <li>Αλλαγή Οθόνης Laptop</li>
        <li>Εγκατάσταση Οθόνης Αυτοκινήτου</li>
        <li>Δημιουργία Ιστοσελίδας</li>
        <li>Δημιουργία Εφαρμογών</li>
        <li>Καθαρισμός από Ιούς</li>
      </ul>
    </motion.div>
  );
}

function RequestRepair() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/request', {  // <== Σωστό endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Η αίτηση εστάλη με επιτυχία!');
        setFormData({ name: '', email: '', service: '', description: '' });
      } else {
        alert('Προέκυψε σφάλμα στην αποστολή. Προσπαθήστε ξανά.');
      }
    } catch (error) {
      alert('Σφάλμα σύνδεσης με τον διακομιστή.');
      console.error('Error:', error);
    }

    const button = document.querySelector('button[type="submit"]');
    if(button){
      button.classList.add('flip');
      setTimeout(() => button.classList.remove('flip'), 600);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1>Αίτηση Επισκευής</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Όνομα:<br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Email:<br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br /><br />

        <label>
          Υπηρεσία:<br />
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
          >
            <option value="">-- Επίλεξε --</option>
            <option value="Επισκευή Laptop">Επισκευή Laptop</option>
            <option value="Αλλαγή Οθόνης Laptop">Αλλαγή Οθόνης Laptop</option>
            <option value="Εγκατάσταση Οθόνης Αυτοκινήτου">Εγκατάσταση Οθόνης Αυτοκινήτου</option>
            <option value="Δημιουργία Ιστοσελίδας">Δημιουργία Ιστοσελίδας</option>
            <option value="Δημιουργία Εφαρμογών">Δημιουργία Εφαρμογών</option>
            <option value="Καθαρισμός από Ιούς">Καθαρισμός από Ιούς</option>
          </select>
        </label>
        <br /><br />

        <label>
          Περιγραφή Προβλήματος:<br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </label>
        <br /><br />

        <button type="submit">Υποβολή Αίτησης</button>
      </form>
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ padding: 20, borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', backgroundColor: '#0a3d62' }}>
        <img src={technetlogo} alt="TechNet Logo" style={{ height: '40px', marginRight: '20px' }} />
        <Link to="/" style={{ margin: 10, color: '#f5f6fa', fontWeight: '600', fontSize: '18px', textDecoration: 'none' }}>Αρχική</Link>
        <Link to="/services" style={{ margin: 10, color: '#f5f6fa', fontWeight: '600', fontSize: '18px', textDecoration: 'none' }}>Υπηρεσίες</Link>
        <Link to="/request-repair" style={{ margin: 10, color: '#f5f6fa', fontWeight: '600', fontSize: '18px', textDecoration: 'none' }}>Αίτηση Επισκευής</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/request-repair" element={<RequestRepair />} />
      </Routes>
    </Router>
  );
}

export default App;
