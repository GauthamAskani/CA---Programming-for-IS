import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";

import { Card, CardContent } from "@mui/material";

import { deleteApplication, getApplication } from "../../../apis/universaty";
import { toast } from "react-toastify";
import AlertModal from "../../../components/alertModal/AlertModal";

import { useAuth } from "../../../utilities/AuthProvider";
import Aumodal from "../../../components/applyuniversaty/ApplyUniversaty";

export default function StudentApplicationsList() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const { auth } = useAuth();

  const header = [
    "Application Id",
    "University Name",
    "Course Name",
    "Student Notes",
    "Application Status",
    "Admin Remarks",
    "Actions",
  ];

  const handleGetApplcations = async () => {
    try {
      const res = await getApplication({ student_id: auth?.user?.student_id });
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleDeleteApplcation = async () => {
    try {
      const res = await deleteApplication(activeItem?.application_id);
      toast.success("Deleted succesfully");
      console.log(("data", res));
      handleGetApplcations();
      onCancel();
    } catch (e) {
      console.log("er->", e);
    }
  };

  React.useEffect(() => {
    handleGetApplcations();
  }, []);

  const onConfirm = () => {
    handleDeleteApplcation();
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
              Applications List
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
        <Aumodal
          isOpen={modal}
          toggle={() => {
            handleGetApplcations();
            setModal(false);
            setActiveItem(null);
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          mode="edit"
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
