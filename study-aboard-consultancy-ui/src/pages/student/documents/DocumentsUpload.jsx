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
  getStudentDocuments
} from "../../../apis/studentapi";
import { useAuth } from "../../../utilities/AuthProvider";
import UDmodal from "../../../components/uploaddocument/UploadModal";
import { ThreeCircles } from "react-loader-spinner";

export default function DocumentUpload() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { auth, login } = useAuth();

  const header = [
    "Category",
    "Document Name",
    "Notes",
    "Admin Remarks",
    "Status",
    "Action",
  ];

  const handleGetMedicalInsurance = async () => {
    try {
      const res = await getStudentDocuments(auth?.user?.student_id);

      setJobsData(res?.documents || []);
      if (res?.student_document_status !== "false") {
        const authT = localStorage.getItem("authToken");
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("inside->", user?.student_document_status);
        if (
          user?.student_document_status === "false" ||
          !user?.student_document_status
        ) {
          user.student_document_status = true;
          login(authT, user);
        }
      }

      console.log("res->", res);
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
      {loading && (
        <div class="loader-wrapper">
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            color="#0f363f"
          />
        </div>
      )}
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
              className="btn btn-outline-dark "
              style={{ width: "auto" }}
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
                        <a style={{ color: "orange" }} href={app?.document_url}>
                          Download
                        </a>
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
          setLoading={setLoading}
        />
      )}
    </div>
  );
}
