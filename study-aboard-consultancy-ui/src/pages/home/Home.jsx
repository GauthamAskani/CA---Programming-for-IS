import React from "react";
import "./home.scss";
import { FaBookReader, FaGlobeAsia, FaUniversity } from "react-icons/fa";
import Main from "../../assests/mainimage.png";
import Loan from "../../assests/loanimg.png";
import Mediacal from "../../assests/medicalins.png";
import Application from "../../assests/applicationimg.png";
import { useAuth } from "../../utilities/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { auth } = useAuth();

  const navigate = useNavigate();
  const handleGet = () => {
    if (!auth?.user?.role) {
      toast.warning("Please login to the Application");
    } else {
      if (auth?.user?.role === "Admin") navigate("/admindashboard");
      else navigate("/studentdashboard");
    }
  };

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
              <button
                className="button-started-wrapper me-2"
                onClick={handleGet}
              >
                Get Started
              </button>
              <p>See how it works</p>
            </div>
          </div>
          <div className="col-md-6 right-wrapper d-flex justify-content-end">
            <div className="right-wrapper-image"></div>
            <img
              src={Main}
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
          <h2 className="text-center mb-5">Our Special Services</h2>
          <div className="row d-flex justify-content-center">
            <div className="col-md-3 mb-4">
              <div className="card h-100">
                <img
                  src={Application}
                  className="card-img-top"
                  alt="Course 1"
                />
                <div className="card-body">
                  <h5 className="card-title">
                    Hassle-Free University Applications
                  </h5>
                  <p className="card-text">
                    Simplify your journey to studying abroad with our
                    streamlined university application process. Apply to
                    multiple universities with ease and track your application
                    status in real-time.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4 ">
              <div className="card h-100">
                <img src={Mediacal} className="card-img-top" alt="Course 2" />
                <div className="card-body">
                  <h5 className="card-title">
                    Comprehensive Medical Insurance
                  </h5>
                  <p className="card-text">
                    Secure your health while studying abroad with our
                    comprehensive medical insurance plans. Covering a wide range
                    of medical expenses, our plans ensure you receive the best
                    care without financial stress.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card h-100">
                <img src={Loan} className="card-img-top" alt="Course 3" />
                <div className="card-body">
                  <h5 className="card-title">Flexible Student Loans</h5>
                  <p className="card-text">
                    Finance your education with our flexible student loan
                    options. With competitive interest rates and customizable
                    repayment plans, you can focus on your studies without
                    worrying about financial burdens.
                  </p>
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
                    studyaboardconsultancy@gmail.com
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
