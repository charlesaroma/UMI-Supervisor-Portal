import apiRequest from "../../../utils/apiRequestUrl"

/* ********** ERROR HANDLING ********** */

const errorHandling = (error) => {
    if (error?.response) {
        throw {message: `Error ${error.response.status}: ${error.response.statusText}. ${error.response?.data?.message}`}
    } else if (error.request) {
        throw {message: "No response from server. Please check your network connection."}
    } else {
        throw {message: `Request failed: ${error.message}`}
    }
}

/* ********** AUTH ********** */

export const loginSupervisor = async (user) => {
    try {
        const response = await apiRequest.post("/supervisor/login", user);
        const { token, role } = response.data
        localStorage.setItem('role', role);
        localStorage.setItem('umi_auth_token', token);
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
};

export const getSupervisorProfile = async () => {
    try {
        const response = await apiRequest.get("/supervisor/profile");
        return {
            ...response.data,
            loginTime: new Date().toISOString()
        };
    } catch (error) {
        errorHandling(error);
    }
};

export const updateSupervisorProfile = async (data) => {
    try {
        const response = await apiRequest.put("/supervisor/profile", data);
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
}

export const changePassword = async (data) => {
    try {
        const response = await apiRequest.put("/supervisor/password", data);
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
}

export const logoutSupervisor = async () => {
    try {
        const response = await apiRequest.post("/supervisor/logout")
        return response.data
    } catch (error) {
        errorHandling(error)
    }
}

/* ********** STUDENT MANAGEMENT ********** */

export const getAssignedStudents = async () => {
    try {
        const response = await apiRequest.get("/supervisor/students");
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
};

export const getStudentDetails = async (studentId) => {
    try {
        const response = await apiRequest.get(`/supervisor/students/${studentId}`);
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
};

export const updateStudentProgress = async (studentId, data) => {
    try {
        const response = await apiRequest.put(`/supervisor/students/${studentId}/progress`, data);
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
};

/* ********** PROPOSAL MANAGEMENT ********** */

export const getStudentProposals = async (studentId) => {
    try {
        const response = await apiRequest.get(`/supervisor/students/${studentId}/proposals`);
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
};

export const reviewProposal = async (proposalId, data) => {
    try {
        const response = await apiRequest.put(`/supervisor/proposals/${proposalId}/review`, data);
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
};

/* ********** DASHBOARD ********** */

export const getDashboardStats = async () => {
    try {
        const response = await apiRequest.get("/supervisor/dashboard/stats");
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
};

export const getNotifications = async () => {
    try {
        const response = await apiRequest.get("/supervisor/notifications");
        return response.data;
    } catch (error) {
        errorHandling(error);
    }
}; 