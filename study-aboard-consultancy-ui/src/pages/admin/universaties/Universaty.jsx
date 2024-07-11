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

export default function Universaty() {
  const navigate = useNavigate();
  const [jobsData, setJobsData] = React.useState([
    {
      university_name: "National College of Ireland",
      university_shortname: "NCI",
      university_description: "The National",
      university_program_intake: "JAN & SEP",
      university_program_intake_status: "CLOSED",
      id: 1,
    },
  ]);
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

  const handleDeleteUniversaties = async () => {
    try {
      const res = await deleteUniversaty(activeItem?.id);
      console.log(("data", res));
      setActiveItem(null);
      setDeleteModal(false);
      toast.success("Deleted successfully");
    } catch (e) {
      console.log("er->", e);
    }
  };

  const onConfirm = () => {
    handleDeleteUniversaties();
  };

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
              Universaties
            </h4>
            <button
              type="button"
              className="orange-button"
              onClick={() => {
                setModal(true);
              }}
            >
              Add Universaty
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
                      <TableCell className="title-wrapper">
                        {app?.university_name || "National College of Ireland"}{" "}
                        ({app.university_shortname})
                      </TableCell>

                      <TableCell>
                        {app?.university_description || "-"}
                      </TableCell>
                      <TableCell>
                        {app?.university_program_intake || "-"}
                      </TableCell>
                      <TableCell>
                        {app?.university_program_intake_status || "-"}
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => {
                            setModal(true);
                            setActiveItem(app);
                          }}
                          className="mr-2"
                        >
                          Edit
                        </button>
                        <button
                          className="mr-2"
                          onClick={() => {
                            navigate(`/admin-courses?id=${app.id}`);
                          }}
                        >
                          View
                        </button>
                        <button
                          onClick={() => {
                            setActiveItem(app);
                            setDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>
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
        <Umodal
          isOpen={modal}
          toggle={() => {
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
