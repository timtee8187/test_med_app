import React, { useEffect, useState, useCallback } from 'react';
import './InstantConsultation.css';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearchIC from '../FindDoctorSearchIC/FindDoctorSearchIC';
import DoctorCardIC from '../DoctorCardIC/DoctorCardIC';

const normalize = (str) => str.toLowerCase().replace(/\s+/g, '').replace(/[^\w]/g, '');

const InstantConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalDoctors, setTotalDoctors] = useState(0);

    const getDoctorsDetails = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');

            if (!response.ok) throw new Error('Failed to fetch doctors');

            const data = await response.json();

            if (!Array.isArray(data)) throw new Error('Invalid data format');

            const processedDoctors = data.map(doctor => ({
                id: doctor.id || Math.random().toString(36).slice(2),
                name: doctor.name || 'Dr. Unknown',
                speciality: doctor.speciality || 'General Physician',
                experience: doctor.experience || 0,
                ratings: doctor.ratings || 0,
                profilePic: doctor.profilePic || '',
                consultationFees: doctor.consultationFees || 'Not specified'
            }));

            setDoctors(processedDoctors);
            setTotalDoctors(processedDoctors.length);

            // Handle initial filtering from URL
            const specialityParam = searchParams.get('speciality');
            if (specialityParam) {
                const filtered = processedDoctors.filter(doctor =>
                    normalize(doctor.speciality).includes(normalize(specialityParam))
                );
                setFilteredDoctors(filtered);
                setIsSearched(true);
            }

        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [searchParams]);

    useEffect(() => {
        getDoctorsDetails();
    }, [getDoctorsDetails]);

    useEffect(() => {
        // Refetch filtered results if speciality changes in the URL
        const specialityParam = searchParams.get('speciality');
        if (specialityParam && doctors.length > 0) {
            const filtered = doctors.filter(doctor =>
                normalize(doctor.speciality).includes(normalize(specialityParam))
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    }, [searchParams, doctors]);

    const handleSearch = (searchText) => {
        const searchTerm = normalize(searchText);
        if (!searchTerm) {
            setFilteredDoctors([]);
            setIsSearched(false);
            return;
        }

        const results = doctors.filter(doctor =>
            normalize(doctor.speciality).includes(searchTerm) ||
            normalize(doctor.name).includes(searchTerm)
        );

        setFilteredDoctors(results);
        setIsSearched(true);
    };

    if (isLoading) {
        return <div className="searchpage-container"><p>Loading doctors...</p></div>;
    }

    if (error) {
        return <div className="searchpage-container"><p className="error-message">{error}</p></div>;
    }

    return (
        <div className="searchpage-container">
            <FindDoctorSearchIC onSearch={handleSearch} />

            <div className="search-results-container">
                {isSearched ? (
                    <>
                        <h2>{filteredDoctors.length} doctors available</h2>
                        <h3>Book appointments with minimum wait-time</h3>
                        <div className="doctors-grid">
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => (
                                    <DoctorCardIC key={doctor.id} {...doctor} />
                                ))
                            ) : (
                                <p>No doctors found matching your search.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <h2>{totalDoctors} doctors available</h2>
                        <h3>Search by speciality or doctor name</h3>
                        <div className="doctors-grid">
                            {doctors.map(doctor => (
                                <DoctorCardIC key={doctor.id} {...doctor} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InstantConsultation;
