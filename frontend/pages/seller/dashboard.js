import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Dashboard from '../components/dashboard/index'

// Dynamic Imports
const _Layout = dynamic(() =>
  import("../components/layout/seller-layout/seller_layout")
);
const _Title = dynamic(() => import("../components/layout/_title"));

export default function XDashboard() {
  return (
    <>
      <_Title title="Dashboard" />
      <_Layout>
        {/* <h1>Welcome to Dashboard</h1> */}
      </_Layout>
    </>
  );
}
