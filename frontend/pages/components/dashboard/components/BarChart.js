import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import axios from "axios";
import React, { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart(){

  const [backendData, setBackendData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_ENDPOINT + "seller/income_stats", {
        withCredentials: true,
      })
      .then((response) => {
        setBackendData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];
      
      const data = {
        labels,
        datasets: [
          {
            label: "Income in Month",
            data: labels.map((month) => backendData[month]),
            backgroundColor: "rgba(50, 168, 82, 1)",
          },
          // {
          //   label: "Store 2",
          //   data: labels.map(() => {
          //     return Math.random() * 1000 + 500;
          //   }),
          //   backgroundColor: "rgba(53, 162, 235, 1)",
          // },
        ],
      };

    return(
      <TitleCard title={"Revenue"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChart