import React from "react";
import "./home.scss";
import {
  FaBookReader,
  FaGlobeAsia,
  FaUniversity,
  FaUserFriends,
} from "react-icons/fa";

// import placeholderImage from "./placeholder-image.jpg"; // Replace with your actual image path

const Home = () => {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-6 header-left-wrapper">
            <h1>Discover Your Ideal University</h1>
            <p className="mt-4">
              Apply to top universities and explore courses tailored to your
              interests and career goals.
            </p>
            <div className="d-flex align-items-center mt-4 button-wrapper">
              <button className="button-started-wrapper me-2">
                Get Started
              </button>
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

      <section className="features-section py-5 mt-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Features</h2>
          <div className="row">
            <div className="col-md-4 feature text-center">
              <div className="feature-icon mb-3">
                {/* <i className="fas fa-university fa-3x"></i> */}
                <FaUniversity size={50} />
              </div>
              <h3 className="feature-title">Top Universities</h3>
              <p className="feature-description">
                Access a curated list of top universities worldwide and find the
                best fit for your academic journey.
              </p>
            </div>
            <div className="col-md-4 feature text-center">
              <div className="feature-icon mb-3">
                <FaBookReader size={50} />
              </div>
              <h3 className="feature-title">Diverse Courses</h3>
              <p className="feature-description">
                Explore a variety of courses across different fields and
                disciplines, ensuring you find the perfect program.
              </p>
            </div>
            <div className="col-md-4 feature text-center">
              <div className="feature-icon mb-3">
                <FaGlobeAsia size={50} />
              </div>
              <h3 className="feature-title">Track Applications</h3>
              <p className="feature-description">
                Keep track of your university applications and their statuses in
                one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
