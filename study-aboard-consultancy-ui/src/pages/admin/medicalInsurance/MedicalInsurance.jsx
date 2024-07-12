import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Card, CardContent } from "@mui/material";
import { getMedicalList } from "../../../apis/universaty";
import Imodal from "../../../components/insurance/InsuranceModal";
import moment from "moment";

export default function MedicalInsurance() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

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
      const res = await getMedicalList();
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
              Medical Insurance
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
                      <TableCell>{app?.medical_insurance_id || "-"}</TableCell>
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
        />
      )}
    </div>
  );
}
