import React, { useEffect, useState } from 'react'
import './style.css';
import Map from './Map';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees } from '../state';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const EmployeeCard = ({
    emp
}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [location, setLocation] = useState({
        name: "",
        lng: "",
        lat: ""
    })

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false)
    };


    const [formdata, setFormdata] = useState({
        name: emp.name,
        department: emp.department,
        status: emp.status,
        dob: new Date(),
        location: emp.location
    });

    useEffect(() => {
        setFormdata({
            name: emp.name,
            department: emp.department,
            status: emp.status,
            dob: emp.dob,
            location: emp.location
        });
        setLocation(emp.location)
    }, [emp]);

    const handleonChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleisEdit = () => {
        setIsEdit(!isEdit);
        setFormdata({
            name: emp.name,
            department: emp.department,
            status: emp.status,
            dob: emp.dob,
            location: emp.location
        })
    };

    const handleSaveEdit = async () => {
        if (!formdata.name || !formdata.department || !formdata.dob || !formdata.location || !formdata.status) {
            alert('Please fill all details');
            console.log("Satyam ", formdata);
            return;
        }

        const body = {
            eId: emp._id,
            name: formdata.name,
            department: formdata.department,
            status: formdata.status,
            dob: formdata.dob,
            location: location
        };

        const Response = await fetch(
            `${BACKEND_URL}/api/update-emp`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
        )
        const response = await Response.json();
        if (!response) {
            // alert
            alert("Error Somthing!")
        }
        await fetchEmployeesDetails()
        handleCloseModal();
    };

    const handleDelete = async () => {

        if (window.confirm('Are you sure you want to delete')) {

            const body = {
                eId: emp._id
            };
            const Response = await fetch(
                `${BACKEND_URL}/api/delete-emp`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const response = await Response.json();
            if (!response) {
                alert("Something went wrong!!")
            }
            await fetchEmployeesDetails();
            handleCloseModal();
        }

    };

    const fetchEmployeesDetails = async () => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/all`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        const data = await response.json();
        dispatch(setEmployees({ employees: data.employees }));
    }

    return (
        <>
            <div className="lg:flex border border-sky-500 cursor-pointer" onClick={handleShowModal}>
                <div className="flex flex-col justify-between py-6 lg:mx-6 w-full">
                    <div className='flex justify-between w-full'>
                        <a href="#" className="text-xl font-semibold text-gray-800 hover:underline dark:text-white ">
                            {emp.name}
                        </a>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Department : {emp.department}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-300">Add on : {emp.createdOn.split("T")[0]}</span>
                </div>
            </div>
            {showModal && (
                <div className="fixed top-0 right-0 bottom-0 left-0 z-50 overflow-scroll sm:mt-28">
                    <div className="modal fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-scroll">
                        <div
                            className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
                            onClick={handleCloseModal}
                        />
                        <div className="modal-container dark:bg-[#000226] dark:text-white w-11/12 mx-auto rounded shadow-lg z-50">
                            <div className='flex flex-row edit-form p-4 sm:mt-18 card-st'>

                                <div className="modal-content text-left px-6">
                                    <div className="flex flex-row justify-between">
                                        <p className="text-2xl font-bold mb-2">Edit Skills</p>
                                        <div className='flex justify-center'>
                                            {!isEdit ? <button
                                                className="text-gray-200 hover:text-blue-600 text-sm  font-medium py-2 inline-flex space-x-1 items-center"
                                                onClick={handleisEdit}
                                            >
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </span>
                                            </button> :
                                                <button
                                                    className="text-gray-200 hover:text-blue-600 text-sm  font-medium py-2 inline-flex space-x-1 items-center"
                                                    onClick={handleisEdit}
                                                >
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                                        </svg>
                                                    </span>
                                                    <span>Cancel Edit</span>
                                                </button>}
                                            <button
                                                className="text-gray-200 hover:text-blue-600 text-sm  font-medium px-2 py-2 inline-flex space-x-1 items-center"
                                                onClick={handleDelete}
                                            >
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <button
                                                className="text-gray-200 hover:text-blue-600 text-sm  font-medium py-2 inline-flex space-x-1 items-center"
                                                onClick={handleCloseModal}
                                            >
                                                <span>
                                                    <svg
                                                        className="fill-current text-gray-200 hover:text-blue-600 h-7 w-7"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                                    </svg>
                                                </span>
                                            </button>

                                        </div>
                                    </div>
                                    <div className="lg:w-2/2 md:w-5/5 mx-auto">
                                        <div className="flex flex-wrap">
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label
                                                        htmlFor="name"
                                                        className="block dark:bg-[#000226] font-medium mb-2 text-gray-700"
                                                    >
                                                        Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        className="w-full dark:bg-[#000226] bg-opacity-50 text-gray-200 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                        value={formdata.name}
                                                        disabled={!isEdit}
                                                        onChange={handleonChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label
                                                        htmlFor="department"
                                                        className="block text-gray-700 font-medium mb-2"
                                                    >
                                                        Department
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="department"
                                                        name="department"
                                                        className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                        value={formdata.department}
                                                        disabled={!isEdit}
                                                        onChange={handleonChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <div className="relative">
                                                    <label
                                                        htmlFor="status"
                                                        className="block text-gray-700 font-medium mb-2"
                                                    >
                                                        Status
                                                    </label>
                                                    <select
                                                        id="status"
                                                        className="w-full dark:bg-[#000226] bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                        name="status"
                                                        onChange={handleonChange}
                                                        value={formdata.status}
                                                        disabled={!isEdit}
                                                    >
                                                        <option>Choose Type</option>
                                                        <option value="Full-Time">Full-Time</option>
                                                        <option value="Remote Location">Remote Location</option>
                                                        <option value="Contract Employee">Contract Employee</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="p-2 w-half">
                                                <div className="relative">
                                                    <label
                                                        className="block text-gray-700 font-medium mb-2"
                                                        htmlFor="dob"
                                                    >
                                                        DOB
                                                    </label>
                                                    <input
                                                        className="w-full dark:bg-[#000226] text-white bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                        id="dob"
                                                        name="dob"
                                                        type="date"
                                                        onChange={handleonChange}
                                                        disabled={!isEdit}
                                                        value={new Date(formdata.dob).toISOString().split('T')[0]}
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-2 w-half">
                                                <div className="relative">
                                                    <label
                                                        className="block text-gray-700 font-medium mb-2"
                                                        htmlFor="location"
                                                    >
                                                        Location (edit location from map)
                                                    </label>
                                                    <input
                                                        className="w-full dark:bg-[#000226] text-white bg-opacity-50 border-b border-gray-300 focus:border-gray-300 focus:dark:bg-[#000226] text-base outline-none text-gray-200 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                                                        id="location"
                                                        name="location"
                                                        type="text"
                                                        disabled={true}
                                                        value={location.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-2 w-full">
                                                <button
                                                    className="cursor-pointer text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                                                    onClick={handleSaveEdit}
                                                    disabled={!isEdit}
                                                >
                                                    <span>
                                                        <svg
                                                            className="fill-current text-gray-500 h-4 w-4"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"
                                                            />
                                                        </svg>
                                                    </span>
                                                    <span>Save Edit</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-center items-center w-full h-auto'>
                                    <Map location={location} setLocation={setLocation} isEdit={true} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EmployeeCard