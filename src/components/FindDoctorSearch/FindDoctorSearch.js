import React, { useState } from 'react';
import './FindDoctorSearch.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 
    'Dermatologist', 'Ear-nose-throat (ent) Specialist', 
    'Homeopath', 'Ayurveda'
];

const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Mumbai', 'Delhi'];
const experienceRanges = ['0-5 years', '5-10 years', '10+ years'];

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedExperience, setSelectedExperience] = useState('');
    const [specialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}&location=${selectedLocation}&experience=${selectedExperience}`);
        window.location.reload();
    };

    const handleSearchChange = (e) => {
        setSearchDoctor(e.target.value);
    };

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
    };

    const handleExperienceChange = (e) => {
        setSelectedExperience(e.target.value);
    };

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
                            onFocus={() => setDoctorResultHidden(false)} 
                            onBlur={() => setDoctorResultHidden(true)} 
                            value={searchDoctor} 
                            onChange={handleSearchChange}
                        />
                        
                        <div className="findiconimg">
                            <img className='findIcon' src={process.env.PUBLIC_URL + '/images/search.svg'} alt=""/>
                        </div>
                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {specialities.map(speciality => (
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
                                    <span>SPECIALITY</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Additional Filters */}
                <div className="filter-container" style={{marginTop: '20px'}}>
                    <select 
                        className="filter-select"
                        value={selectedLocation}
                        onChange={handleLocationChange}
                    >
                        <option value="">All Locations</option>
                        {locations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>

                    <select 
                        className="filter-select"
                        value={selectedExperience}
                        onChange={handleExperienceChange}
                        style={{marginLeft: '10px'}}
                    >
                        <option value="">Any Experience</option>
                        {experienceRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                        ))}
                    </select>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearch;