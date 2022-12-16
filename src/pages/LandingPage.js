import React from "react";
import Form from "../components/Form/Form";
import Header from "../components/Header/Header";
import "./landingPage.css";
import ListJobs from "./ListJobs";
export default function LandingPage() {
  return (
    <div className="landingPage">
      <Header />
      <div className="landingPage-section">
        <Form />
        <ListJobs />
      </div>
    </div>
  );
}
