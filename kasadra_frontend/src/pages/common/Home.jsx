import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../styles/Home.css';
import { Link } from 'react-router-dom';
import learningImg from '../../assets/Learning.png';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container " >
                <div className='text-containers  h-100   '>

                    <h2 className="fw-bold">Welcome to DigiDense</h2>
                    <h2 className="text-bold">Learning platform</h2>

                    <br />
                    <Link to="/student-signup" className="text-decoration-none">
                        <button className="btn btn-info">Let get Started</button>
                    </Link>
                </div>

                <div className="image-container col-md-6 text-center mt-4 mt-md-0">
                    <img src={learningImg} alt="Learning" className="img-fluid" />
                </div>
            </div>


            <Footer />
        </div>
    );
};

export default Home;
