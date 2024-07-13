import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent } from "@mui/material";

import { deleteCourse, getCoursesList } from "../../../apis/universaty";
import { toast } from "react-toastify";
import AlertModal from "../../../components/alertModal/AlertModal";
import { useLocation } from "react-router-dom";
import Cmodal from "../../../components/coursemodal/CourseModal";
import { useAuth } from "../../../utilities/AuthProvider";
import Aumodal from "../../../components/applyuniversaty/ApplyUniversaty";

export default function AdminCourses() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [applyCourse, setApplyCourse] = React.useState(false);
  const { auth } = useAuth();
  console.log("active item->", activeItem);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const universityId = queryParams.get("id");
  const universityName = queryParams.get("name");

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
      const res = await getCoursesList(id || universityId);
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleDeleteUniversaties = async () => {
    try {
      const res = await deleteCourse(activeItem?.course_id);
      console.log(("data", res));
      handleGetUniversatyCourses(universityId);
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
            {auth?.user?.role === "Admin" ? (
              <button
                type="button"
                className="btn btn-outline-dark ms-3"
                style={{ width: "auto" }}
                onClick={() => {
                  setModal(true);
                }}
              >
                Add Course
              </button>
            ) : (
              <button
                onClick={() => {
                  if(auth?.user?.student_document_status === "false") {
                    toast.warning('Please upload your documents')
                  } else {
                    setApplyCourse(true);
                    setActiveItem({
                      university_id: universityId,
                      university_name: universityName,
                    });
                  }
                }}
                className="btn btn-outline-dark ms-3"
              >
                Apply
              </button>
            )}
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
                      <TableCell align="inherit">{app?.course_name} </TableCell>

                      <TableCell align="left" sx={{ minWidth: "450px" }}>
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
                      {auth?.user?.role !== "Student" ? (
                        <TableCell sx={{ minWidth: "200px" }}>
                          <span
                            onClick={() => {
                              setModal(true);
                              setActiveItem(app);
                            }}
                            className="mr-2 button-wrapper-edit"
                          >
                            Edit
                          </span>

                          <span
                            onClick={() => {
                              setActiveItem(app);
                              setDeleteModal(true);
                            }}
                            className="button-wrapper-delete"
                          >
                            Delete
                          </span>
                        </TableCell>
                      ) : (
                        <TableCell>-</TableCell>
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
            handleGetUniversatyCourses(universityId);
            setModal(false);
            setActiveItem(null);
          }}
          activeItem={activeItem}
          universityId={universityId}
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
      {applyCourse && (
        <Aumodal
          isOpen={applyCourse}
          toggle={() => {
            setApplyCourse(false);
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
    </div>
  );
}
