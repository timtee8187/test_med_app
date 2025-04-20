import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const specialties = [
    'Dentist',
    'Gynecologist/Obstetrician',
    'General Physician',
    'Dermatologist',
    'ENT Specialist',
    'Homeopath',
    'Ayurveda',
    'Cardiologist',
    'Pediatrician',
    'Neurologist',
    'Orthopedic',
    'Psychiatrist'
];

const FindDoctorSearchIC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [filteredSpecialties, setFilteredSpecialties] = useState(specialties);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        const filtered = specialties.filter(specialty =>
            specialty.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSpecialties(filtered);
    };

    const handleSpecialtySelect = (specialty) => {
        setSearchQuery(specialty);
        setShowResults(false);
        navigate(`/instant-consultation?specialty=${encodeURIComponent(specialty)}`);
    };

    const handleFocus = () => {
        setShowResults(true);
    };

    const handleBlur = () => {
        setTimeout(() => setShowResults(false), 200);
    };

    return (
        <div className="finddoctor-container">
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div className="doctor-icon">
                    <i className="fa fa-user-md"></i>
                </div>
                <div className="home-search-container">
                    <div className="doctor-search-box">
                        <input
                            type="text"
                            className="search-doctor-input-box"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            value={searchQuery}
                            onChange={handleInputChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <button className="findiconimg">
                            <img 
                                src={process.env.PUBLIC_URL + '/images/search.svg'} 
                                alt="Search"
                                className="findIcon"
                            />
                        </button>
                        {showResults && (
                            <div className="search-doctor-input-results">
                                {filteredSpecialties.length > 0 ? (
                                    filteredSpecialties.map(specialty => (
                                        <div
                                            className="search-doctor-result-item"
                                            key={specialty}
                                            onMouseDown={() => handleSpecialtySelect(specialty)}
                                        >
                                            <span>
                                                <img 
                                                    src={process.env.PUBLIC_URL + '/images/search.svg'} 
                                                    alt=""
                                                    style={{height:"10px", width:"10px"}}
                                                />
                                            </span>
                                            <span>{specialty}</span>
                                            <span>SPECIALITY</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="search-doctor-result-item no-results">
                                        <span>No specialties found</span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearchIC;