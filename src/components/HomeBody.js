import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AddEmployeeCard from './AddEmployee';
import EmployeeCard from './EmployeeCard'

const HomeBody = () => {
    
    const Employees = useSelector((state) => state.employees);
    const [emps, setEmps] = useState([])

    useEffect(() => {
        setEmps(Employees)
    }, [Employees])


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">

                <div className='flex flex-row justify-between'>
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Employe Data</h1>
                    <AddEmployeeCard />
                </div>


                <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-3">
                    {emps.length ? <>
                    {emps?.map((emp) => (
                        <EmployeeCard key={emp.eId} emp={emp} />
                    ))}
                    </> : 
                    <div>
                        <p className='text-gray-200'>No Employee Added</p>
                    </div>}
                </div>

            </div>
        </section>
    )
}

export default HomeBody