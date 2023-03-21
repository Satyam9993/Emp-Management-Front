import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeBody from '../components/HomeBody';
import Navbar from '../components/Navbar';
import { setEmployees } from '../state';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    useEffect(() => {
        if(!user || !token){
            navigate('/login')
        }
    }, [user, token]) //eslint-disable-line

    const getEmployeesData = async() => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/all`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json();
        dispatch(setEmployees({ employees: data.employees }));
    }

    useEffect(() => {
        getEmployeesData();
    }, [user, token]) // eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <>
            <Navbar />
            <HomeBody />
        </>
    )
}

export default Home;