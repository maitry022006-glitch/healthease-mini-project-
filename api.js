// HealthEase API - Simple Working Version
class HealthEaseAPI {
    constructor() {
        console.log('HealthEaseAPI loaded!');
    }

    getAllDoctors() {
        return Promise.resolve([
            {
                id: 1,
                name: "Dr. Sarah Johnson",
                specialty: "cardiology",
                rating: 4.8
            },
            {
                id: 2,
                name: "Dr. Michael Chen",
                specialty: "neurology", 
                rating: 4.9
            }
        ]);
    }

    login(email, password) {
        return Promise.resolve({
            success: true,
            message: 'Login successful',
            user: {
                id: 1,
                name: "Test User",
                email: email,
                phone: "1234567890"
            }
        });
    }

    createAppointment(appointmentData) {
        return Promise.resolve({
            id: Date.now(),
            ...appointmentData,
            status: 'scheduled'
        });
    }

    getAllMedicines() {
        return Promise.resolve([
            {
                id: 1,
                name: "Amoxicillin",
                type: "Antibiotic",
                price: 15.99
            },
            {
                id: 2,
                name: "Lipitor", 
                type: "Cholesterol",
                price: 24.99
            }
        ]);
    }
}

// Create global instance
window.HealthEaseAPI = new HealthEaseAPI();
