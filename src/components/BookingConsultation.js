import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from './FindDoctorSearchIC/FindDoctorSearchIC'; // Verified path
import DoctorCardIC from './DoctorCardIC/DoctorCardIC'; // Verified path
import './BookingConsultation.css'; // Need to create this file

const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    
    const getDoctorsDetails = useCallback(() => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            if (searchParams.get('speciality')) {
                const filtered = data.filter(doctor => 
                    doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase()
                );
                setFilteredDoctors(filtered);
                setIsSearched(true);
            } else {
                setFilteredDoctors([]);
                setIsSearched(false);
            }
            setDoctors(data);
        })
        .catch(err => console.error('Error fetching doctors:', err));
    }, [searchParams]);

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) => doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    useEffect(() => {
        getDoctorsDetails();
    }, [getDoctorsDetails]);

    return (
        <center>
            <div className="booking-container">
                <h1>Book Your Consultation</h1>
                <div className="search-container">
                    <FindDoctorSearchIC onSearch={handleSearch} />
                </div>
                <div className="results-container">
                    {isSearched ? (
                        <>
                            <h2>{filteredDoctors.length} doctors available {searchParams.get('location') ? `in ${searchParams.get('location')}` : ''}</h2>
                            <h3>Select a doctor to book your appointment</h3>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <DoctorCardIC 
                                        className="doctor-card" 
                                        key={`${doctor.name}-${doctor.speciality}`}
                                        name={doctor.name}
                                        speciality={doctor.speciality}
                                        experience={doctor.experience}
                                        ratings={doctor.ratings}
                                        profilePic={doctor.profilePic}
                                    />
                                ))
                            ) : (
                                <p>No doctors found matching your search.</p>
                            )}
                        </>
                    ) : (
                        <div className="search-prompt">
                            <i className="fa fa-search" style={{fontSize: '48px', color: '#3f51b5'}}></i>
                            <p>Search for a doctor to begin your booking</p>
                        </div>
                    )}
                </div>
            </div>
        </center>
    );
};

export default BookingConsultation;