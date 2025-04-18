import React, { useState, useEffect } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
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

const FindDoctorSearchIC = ({ onSearch }) => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [filteredSpecialties, setFilteredSpecialties] = useState(initSpeciality);
    const navigate = useNavigate();

    useEffect(() => {
        const filtered = initSpeciality.filter(speciality =>
            speciality.toLowerCase().includes(searchDoctor.toLowerCase())
        );
        setFilteredSpecialties(filtered);
    }, [searchDoctor]);

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        if (onSearch) onSearch(speciality);
        navigate(`/instant-consultation?speciality=${encodeURIComponent(speciality)}`);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchDoctor(value);
        if (onSearch) onSearch(value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchDoctor.trim()) {
            if (onSearch) onSearch(searchDoctor);
            navigate(`/instant-consultation?query=${encodeURIComponent(searchDoctor)}`);
        }
    };

    return (
        <div className="finddoctor-container">
            <h1>Find a doctor and Consult instantly</h1>
            <div className="doctor-icon">
                <i className="fa fa-user-md"></i>
            </div>
            
            <form className="home-search-container" onSubmit={handleSearchSubmit}>
                <div className="doctor-search-box">
                    <input
                        type="text"
                        className="search-doctor-input-box"
                        placeholder="Search doctors, clinics, hospitals, etc."
                        value={searchDoctor}
                        onChange={handleInputChange}
                        onFocus={() => setDoctorResultHidden(false)}
                        onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit(e)}
                    />
                    
                    <button type="submit" className="findiconimg">
                        <img 
                            src={process.env.PUBLIC_URL + '/images/search.svg'} 
                            alt="Search"
                            className="findIcon"
                        />
                    </button>
                    
                    <div className="search-doctor-input-results" hidden={doctorResultHidden || !searchDoctor}>
                        {filteredSpecialties.length > 0 ? (
                            filteredSpecialties.map(speciality => (
                                <div
                                    className="search-doctor-result-item"
                                    key={speciality}
                                    onMouseDown={() => handleDoctorSelect(speciality)}
                                >
                                    <span>
                                        <img 
                                            src={process.env.PUBLIC_URL + '/images/search.svg'} 
                                            alt=""
                                            style={{height: "10px", width: "10px"}}
                                        />
                                    </span>
                                    <span>{speciality}</span>
                                    <span>SPECIALITY</span>
                                </div>
                            ))
                        ) : (
                            <div className="search-doctor-result-item no-results">
                                <span>No specialties found</span>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FindDoctorSearchIC;