import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent } from "@mui/material";
import { getDocumentsList, getMedicalList } from "../../../apis/universaty";
import Imodal from "../../../components/insurance/InsuranceModal";
import Dmodal from "../../../components/documentmodal/DocumentModal";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";

export default function Documents() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);

  const handleDownload = async (url, name) => {
    const response = await fetch(url);
    const blob = await response.blob();
    saveAs(blob, name);
  };

  const header = [
    "document_id",
    "student_id",
    "document_category",
    "document_name",
    "document_type",
    "notes",
    "admin_remarks",
    "status",
    "Actions",
  ];

  const handleGetDocumentsList = async () => {
    try {
      const res = await getDocumentsList();
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  React.useEffect(() => {
    handleGetDocumentsList();
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
              Documents
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
                        {app?.document_id || "National College of Ireland"}
                      </TableCell>

                      <TableCell>{app?.student_id || "-"}</TableCell>
                      <TableCell>{app?.document_category || "-"}</TableCell>
                      <TableCell>{app?.document_name || "-"}</TableCell>
                      <TableCell>{app?.document_type || "-"}</TableCell>
                      <TableCell>{app?.notes || "-"}</TableCell>
                      <TableCell>{app?.admin_remarks || "-"}</TableCell>
                      <TableCell>{app?.status || "-"}</TableCell>

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

                        <a href={app.document_url}>Download</a>
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
        <Dmodal
          isOpen={modal}
          toggle={() => {
            handleGetDocumentsList();
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
