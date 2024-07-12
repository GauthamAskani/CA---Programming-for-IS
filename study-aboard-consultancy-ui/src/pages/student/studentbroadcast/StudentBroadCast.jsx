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
import { getBroadCastMessages } from "../../../apis/studentapi";

export default function StudentBroadCast() {
  const [jobsData, setJobsData] = React.useState([
    {
      broadcast_id: 1,
      broadcast_title: "Student High Offers",
      broadcast_message: "Hello Students Great offer residing",
      broadcast_send_date: "2024-07-09T18:30:00.000Z",
      broadcast_expiry_date: "2024-01-10T18:30:00.000Z",
      broadcast_created_at: "2024-07-10T11:52:25.000Z",
      broadcast_updated_at: "2024-07-10T11:54:02.000Z",
      broadcast_deleted_at: null,
    },
  ]);

  const header = [
    "broadcast_title",
    "broadcast_message",
    "broadcast_send_date",
    "broadcast_expiry_date",
  ];

  const handleGetBroadcast = async () => {
    try {
      const res = await getBroadCastMessages();
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  React.useEffect(() => {
    handleGetBroadcast();
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
              BroadCast Messages
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
                      <TableCell>{app?.broadcast_title || "-"}</TableCell>
                      <TableCell>{app?.broadcast_message || "-"}</TableCell>
                      <TableCell>
                        {app?.broadcast_send_date
                          ? moment(app?.broadcast_send_date).format(
                              "MM/DD/YYYY"
                            )
                          : "-"}
                      </TableCell>
                      <TableCell>
                        {app?.broadcast_expiry_date
                          ? moment(app?.broadcast_expiry_date).format(
                              "MM/DD/YYYY"
                            )
                          : "-"}
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
    </div>
  );
}
