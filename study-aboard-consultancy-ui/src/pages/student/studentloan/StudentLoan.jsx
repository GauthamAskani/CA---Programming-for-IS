import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent } from "@mui/material";
import {
  deleteStudentLoan,
  getStudentLoan
} from "../../../apis/studentapi";
import { useAuth } from "../../../utilities/AuthProvider";
import moment from "moment";
import AlertModal from "../../../components/alertModal/AlertModal";
import { toast } from "react-toastify";
import SLmodal from "../../../components/studentloan/StudentLoanModal";
import { useNavigate } from "react-router-dom";

export default function StudentLoan() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const { auth } = useAuth();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (
      auth?.user?.student_document_status === "false" &&
      auth?.user?.role === "Student"
    ) {
      toast.warning("Please upload your documents...");
      navigate("/studentdashboard");
    }
  },[]);
  const header = [
    "Id",
    "University Name",
    "Course Title",
    "Course Start Date",
    "Loan Type",
    "Loan Amount",
    "Notes",
    "Admin Remarks",
    "Status",
    "Actions",
  ];

  const handleGetMedicalInsurance = async () => {
    try {
      const res = await getStudentLoan(auth?.user?.student_id);
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleDeleteMedicalInsurance = async () => {
    try {
      await deleteStudentLoan(activeItem?.loan_request_id);
      toast.success("Deleted sucessfully");
      handleGetMedicalInsurance();
      setActiveItem(null);
      setDeleteModal(false);
    } catch (e) {
      console.log("er->", e);
    }
  };

  React.useEffect(() => {
    handleGetMedicalInsurance();
  }, []);

  const onConfirm = () => {
    handleDeleteMedicalInsurance();
  };

  const onCancel = () => {
    setActiveItem(null);
    setDeleteModal(false);
  };

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
              Student Loan
            </h4>
            {!jobsData?.length && (
              <button
                onClick={() => {
                  setModal(true);
                }}
                className="btn btn-outline-dark ms-3"
              >
                {" "}
                Add Loan
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
                      <TableCell>
                        {app?.loan_request_id || "National College of Ireland"}
                      </TableCell>
                      <TableCell>{app?.university_name || "-"}</TableCell>
                      <TableCell>{app?.course_title || "-"}</TableCell>
                      <TableCell>
                        {app?.course_start_date
                          ? moment(app?.course_start_date).format("MM/DD/YYYY")
                          : "-"}
                      </TableCell>

                      <TableCell>{app?.loan_type || "-"}</TableCell>
                      <TableCell>{app?.loan_amount || "-"}</TableCell>
                      <TableCell>{app?.notes || "-"}</TableCell>
                      <TableCell>{app?.admin_remarks || "-"}</TableCell>

                      <TableCell>{app?.status || "-"}</TableCell>

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
                          className="mr-2 button-wrapper-delete"
                        >
                          Delete
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
        <SLmodal
          isOpen={modal}
          toggle={() => {
            handleGetMedicalInsurance();
            setModal(false);
            setActiveItem(null);
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          handleGetMedicalInsurance={handleGetMedicalInsurance}
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
