import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent } from "@mui/material";
import CMImodal from "../../../components/createinsurance/CreateMedicalInsurance";
import {
  deleteStudentMedicalInsurance,
  getStudentMedicalInsurance,
} from "../../../apis/studentapi";
import { useAuth } from "../../../utilities/AuthProvider";
import moment from "moment";
import AlertModal from "../../../components/alertModal/AlertModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function StudentMedicalInsurance() {
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
    "Cover Start Date",
    "Cover End Date",
    "Destination Country",
    "University Name",
    "Course Title",
    "Course Cost",
    "Course Start Date",
    "Course End Date",
    "Student Notes",
    "Admin Remarks",
    "Status",
    "Actions",
  ];

  const handleGetMedicalInsurance = async () => {
    try {
      const res = await getStudentMedicalInsurance(auth?.user?.student_id);
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleDeleteMedicalInsurance = async () => {
    try {
      await deleteStudentMedicalInsurance(activeItem?.medical_insurance_id);
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
              Student Medical Insurance
            </h4>
            {!jobsData?.length && (
              <button
                onClick={() => {
                  setModal(true);
                }}
                className="btn btn-outline-dark ms-3"
                style={{ width: "auto" }}
              >
                {" "}
                Add Medical Insurance
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
                        {app?.medical_insurance_id ||
                          "National College of Ireland"}
                      </TableCell>

                      <TableCell>
                        {app?.cover_start_date
                          ? moment(app?.cover_start_date).format("MM/DD/YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {app?.cover_end_date
                          ? moment(app?.cover_end_date).format("MM/DD/YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell>{app?.destination_country || "-"}</TableCell>
                      <TableCell>{app?.university_name || "-"}</TableCell>
                      <TableCell>{app?.course_title || "-"}</TableCell>
                      <TableCell>{app?.course_cost || "-"}</TableCell>
                      <TableCell>
                        {app?.course_start_date
                          ? moment(app?.course_start_date).format("MM/DD/YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {app?.course_end_date
                          ? moment(app?.course_end_date).format("MM/DD/YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell>{app?.student_notes || "-"}</TableCell>
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
        <CMImodal
          isOpen={modal}
          toggle={() => {
            setModal(false);
            setActiveItem(null);
            handleGetMedicalInsurance();
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
