import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import { Card, CardContent } from "@mui/material";
import { getStudentList } from "../../../apis/universaty";

export default function StudentList() {
  const [jobsData, setJobsData] = React.useState([
    {
      student_id: 2,
      student_first_name: "Sandeep",
      student_family_name: "Monkolla",
      student_dob: "1999-06-09T18:30:00.000Z",
      student_gender: "Male",
      student_country_origin: "India",
      student_phone_number: "9550008036",
      student_email: "monkollasandeep000999@gmail.com",
      student_status: "false",
      student_document_status: "false",
      role: "Student",
      student_created_at: "2024-07-08T17:52:03.000Z",
      student_updated_at: null,
      student_deleted_at: null,
    },
  ]);

  const header = [
    "Name",
    "Date Of Birth",
    "Gender",
    "Country",
    "Phone Number",
    "Email",
    "Document Status",
    "Role",
  ];

  const handleGetUniversatyCourses = async () => {
    try {
      const res = await getStudentList();
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  React.useEffect(() => {
    handleGetUniversatyCourses();
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
              StudentList
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
                        {app?.student_first_name ||
                          "National College of Ireland"}
                        {"  "}
                        {app.student_family_name}
                      </TableCell>

                      <TableCell>
                        {app?.student_dob
                          ? moment(app?.student_dob).format("MM/DD/YYYY")
                          : "-"}
                      </TableCell>
                      <TableCell>{app?.student_gender || "-"}</TableCell>
                      <TableCell>
                        {app?.student_country_origin || "-"}
                      </TableCell>
                      <TableCell>{app?.student_phone_number || "-"}</TableCell>
                      <TableCell>{app?.student_email || "-"}</TableCell>
                      <TableCell>
                        {app?.student_document_status || "-"}
                      </TableCell>
                      <TableCell>{app?.role || "-"}</TableCell>
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
    </div>
  );
}
