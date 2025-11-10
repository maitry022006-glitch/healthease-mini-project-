// HealthEase API - GitHub Pages Backend
const DB_URL = 'https://raw.githubusercontent.com/maitry022006-glitch/healthease-backend/main/db.json';

class HealthEaseAPI {
    constructor() {
        this.data = null;
    }

    async loadData() {
        if (!this.data) {
            try {
                const response = await fetch(DB_URL);
                this.data = await response.json();
            } catch (error) {
                console.error('Error loading data:', error);
                // Fallback data
                this.data = {
                    users: [], doctors: [], appointments: [],
                    medicines: [], emergencies: [], records: []
                };
            }
        }
        return this.data;
    }

    async saveData() {
        // In GitHub Pages, we can't actually save data
        // So we'll use localStorage as a fallback
        localStorage.setItem('healthease_data', JSON.stringify(this.data));
        return true;
    }

    // User methods
    async getUserById(id) {
        const data = await this.loadData();
        return data.users.find(user => user.id == id);
    }

    async getUserByEmail(email) {
        const data = await this.loadData();
        return data.users.find(user => user.email === email);
    }

    async createUser(userData) {
        const data = await this.loadData();
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString()
        };
        data.users.push(newUser);
        await this.saveData();
        return newUser;
    }

    // Doctor methods
    async getAllDoctors() {
        const data = await this.loadData();
        return data.doctors;
    }

    async getDoctorById(id) {
        const data = await this.loadData();
        return data.doctors.find(doctor => doctor.id == id);
    }

    async getDoctorsBySpecialty(specialty) {
        const data = await this.loadData();
        return data.doctors.filter(doctor => 
            doctor.specialty.toLowerCase() === specialty.toLowerCase()
        );
    }

    // Appointment methods
    async getAppointmentsByUser(userId) {
        const data = await this.loadData();
        return data.appointments.filter(apt => apt.userId == userId);
    }

    async createAppointment(appointmentData) {
        const data = await this.loadData();
        const newAppointment = {
            id: Date.now(),
            ...appointmentData,
            createdAt: new Date().toISOString(),
            status: 'scheduled'
        };
        data.appointments.push(newAppointment);
        await this.saveData();
        return newAppointment;
    }

    // Medicine methods
    async getAllMedicines() {
        const data = await this.loadData();
        return data.medicines;
    }

    // Emergency methods
    async createEmergency(emergencyData) {
        const data = await this.loadData();
        const newEmergency = {
            id: Date.now(),
            ...emergencyData,
            createdAt: new Date().toISOString(),
            status: 'pending'
        };
        data.emergencies.push(newEmergency);
        await this.saveData();
        return newEmergency;
    }

    // Auth methods
    async login(email, password) {
        const data = await this.loadData();
        const user = data.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            return {
                success: true,
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    avatar: user.avatar
                }
            };
        } else {
            // Auto-create user for demo
            const newUser = await this.createUser({
                name: email.split('@')[0],
                email: email,
                phone: '1234567890',
                password: password
            });
            
            return {
                success: true,
                message: 'Auto-created account and logged in',
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    avatar: newUser.avatar
                }
            };
        }
    }

    async phoneLogin(phone, otp) {
        // For demo, any OTP works
        const data = await this.loadData();
        let user = data.users.find(u => u.phone === phone);
        
        if (!user) {
            user = await this.createUser({
                name: 'User',
                email: `${phone}@healthease.com`,
                phone: phone,
                password: 'demo123'
            });
        }
        
        return {
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                avatar: user.avatar
            }
        };
    }
}

// Create global API instance
window.HealthEaseAPI = new HealthEaseAPI();
