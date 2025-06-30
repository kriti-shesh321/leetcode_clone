import { createContext, useState, useEffect } from "react";
import axios from '../api/axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const signup = async (details) => {
        const { data } = await axios.post('/user/signup', details);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
    };

    const login = async (credentials) => {
        const { data } = await axios.post('/user/login', credentials);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get('/user');
            return data;
        } catch (error) {
            console.log('Error fetching user details: ', error);
        }
    };

    const updateUserDetails = async (details) => {
        try {
            await axios.put('/user', details);
            return;
        } catch (error) {
            console.log('Error updating user details.', error)
        }
    };

    const deleteUser = async (user) => {
        try {
            await axios.delete('/user', user);
            localStorage.removeItem("token");
            setUser(null);
            return;
        } catch (error) {
            console.log('Error deleting user.', error);
        }
    };

    const getAllProblems = async () => {
        try {
            const { data } = await axios.get('/questions');
            return data;
        } catch (error) {
            console.log('Error fetching questions. ', error);
        }
    };

    const getProblemById = async (id) => {
        try {
            const { data } = await axios.get(`/questions/${id}`);
            return data;
        } catch (error) {
            console.log('Error fetching questions. ', error);
        }
    };

    const addNewProblem = async (data) => {
        try {
            await axios.post('/questions', data);
            return;
        } catch (error) {
            console.log('Error adding question. ', error);
        }
    };

    const getAllUserSubmissions = async () => {
        try {
            const { data } = await axios.get('/submissions');
            return data;
        } catch (error) {
            console.log('Error fetching submissions. ', error);
        }
    };

    const getSubmissionsByQuestion = async (questionId) => {
        try {
            const { data } = await axios.get(`/submissions/question/${questionId}`);
            return data;
        } catch (error) {
            console.log('Error fetching submissions for this question. ', error);
        }
    };

    const getSubmissionsById = async (id) => {
        try {
            const { data } = await axios.get(`/submissions/${id}`);
            return data;
        } catch (error) {
            console.log('Error fetching the submission. ', error);
        }
    };

    const addNewSubmission = async (submissionData) => {
        try {
            await axios.post('/submissions', submissionData);
            return;
        } catch (error) {
            console.log('Error adding submission. ', error);
        }
    };

    // Effect to initialize the user state if a token exists
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                signup,
                logout,
                getUserDetails,
                updateUserDetails,
                deleteUser,
                getAllProblems,
                getProblemById,
                addNewProblem,
                getAllUserSubmissions,
                getSubmissionsByQuestion,
                getSubmissionsById,
                addNewSubmission,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext as default, AuthProvider };
