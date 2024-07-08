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

      <section className="courses-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Popular Courses</h2>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src="https://img.freepik.com/free-photo/schoolgirl-class-pointing-up_23-2147663362.jpg"
                  className="card-img-top"
                  alt="Course 1"
                />
                <div className="card-body">
                  <h5 className="card-title">React JS</h5>
                  <p className="card-text">
                    Learn how to build dynamic user interfaces with React.js,
                    one of the most popular JavaScript libraries for frontend
                    development.
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    {" "}
                    <a href="#" className="course-button-wrapper">
                      See Details
                    </a>
                    <div>
                      {" "}
                      <FaUserFriends /> 232
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4 ">
              <div className="card h-100">
                <img
                  src="https://img.freepik.com/free-photo/schoolgirl-class-pointing-up_23-2147663362.jpg"
                  className="card-img-top"
                  alt="Course 2"
                />
                <div className="card-body">
                  <h5 className="card-title">NodeJs</h5>
                  <p className="card-text">
                    Master server-side development with Node.js, an efficient
                    and scalable platform for building fast and robust web
                    applications.
                  </p>
                  <div className="d-flex justify-content-between mt-3">
                    {" "}
                    <a href="#" className="course-button-wrapper">
                      See Details
                    </a>
                    <div>
                      {" "}
                      <FaUserFriends /> 232
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src="https://img.freepik.com/free-photo/schoolgirl-class-pointing-up_23-2147663362.jpg"
                  className="card-img-top"
                  alt="Course 3"
                />
                <div className="card-body">
                  <h5 className="card-title">Full Stack Development</h5>
                  <p className="card-text">
                    Become a versatile developer with our full stack development
                    course, covering both frontend and backend technologies.
                  </p>

                  <div className="d-flex justify-content-between mt-3">
                    {" "}
                    <a href="#" className="course-button-wrapper">
                      See Details
                    </a>
                    <div>
                      {" "}
                      <FaUserFriends /> 232
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Students Are Saying</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="testimonial">
                <p className="testimonial-content">
                  "This platform made my university application process so much
                  easier. Highly recommend!"
                </p>
                <p className="testimonial-author">- Student</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="testimonial">
                <p className="testimonial-content">
                  "I found the perfect course through this platform. It has
                  everything you need in one place."
                </p>
                <p className="testimonial-author">- Student</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-4 footer-wrapper">
        <div className="container">
          <div className="row about-wrapper">
            <div className="col-md-4">
              <h5>About StudyAbroad</h5>
              <p>
                StudyAbroad helps students apply to universities worldwide and
                find the best courses for their academic and career goals.
              </p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className=" ">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className=" ">
                    Why Us
                  </a>
                </li>
                <li>
                  <a href="#" className=" ">
                    Feature
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact Us</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="mailto:support@uniapply.com" className=" ">
                    support@StudyAbroad.com
                  </a>
                </li>
                <li>
                  <a href="tel:+123456789" className=" ">
                    +123456789
                  </a>
                </li>
                <li>
                  <a href="#" className="">
                    123 StudyAbroad St, Education City,Ireland
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col text-center">
              <p>
                &copy; 2024 StudyAbroad. All rights reserved. | Terms of Service
                | Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
