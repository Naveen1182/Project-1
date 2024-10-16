document.addEventListener('DOMContentLoaded', () => {
    const reportForm = document.getElementById('report-form');
    const reportTypeSelect = document.getElementById('report-type');
    const dateRange = document.getElementById('date-range');
    const reportOutput = document.getElementById('report-output');
    const reportContent = document.getElementById('report-content');

    // Show date range inputs when "Violations by Date" is selected
    reportTypeSelect.addEventListener('change', () => {
        if (reportTypeSelect.value === 'by-date') {
            dateRange.style.display = 'block';
        } else {
            dateRange.style.display = 'none';
        }
    });

    // Handle report generation
    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const reportType = reportTypeSelect.value;
        let reportData = '';

        if (reportType === 'all') {
            reportData = generateAllViolationsReport();
        } else if (reportType === 'by-date') {
            const startDate = document.getElementById('start-date').value;
            const endDate = document.getElementById('end-date').value;
            reportData = generateViolationsByDateReport(startDate, endDate);
        }

        // Display report
        reportContent.textContent = reportData;
        reportOutput.style.display = 'block';
    });

    // Sample function to generate a report for all violations
    function generateAllViolationsReport() {
        // Sample violations data (same as in the previous examples)
        const violations = [
            { vehicleNumber: 'TN45AB1234', violationType: 'Over Speeding', date: '2024-10-01', fineAmount: 1000, status: 'Unpaid' },
            { vehicleNumber: 'TN12BC5678', violationType: 'Signal Jumping', date: '2024-09-25', fineAmount: 500, status: 'Paid' },
            { vehicleNumber: 'TN23CD9101', violationType: 'No Seatbelt', date: '2024-10-02', fineAmount: 300, status: 'Unpaid' },
            { vehicleNumber: 'TN34EF2345', violationType: 'Parking Violation', date: '2024-10-03', fineAmount: 800, status: 'Paid' },
            { vehicleNumber: 'TN45GH6789', violationType: 'Reckless Driving', date: '2024-09-30', fineAmount: 1500, status: 'Unpaid' }
        ];

        let report = 'All Violations Report:\n\n';
        report += 'Vehicle Number | Violation Type | Date       | Fine Amount | Status\n';
        report += '------------------------------------------------------------------\n';

        violations.forEach(v => {
            report += `${v.vehicleNumber} | ${v.violationType} | ${v.date} | ₹${v.fineAmount} | ${v.status}\n`;
        });

        return report;
    }

    // Sample function to generate a report for violations by date
    function generateViolationsByDateReport(startDate, endDate) {
        // Sample violations data
        const violations = [
            { vehicleNumber: 'TN45AB1234', violationType: 'Over Speeding', date: '2024-10-01', fineAmount: 1000, status: 'Unpaid' },
            { vehicleNumber: 'TN12BC5678', violationType: 'Signal Jumping', date: '2024-09-25', fineAmount: 500, status: 'Paid' },
            { vehicleNumber: 'TN23CD9101', violationType: 'No Seatbelt', date: '2024-10-02', fineAmount: 300, status: 'Unpaid' },
            { vehicleNumber: 'TN34EF2345', violationType: 'Parking Violation', date: '2024-10-03', fineAmount: 800, status: 'Paid' },
            { vehicleNumber: 'TN45GH6789', violationType: 'Reckless Driving', date: '2024-09-30', fineAmount: 1500, status: 'Unpaid' }
        ];

        // Filter violations by date
        const filteredViolations = violations.filter(v => v.date >= startDate && v.date <= endDate);

        let report = `Violations from ${startDate} to ${endDate}:\n\n`;
        report += 'Vehicle Number | Violation Type | Date       | Fine Amount | Status\n';
        report += '------------------------------------------------------------------\n';

        if (filteredViolations.length === 0) {
            return `No violations found between ${startDate} and ${endDate}.`;
        }

        filteredViolations.forEach(v => {
            report += `${v.vehicleNumber} | ${v.violationType} | ${v.date} | ₹${v.fineAmount} | ${v.status}\n`;
        });

        return report;
    }
});
