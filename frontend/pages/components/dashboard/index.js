import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardStats from "./components/DashboardStats";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import LoadingModalDots from './../loading_modal/loading_modal_dots';

function Dashboard() {
  const [current_Income, setCurrent_Income] = useState(0);
  const [pending_delivery, setPending_delivery] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentIncome = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "seller/monthly_income",
        {
          withCredentials: true,
        }
      );
      const income = response.data;
      setIsLoading(false);
      console.warn("Income response.data = " + income);
      setCurrent_Income(income); // Update the state with the fetched value
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching Current Income:", error);
    }
  };

  const fetchPendingDelivery = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "seller/monthly_pending_orders",
        {
          withCredentials: true,
        }
      );
      const delivery = response.data;
      console.warn("Delivery Response.data = " + delivery);
      setPending_delivery(delivery); // Update the state with the fetched value
    } catch (error) {
      console.error("Error fetching Pending Delivery:", error);
    }
  };

  useEffect(() => {
    fetchCurrentIncome();
    fetchPendingDelivery();
  }, []);

  const statsData = [
    {
      title: "Profit Current Month",
      value: "৳ " + current_Income+" BDT",
      icon: <CreditCardIcon className="w-8 h-8" />,
      description: "Current month",
    },
    {
      title: "Pending Delivery",
      value: pending_delivery,
      icon: <CircleStackIcon className="w-8 h-8" />,
      description: "Current month",
    },
  ];

  return (
    <>
      <div className="grid lg:grid-cols-2 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => (
          <DashboardStats key={k} {...d} colorIndex={k} />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart />
        <BarChart />
      </div>
      {isLoading && <LoadingModalDots />}
    </>
  );
}

export default Dashboard;
