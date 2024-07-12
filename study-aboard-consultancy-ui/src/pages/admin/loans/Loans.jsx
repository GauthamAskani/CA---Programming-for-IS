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
  getCoursesList,
  getLoansList,
  getMedicalList,
} from "../../../apis/universaty";
import { toast } from "react-toastify";
import AlertModal from "../../../components/alertModal/AlertModal";
import { useLocation } from "react-router-dom";
import Cmodal from "../../../components/coursemodal/CourseModal";
import Imodal from "../../../components/insurance/InsuranceModal";

export default function MedicalInsurance() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const header = [
    "loan_request_id",
    "university_name",
    "course_title",
    "course_cost",
    "course_start_date",
    "loan_type",
    "loan_amount",
    "notes",
    "admin_remarks",
    "status",
    "Actions",
  ];

  const handleGetMedicalInsurance = async () => {
    try {
      const res = await getLoansList();
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
              Loans
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
                      <TableCell className="title-wrapper">
                        {app?.loan_request_id || "National College of Ireland"}
                      </TableCell>

                      <TableCell>{app?.university_name || "-"}</TableCell>
                      <TableCell>{app?.course_title || "-"}</TableCell>
                      <TableCell>{app?.course_cost || "-"}</TableCell>
                      <TableCell>{app?.course_start_date || "-"}</TableCell>
                      <TableCell>{app?.loan_type || "-"}</TableCell>
                      <TableCell>{app?.loan_amount || "-"}</TableCell>
                      <TableCell>{app?.notes || "-"}</TableCell>
                      <TableCell>{app?.admin_remarks || "-"}</TableCell>

                      <TableCell>{app?.status || "-"}</TableCell>

                      <TableCell>
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
        <Imodal
          isOpen={modal}
          toggle={() => {
            handleGetMedicalInsurance();
            setModal(false);
            setActiveItem(null);
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          mode="loan"
        />
      )}
    </div>
  );
}
