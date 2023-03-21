import React from 'react';
import Navbar from '../components/Navbar';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js"
import PieChart from "../components/PieChart";
import LineGraph from '../components/LineGraph';
import BarGraph from '../components/BarGraph';


const Admin = () => {

  return (
    <>
      <Navbar />
      <div className='w-full flex justify-center'>
        <div className='flex flex-col sm:w-[80%] md:w-[70%] lg:w-[50%]'>
          <div className='p-4'>
            <LineGraph />
          </div>
          <div className='p-4'>
            <BarGraph />
          </div>
          <div className='p-4 sm:w-[100%] md:w-[70%] lg:w-[70%]'>
            <PieChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin