import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist', 'General Physician', 'Dermatologist', 
    'ENT Specialist', 'Homeopath', 'Ayurveda', 'Cardiologist',
    'Pediatrician', 'Neurologist', 'Orthopedic', 'Psychiatrist'
];

const FindDoctorSearchIC = ({ onSearch }) => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        onSearch(speciality);
        navigate(`/instant-consultation?speciality=${speciality}`);
    };

    const handleInputChange = (e) => {
        setSearchDoctor(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className='finddoctor-container'>
            <h1>Find a doctor and Consult instantly</h1>
            <div className="doctor-icon">
                <i className="fa fa-user-md"></i>
            </div>
            <div className="home-search-container">
                <div className="doctor-search-box">
                    <input 
                        type="text" 
                        className="search-doctor-input-box" 
                        placeholder="Search doctors by name or specialty..." 
                        onFocus={() => setDoctorResultHidden(false)}
                        onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
                        value={searchDoctor} 
                        onChange={handleInputChange} 
                    />
                    <div className="findiconimg">
                        <i className="fa fa-search"></i>
                    </div>
                    <div className="search-doctor-input-results" hidden={doctorResultHidden || !searchDoctor}>
                        {specialities
                            .filter(speciality => 
                                speciality.toLowerCase().includes(searchDoctor.toLowerCase())
                            )
                            .map(speciality => (
                                <div 
                                    className="search-doctor-result-item" 
                                    key={speciality} 
                                    onMouseDown={() => handleDoctorSelect(speciality)}
                                >
                                    <span><i className="fa fa-search"></i></span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindDoctorSearchIC;