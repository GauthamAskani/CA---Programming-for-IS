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
  getStudentDocuments,
} from "../../../apis/studentapi";
import { useAuth } from "../../../utilities/AuthProvider";
import AlertModal from "../../../components/alertModal/AlertModal";
import { toast } from "react-toastify";
import UDmodal from "../../../components/uploaddocument/UploadModal";

export default function DocumentUpload() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const { auth } = useAuth();

  const header = [
    "category",
    "document_name",
    "notes",
    "admin_remarks",
    "status",
    "action",
  ];

  const handleGetMedicalInsurance = async () => {
    try {
      const res = await getStudentDocuments(auth?.user?.student_id);
      console.log(("data", res));
      setJobsData(res?.documents || []);
    } catch (e) {
      console.log("er->", e);
    }
  };

  React.useEffect(() => {
    handleGetMedicalInsurance();
  }, []);

  console.log("jobs data->", jobsData);

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
              Documents
            </h4>
            <button
              onClick={() => {
                setModal(true);
              }}
            >
              {" "}
              Add Documents
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
                      <TableCell>{app?.document_category || "-"}</TableCell>
                      <TableCell>{app?.document_name || "-"}</TableCell>
                      <TableCell>{app?.notes || "-"}</TableCell>
                      <TableCell>{app?.admin_remarks || "-"}</TableCell>
                      <TableCell>{app?.status || "-"}</TableCell>

                      <TableCell>
                        <a href={app?.document_url}>Download</a>
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
        <UDmodal
          isOpen={modal}
          toggle={() => {
            setModal(false);
            setActiveItem(null);
          }}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          handleGetMedicalInsurance={handleGetMedicalInsurance}
        />
      )}
    </div>
  );
}
