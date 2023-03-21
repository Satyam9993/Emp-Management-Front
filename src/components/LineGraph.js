import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

function LineChart() {

    const Data = useSelector((state) => state.employees);
    const createdGraphData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Data.filter(emp => createdGraphData[new Date(emp.createdOn).getMonth()] += 1);
    const [chartData, setChartData] = useState({
        labels: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: "Users Gained ",
                data: createdGraphData,
                backgroundColor: [
                    "#f3ba2f",
                    "#50AF95",
                    "#2a71d0",
                    "rgba(75,192,192,1)",
                    "&quot;#ecf0f1"
                ],
                borderColor: "white",
                borderWidth: 2
            }
        ]
    });

    return (
        <div>
            <p className="text-center text-white font-bold">Line Graph</p>
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Employee Added per month this year(2023)"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
}
export default LineChart;