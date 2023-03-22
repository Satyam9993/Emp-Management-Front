import React, { useState } from 'react'
import './style.css';
import Map from './Map';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees } from '../state';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AddEmployeeCard = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const token = useSelector((state) => state.token);
  const [location, setLocation] = useState({
    name: "India",
    lng: 78.96288,
    lat: 20.593684
  })

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false)
  };


  const [formdata, setFormdata] = useState({
    name: "",
    department: "",
    status: "",
    dob: "",
    location: {
      name: "India",
      lng: 78.476681027237,
      lat: 22.1991660760527
    }
  });

  const handleonChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formdata.name || !formdata.department || !formdata.dob || !formdata.location || !formdata.status) {
      alert('Please fill all details');
      return;
    }

    const body = {
      name: formdata.name,
      department: formdata.department,
      status: formdata.status,
      dob: formdata.dob,
      location: location
    };

    const Response = await fetch(
      `${BACKEND_URL}/api/create-emp`,
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
      alert("Something went wrong!!")
    }
    await fetchEmployeesDetails();
    handleCloseModal()
    setFormdata({
      name: "",
      department: "",
      status: "",
      dob: "",
      location: {
        name: "India",
        lng: 78.476681027237,
        lat: 22.1991660760527
      }
    });
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
      <div className="lg:flex border border-sky-500 cursor-pointer">
        <button
          className="text-gray-200 hover:text-blue-600 text-lg  font-medium px-4 py-2 inline-flex space-x-1 items-center"
          onClick={handleShowModal}
        >
          <span>
            Add
          </span>
        </button>
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
                            value={formdata.dob}
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
                          className="text-slate-300 hover:text-gray-600 text-sm hover:bg-slate-100 border border-slate-200 rounded-lg font-medium px-4 py-2 inline-flex space-x-1 items-center"
                          onClick={handleSave}
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

export default AddEmployeeCard