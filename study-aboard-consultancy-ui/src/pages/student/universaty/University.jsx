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
import { deleteUniversaty, getUniversatyList } from "../../../apis/universaty";
import { toast } from "react-toastify";
import AlertModal from "../../../components/alertModal/AlertModal";
import { useNavigate } from "react-router-dom";
import Aumodal from "../../../components/applyuniversaty/ApplyUniversaty";

export default function UniversatyList() {
  const navigate = useNavigate();
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const header = [
    "Name",
    "Description",
    "Program Intake",
    "Intake Status",
    "Action",
  ];

  const handleGetUniversaties = async () => {
    try {
      const res = await getUniversatyList();
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const onConfirm = () => {};

  const onCancel = () => {
    setActiveItem(null);
    setDeleteModal(false);
  };

  React.useEffect(() => {
    handleGetUniversaties();
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
              Universities
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
                        {app?.university_name || "National College of Ireland"}{" "}
                        ({app.university_shortname})
                      </TableCell>

                      <TableCell>
                        {app?.university_description || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "130px" }}>
                        {app?.university_program_intake || "-"}
                      </TableCell>
                      <TableCell>
                        {app?.university_program_intake_status || "-"}
                      </TableCell>
                      <TableCell sx={{ minWidth: "130px" }}>
                        <span
                          className="mr-2 button-wrapper-edit"
                          onClick={() => {
                            navigate(
                              `/student-courses?id=${app.university_id}&name=${app.university_name}`
                            );
                          }}
                        >
                          View
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
            handleGetUniversaties();
            setModal(false);
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
