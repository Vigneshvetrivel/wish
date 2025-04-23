// Set minimum date to today
function setMinDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const todayFormatted = yyyy + '-' + mm + '-' + dd;
    
    document.getElementById('date').min = todayFormatted;
}

// Vehicle selection setup
function setupVehicleSelection() {
    const vehicleTypes = document.querySelectorAll('.vehicle-type');
    
    vehicleTypes.forEach(vehicle => {
        vehicle.addEventListener('click', () => {
            // Remove selected class from siblings
            const parent = vehicle.parentElement;
            parent.querySelectorAll('.vehicle-type').forEach(v => v.classList.remove('selected'));
            
            // Add selected class to clicked vehicle
            vehicle.classList.add('selected');
        });
    });
}

// Calculate fare based on location data
function calculateFare() {
    const pickup = document.getElementById('pickup').value;
    const dropoff = document.getElementById('dropoff').value;
    
    if (!pickup || !dropoff) {
        alert('Please enter pickup and drop locations');
        return;
    }
    
    // In a real implementation, you would use a mapping API like Google Maps to calculate actual distance
    // Example code for Google Maps Distance Matrix API (you'll need API key):
    /*
    const origin = encodeURIComponent(pickup);
    const destination = encodeURIComponent(dropoff);
    const apiKey = 'YOUR_API_KEY';
    
    fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                const distance = data.rows[0].elements[0].distance.value / 1000; // convert to km
                updateFareDisplay(distance);
            } else {
                alert('Could not calculate distance. Please check your addresses.');
            }
        })
        .catch(error => {
            console.error('Error calculating distance:', error);
            alert('Error calculating distance. Please try again.');
        });
    */
    
    // For demo purposes, using a simple distance calculation
    // In a real implementation, replace this with actual API call as shown above
    
    // Simulate distance calculation with a random distance between 5-30 km
    const distance = Math.floor(Math.random() * 26) + 5;
    updateFareDisplay(distance);
}

// Update fare display with calculated info
function updateFareDisplay(distance) {
    const selectedVehicle = document.querySelector('.vehicle-type.selected');
    const vehicleType = selectedVehicle.getAttribute('data-type');
    const rate = parseFloat(selectedVehicle.getAttribute('data-rate'));
    
    const totalFare = Math.round(distance * rate);
    
    // Update fare estimate display
    document.getElementById('distance').textContent = `${distance} km`;
    document.getElementById('vehicle').textContent = vehicleType;
    document.getElementById('rate').textContent = `₹${rate}`;
    document.getElementById('total').textContent = `₹${totalFare}`;
    
    // Show fare estimate
    document.getElementById('fare').style.display = 'block';
}

// Handle form submission
function setupFormSubmission() {
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const pickup = document.getElementById('pickup').value;
        const dropoff = document.getElementById('dropoff').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const passengers = document.getElementById('passengers').value;
        
        const selectedVehicle = document.querySelector('.vehicle-type.selected');
        const vehicleType = selectedVehicle.getAttribute('data-type');
        
        // In a real application, you would send this data to your server
        // For example using fetch API:
        /*
        const bookingData = {
            name, phone, pickup, dropoff, date, time, passengers, vehicleType
        };
        
        // Google Apps Script Web App URL or your server endpoint
        const apiURL = 'YOUR_API_ENDPOINT';
        
        // Show loading state
        const button = document.querySelector('.submit-btn');
        const originalText = button.textContent;
        button.textContent = 'Processing...';
        button.disabled = true;
        
        fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage();
                document.getElementById('booking-form').reset();
            } else {
                alert('Error: ' + data.message);
            }
            
            // Restore button
            button.textContent = originalText;
            button.disabled = false;
        })
        .catch(error => {
            console.error('Error!', error);
            alert('Something went wrong. Please try again.');
            
            // Restore button
            button.textContent = originalText;
            button.disabled = false;
        });
        */
        
        // For demo purposes, just show success message
        showSuccessMessage();
        document.getElementById('booking-form').reset();
    });
}

// Show success message and hide after delay
function showSuccessMessage() {
    document.getElementById('success').style.display = 'block';
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('success').style.display = 'none';
    }, 5000);
}

// Initialize everything when the page loads
window.onload = () => {
    setMinDate();
    setupVehicleSelection();
    document.getElementById('calculate').addEventListener('click', calculateFare);
    setupFormSubmission();
    
    // Make sure booking section is visible
    document.getElementById('booking-section').classList.add('active');
};
