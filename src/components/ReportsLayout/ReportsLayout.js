import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://api.npoint.io/9a5543d36f1460da2f63');
        
        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        
        const data = await response.json();
        
        // Transform API data to match our expected structure
        const formattedReports = data.map((report, index) => ({
          id: index + 1,
          doctorName: report.name || `Dr. ${report.doctor}`,
          speciality: report.speciality || 'General Medicine',
          reportUrl: report.reportUrl || '/patient_report.pdf'
        }));
        
        setReports(formattedReports);
        setError(null);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError(err.message);
        setReports([]); // Clear reports on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleViewReport = (reportUrl) => {
    window.open(reportUrl, '_blank');
  };

  const handleDownloadReport = (reportUrl, doctorName) => {
    const link = document.createElement('a');
    link.href = '/patient_report.pdf'; // Always use the same PDF file
    link.download = `Patient_Report_${doctorName.replace(/\s+/g, '_')}.pdf`;
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
      <h1>Reports</h1>
      
      {reports.length > 0 ? (
        <div className="table-responsive">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Speciality</th>
                <th>View Report</th>
                <th>Download Report</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.doctorName}</td>
                  <td>{report.speciality}</td>
                  <td>
                    <button 
                      className="view-btn"
                      onClick={() => handleViewReport(report.reportUrl)}
                    >
                      View Report
                    </button>
                  </td>
                  <td>
                    <button 
                      className="download-btn"
                      onClick={() => handleDownloadReport(report.reportUrl, report.doctorName)}
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
          <p>No reports available</p>
        </div>
      )}
    </div>
  );
};

export default ReportsLayout;