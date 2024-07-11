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
import { getCoursesList, getMedicalList } from "../../../apis/universaty";
import { toast } from "react-toastify";
import AlertModal from "../../../components/alertModal/AlertModal";
import { useLocation } from "react-router-dom";
import Cmodal from "../../../components/coursemodal/CourseModal";
import Imodal from "../../../components/insurance/InsuranceModal";
import Amodal from "../../../components/applicationmodal/ApplcationModal";

export default function StudentApplication() {
  const [jobsData, setJobsData] = React.useState([
    {
      application_id: 2,
      student_id: 2,
      university_id: 1,
      course_id: 1,
      student_notes: "Assam",
      application_status: "Applied",
      admin_remarks: null,
      application_created_at: "2024-07-08T20:01:53.000Z",
      application_updated_at: "2024-07-08T20:05:58.000Z",
      application_deleted_at: null,
    },
  ]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const header = [
    "application_id",
    "student_id",
    "university_id",
    "course_id",
    "student_notes",
    "application_status",
    "admin_remarks",
    "Actions",
  ];

  const handleGetMedicalInsurance = async () => {
    try {
      const res = await getMedicalList();
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  React.useEffect(() => {
    // handleGetMedicalInsurance();
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

                      <TableCell>{app?.student_id || "-"}</TableCell>
                      <TableCell>{app?.university_id || "-"}</TableCell>
                      <TableCell>{app?.course_id || "-"}</TableCell>
                      <TableCell>{app?.student_notes || "-"}</TableCell>
                      <TableCell>{app?.application_status || "-"}</TableCell>
                      <TableCell>{app?.admin_remarks || "-"}</TableCell>

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
