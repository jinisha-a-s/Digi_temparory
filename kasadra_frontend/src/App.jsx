import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AppRoutes from './routes/AppRoutes.jsx';
import { Toaster } from "react-hot-toast";


const App = () => {
    return (
        <Router>
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        marginTop: "100px",
                    },
                }}
            />
            <AppRoutes />
        </Router>
    );
};

export default App;
