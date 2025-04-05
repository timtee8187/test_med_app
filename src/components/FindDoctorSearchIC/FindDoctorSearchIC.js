import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 
    'Gynecologist/obstetrician', 
    'General Physician', 
    'Dermatologist', 
    'Ear-nose-throat (ent) Specialist', 
    'Homeopath', 
    'Ayurveda'
];

// Updated doctor counts with balanced distribution
const specialtyCounts = {
    'Dentist': 3,
    'Gynecologist/obstetrician': 2,
    'General Physician': 4,
    'Dermatologist': 2,
    'Ear-nose-throat (ent) Specialist': 2,
    'Homeopath': 2,
    'Ayurveda': 2
};

const FindDoctorSearchIC = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
    };

    const filteredSpecialities = specialities.filter(spec =>
        spec.toLowerCase().includes(searchDoctor.toLowerCase())
    );

    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div>
                    <i style={{color:'#000000', fontSize:'20rem'}} className="fa fa-user-md"></i>
                </div>
                <div className="home-search-container" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div className="doctor-search-box">
                        <input 
                            type="text" 
                            className="search-doctor-input-box" 
                            placeholder="Search doctors, clinics, hospitals, etc." 
                            value={searchDoctor}
                            onChange={(e) => {
                                setSearchDoctor(e.target.value);
                                setDoctorResultHidden(false);
                            }}
                            onFocus={() => setDoctorResultHidden(false)}
                            onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
                        />
                        
                        <div className="findiconimg">
                            <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt=""/>
                        </div>
                        
                        <div className="search-doctor-input-results" hidden={doctorResultHidden || filteredSpecialities.length === 0}>
                            {filteredSpecialities.map(speciality => (
                                <div 
                                    className="search-doctor-result-item" 
                                    key={speciality}
                                    onMouseDown={() => handleDoctorSelect(speciality)}
                                >
                                    <span>
                                        <img 
                                            src={process.env.PUBLIC_URL + '/images/search.svg'} 
                                            alt="" 
                                            style={{height:"10px", width:"10px"}} 
                                            width="12" 
                                        />
                                    </span>
                                    <span>{speciality}</span>
                                    <span className="speciality-count">
                                        ({specialtyCounts[speciality] || 0} doctors available)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearchIC;