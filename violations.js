document.addEventListener('DOMContentLoaded', () => {
    // Sample data for existing violations (this will come from the backend in a real scenario)
    const violations = [
        { id: 1, vehicleNumber: 'TN45AB1234', violationType: 'Over Speeding', date: '2024-10-01', fineAmount: 1000, status: 'Unpaid' },
        { id: 2, vehicleNumber: 'TN12BC5678', violationType: 'Signal Jumping', date: '2024-09-30', fineAmount: 500, status: 'Paid' },
        { id: 3, vehicleNumber: 'TN34XY9012', violationType: 'No Seatbelt', date: '2024-09-29', fineAmount: 500, status: 'Unpaid' },
        { id: 4, vehicleNumber: 'TN18XZ0001', violationType: 'Wrong Parking', date: '2024-09-28', fineAmount: 750, status: 'Unpaid' },
        { id: 5, vehicleNumber: 'TN22YY2222', violationType: 'Using Mobile While Driving', date: '2024-09-27', fineAmount: 2000, status: 'Unpaid' },
        { id: 6, vehicleNumber: 'TN56FF7777', violationType: 'Expired Registration', date: '2024-09-26', fineAmount: 1000, status: 'Unpaid' },
        { id: 7, vehicleNumber: 'TN98GH1234', violationType: 'Driving Without License', date: '2024-09-25', fineAmount: 1500, status: 'Unpaid' },
        { id: 8, vehicleNumber: 'TN77JK5678', violationType: 'Loud Music', date: '2024-09-24', fineAmount: 300, status: 'Unpaid' },
        { id: 9, vehicleNumber: 'TN11LM9012', violationType: 'Illegal U-Turn', date: '2024-09-23', fineAmount: 800, status: 'Unpaid' },
        { id: 10, vehicleNumber: 'TN44MN3456', violationType: 'Not Wearing Helmet', date: '2024-09-22', fineAmount: 500, status: 'Unpaid' },
        { id: 11, vehicleNumber: 'TN23OP6789', violationType: 'Obstructing Traffic', date: '2024-09-21', fineAmount: 1200, status: 'Unpaid' },
        { id: 12, vehicleNumber: 'TN88QR1234', violationType: 'Driving in Restricted Area', date: '2024-09-20', fineAmount: 2500, status: 'Unpaid' },
        { id: 13, vehicleNumber: 'TN65ST5678', violationType: 'Failure to Stop at Red Light', date: '2024-09-19', fineAmount: 900, status: 'Unpaid' },
        { id: 14, vehicleNumber: 'TN12AB3456', violationType: 'Parking in No-Parking Zone', date: '2024-09-18', fineAmount: 600, status: 'Unpaid' },
        { id: 15, vehicleNumber: 'TN43CD7890', violationType: 'Drunk Driving', date: '2024-09-17', fineAmount: 5000, status: 'Unpaid' },
        { id: 16, vehicleNumber: 'TN98EF1234', violationType: 'Illegal Modification', date: '2024-09-16', fineAmount: 1200, status: 'Unpaid' },
    ];

    const tableBody = document.querySelector('#violations-table tbody');

    // Function to render violations in the table
    function renderViolations() {
        tableBody.innerHTML = '';
        violations.forEach(violation => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${violation.vehicleNumber}</td>
                <td>${violation.violationType}</td>
                <td>${violation.date}</td>
                <td>₹${violation.fineAmount}</td>
                <td>${violation.status}</td>
                <td>
                    <button class="btn edit-btn" data-id="${violation.id}">Edit</button>
                    <button class="btn delete-btn" data-id="${violation.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Add event listeners for Edit and Delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', handleEditViolation));
        document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleDeleteViolation));
    }

    // Function to handle adding a new violation
    document.querySelector('#add-violation-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const vehicleNumber = document.querySelector('#vehicleNumber').value;
        const violationType = document.querySelector('#violationType').value;
        const fineAmount = document.querySelector('#fineAmount').value;

        const newViolation = {
            id: violations.length + 1,
            vehicleNumber,
            violationType,
            date: new Date().toISOString().split('T')[0], // Current date
            fineAmount,
            status: 'Unpaid'
        };

        violations.push(newViolation);
        renderViolations();

        // Reset the form
        document.querySelector('#add-violation-form').reset();
    });

    // Function to handle editing a violation
    function handleEditViolation(e) {
        const violationId = e.target.dataset.id;
        const violation = violations.find(v => v.id == violationId);
        
        const newType = prompt('Enter new violation type:', violation.violationType);
        const newAmount = prompt('Enter new fine amount:', violation.fineAmount);

        if (newType !== null && newAmount !== null) {
            violation.violationType = newType;
            violation.fineAmount = newAmount;
            renderViolations();
        }
    }

    // Function to handle deleting a violation
    function handleDeleteViolation(e) {
        const violationId = e.target.dataset.id;
        const violationIndex = violations.findIndex(v => v.id == violationId);

        if (violationIndex !== -1) {
            violations.splice(violationIndex, 1);
            renderViolations();
        }
    }

    // Initial render of violations
    renderViolations();
});
