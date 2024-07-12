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
import Umodal from "../../../components/universatymodal/Umodal";
import {
  getApplication,
  getCoursesList,
  getMedicalList,
} from "../../../apis/universaty";
import { toast } from "react-toastify";
import AlertModal from "../../../components/alertModal/AlertModal";
import { useLocation } from "react-router-dom";
import Cmodal from "../../../components/coursemodal/CourseModal";
import Imodal from "../../../components/insurance/InsuranceModal";
import Amodal from "../../../components/applicationmodal/ApplcationModal";

export default function StudentApplication() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const header = [
    "Application Id",
    "Student Name",
    "University Name",
    "Course Name",
    "Student Notes",
    "Application Status",
    "Admin Remarks",
    "Actions",
  ];

  const handleGetMedicalInsurance = async () => {
    try {
      const res = await getApplication();
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  React.useEffect(() => {
    handleGetMedicalInsurance();
  }, []);

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
              Student Aplication
            </h4>
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
                      <TableCell>
                        {app?.application_id || "National College of Ireland"}
                      </TableCell>

                      <TableCell>{app?.student_name || "-"}</TableCell>
                      <TableCell>{app?.university_name || "-"}</TableCell>
                      <TableCell>{app?.course_name || "-"}</TableCell>
                      <TableCell>{app?.student_notes || "-"}</TableCell>
                      <TableCell>{app?.application_status || "-"}</TableCell>
                      <TableCell>{app?.admin_remarks || "-"}</TableCell>

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
                      </TableCell>
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
        <Amodal
          isOpen={modal}
          toggle={() => {
            handleGetMedicalInsurance();
            setModal(false);
            setActiveItem(null);
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      )}
    </div>
  );
}
