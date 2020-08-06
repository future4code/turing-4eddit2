import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts'

const axiosConfig = {
    headers: {
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlBsSFBLZkV1ZmJnc2duRzVnU1lNIiwidXNlcm5hbWUiOiJhbm5hIiwiZW1haWwiOiJhbm5hLmNiZkBnbWFpbC5jb20iLCJpYXQiOjE1OTY0NzQ0OTl9.43TaZ25rWa5I2eHYeJiAGlYf8lWR_6jga-BLIFCk4ug"
    }
};

const useRequestData = () => {
    const history = useHistory();
    const [postsList, setTasksList] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(baseUrl, axiosConfig);
        setTasksList(response.data.posts)
    }
    
    useEffect( () => {
        fetchData();
    }, [history])
    
    return { postsList, fetchData };
};

export default useRequestData;