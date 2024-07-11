import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { Card, CardContent } from "@mui/material";

import { deleteCourse, getCoursesList } from "../../../apis/universaty";
import { toast } from "react-toastify";
import AlertModal from "../../../components/alertModal/AlertModal";
import { useLocation } from "react-router-dom";
import Cmodal from "../../../components/coursemodal/CourseModal";
import { useAuth } from "../../../utilities/AuthProvider";

export default function AdminCourses() {
  const [jobsData, setJobsData] = React.useState([
    {
      course_id: 1,
      university_id: 1,
      course_name: "AI Technology",
      course_main_entry_requirements: "The Data big",
      undergraduate_score_cgpa: "6.5",
      undergraduate_score_percent: "65",
      undergraduate_score: "3",
      score_twelfth: "95",
      fifteen_years_allowed: "YES",
      ielts: "6",
      tofel: "120",
      pte: "97",
      duolingo: "95",
      gmat_score: "650",
      gre_score: "750",
      course_degree: "POST GRAIDTAE",
      course_duration: "12 Months",
      total_tuition_fee: "15000 EUROS",
      application_fee: "10 EUROS",
      course_intake: "JAN & SEP",
      course_intake_status: "OPEN",
      course_notes: "JEND US !!",
      course_created_at: "2024-07-08T19:20:25.000Z",
      course_updated_at: "2024-07-08T19:25:51.000Z",
      course_deleted_at: null,
    },
  ]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const { auth } = useAuth();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const universityId = queryParams.get("id");

  const header = [
    "Name",
    "Requirements",
    "UG Cgp",
    "UG Percent",
    "UG Score",
    "Twelfth",
    "YES",
    "IELTS",
    "TOFEL",
    "PTE",
    "Due Lingo",
    "GMAT Score",
    "GRE Score",
    "Course Degree",
    "Course Duration",
    "Tution Fee",
    "Application Fee",
    "In Take",
    "In Take Status",
    "Notes",
    "Actions",
  ];

  const handleGetUniversatyCourses = async (id) => {
    try {
      const res = await getCoursesList(id);
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleDeleteUniversaties = async () => {
    try {
      const res = await deleteCourse(activeItem?.id);
      console.log(("data", res));
      setActiveItem(null);
      setDeleteModal(false);
      toast.success("Deleted successfully");
    } catch (e) {
      console.log("er->", e);
    }
  };

  const onConfirm = () => {
    handleDeleteUniversaties();
  };

  const onCancel = () => {
    setActiveItem(null);
    setDeleteModal(false);
  };

  React.useEffect(() => {
    if (universityId) handleGetUniversatyCourses(universityId);
  }, [universityId]);

  return (
    <div className="user-wrapper p-5">
      {" "}
      <Card
        style={{
          marginTop: "2rem",
          backgroundColor: "#ffffff",
          minHeight: "300px",
        }}
      >
        <CardContent>
          <div className="d-flex justify-content-between mb-3">
            <h4 style={{ fontFamily: "Poppins !important", color: "orange" }}>
              Courses
            </h4>
            <button
              type="button"
              className="orange-button"
              onClick={() => {
                setModal(true);
              }}
            >
              Add Course
            </button>
          </div>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {header?.map((item) => (
                    <TableCell key={item}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {jobsData && jobsData?.length ? (
                  jobsData?.map((app, index) => (
                    <TableRow hover key={index}>
                      <TableCell
                        className="title-wrapper"
                        sx={{ minWidth: "250px" }}
                      >
                        {app?.course_name || "National College of Ireland"} (
                        {app.university_shortname})
                      </TableCell>

                      <TableCell sx={{ minWidth: "150px" }}>
                        {app?.course_main_entry_requirements || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "100px" }}>
                        {app?.undergraduate_score_cgpa || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "100px" }}>
                        {app?.undergraduate_score_percent || "-"}
                      </TableCell>
                      <TableCell>{app?.undergraduate_score || "-"}</TableCell>
                      <TableCell>{app?.score_twelfth || "-"}</TableCell>
                      <TableCell>{app?.fifteen_years_allowed || "-"}</TableCell>
                      <TableCell>{app?.ielts || "-"}</TableCell>
                      <TableCell>{app?.tofel || "-"}</TableCell>
                      <TableCell>{app?.pte || "-"}</TableCell>
                      <TableCell>{app?.duolingo || "-"}</TableCell>
                      <TableCell>{app?.gmat_score || "-"}</TableCell>
                      <TableCell>{app?.gre_score || "-"}</TableCell>
                      <TableCell sx={{ minWidth: "150px" }}>
                        {app?.course_degree || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "150px" }}>
                        {app?.course_duration || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "140px" }}>
                        {app?.total_tuition_fee || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "140px" }}>
                        {app?.application_fee || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "130px" }}>
                        {app?.course_intake || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "130px" }}>
                        {app?.course_intake_status || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "200px" }}>
                        {app?.course_notes || "-"}
                      </TableCell>
                      {auth?.user?.role !== "Student" && (
                        <TableCell sx={{ minWidth: "200px" }}>
                          <button
                            onClick={() => {
                              setModal(true);
                              setActiveItem(app);
                            }}
                            className="mr-2"
                          >
                            Edit
                          </button>
                          <button className="mr-2">View</button>
                          <button
                            onClick={() => {
                              setActiveItem(app);
                              setDeleteModal(true);
                            }}
                          >
                            Delete
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                ) : (
                  <p className="text-center">No Data Found</p>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      {modal && (
        <Cmodal
          isOpen={modal}
          toggle={() => {
            setModal(false);
            setActiveItem(null);
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
      {deleteModal && (
        <AlertModal
          isOpen={deleteModal}
          onCancel={onCancel}
          onConfirm={onConfirm}
          toggle={onCancel}
        />
      )}
    </div>
  );
}
