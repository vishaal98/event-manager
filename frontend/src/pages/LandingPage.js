import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Events from "../components/events/Events";
import { enqueueSnackbar } from "notistack";
import axios from "../api/axios";
import Filters from "../components/filters/Filters";

function LandingPage() {
  return (
    <>
      <Header />
      <div className="homeContainer">
        {/* <Filters /> */}
        <Events />
      </div>
    </>
  );
}

export default LandingPage;
