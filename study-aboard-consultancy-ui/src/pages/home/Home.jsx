import React from "react";
import "./home.scss";
// import placeholderImage from "./placeholder-image.jpg"; // Replace with your actual image path

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 header-left-wrapper">
          <h1>Discover Your Ideal University</h1>
          <p className="mt-4">
            Apply to top universities and explore courses tailored to your
            interests and career goals.
          </p>
          <div className="d-flex align-items-center mt-4 button-wrapper">
            <button className="button-started-wrapper me-2">Get Started</button>
            <p>See how it works</p>
          </div>

          <div className="mt-5">
            <div className="d-flex justify-content-between">
              <div>
                <h3>40k+</h3>
                <p>Happy Students</p>
              </div>
              <div>
                <h3>12k+</h3>
                <p>Active Students</p>
              </div>
              <div>
                <h3>2k+</h3>
                <p>Online Classes</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 right-wrapper d-flex justify-content-end">
          <div className="right-wrapper-image"></div>
          <img
            src="https://img.freepik.com/free-photo/schoolgirl-class-pointing-up_23-2147663362.jpg"
            className="img-fluid rounded"
            alt="Online Learning"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
