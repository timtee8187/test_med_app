import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        
        const data = await response.json();
        setReports(data.reports || []); // Assuming API returns { reports: [...] }
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleViewReport = (reportId) => {
    // Open report in new tab
    window.open(`/reports/${reportId}`, '_blank');
  };

  const handleDownloadReport = (reportId, reportName) => {
    // Create a temporary link to trigger download
    const link = document.createElement('a');
    link.href = `/patient_report.pdf`; // Path to your PDF in public folder
    link.download = `${reportName || 'report'}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error loading reports: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="reports-container">
      <h1>Your Medical Reports</h1>
      
      {reports.length > 0 ? (
        <div className="reports-table-container">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={report.id || index}>
                  <td>{index + 1}</td>
                  <td>{report.doctorName || 'Dr. John Doe'}</td>
                  <td>{report.speciality || 'General Medicine'}</td>
                  <td className="actions-cell">
                    <button 
                      className="view-btn"
                      onClick={() => handleViewReport(report.id || index)}
                    >
                      View Report
                    </button>
                    <button 
                      className="download-btn"
                      onClick={() => handleDownloadReport(report.id || index, report.reportName)}
                    >
                      Download Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-reports">
          <p>No reports available yet.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsLayout;