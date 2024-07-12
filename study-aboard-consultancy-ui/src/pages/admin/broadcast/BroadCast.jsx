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
import {
  deleteBroadcast,
  deleteCourse,
  deleteUniversaty,
  getBroadCastList,
  getCoursesList,
  getUniversatyList,
} from "../../../apis/universaty";
import { toast } from "react-toastify";
import AlertModal from "../../../components/alertModal/AlertModal";
import { useLocation } from "react-router-dom";
import Cmodal from "../../../components/coursemodal/CourseModal";
import Bmodal from "../../../components/broadcastModal/BroadCastModal";

export default function BroadCast() {
  const [jobsData, setJobsData] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const universityId = queryParams.get("id");

  const header = [
    "broadcast_title",
    "broadcast_message",
    "broadcast_send_date",
    "broadcast_expiry_date",
    "Actions",
  ];

  const handleGetBroadcast = async () => {
    try {
      const res = await getBroadCastList();
      console.log(("data", res));
      setJobsData(res);
    } catch (e) {
      console.log("er->", e);
    }
  };

  const handleDeleteBroadcast = async () => {
    try {
      const res = await deleteBroadcast(activeItem?.broadcast_id);
      console.log(("data", res));
      handleGetBroadcast();
      setActiveItem(null);
      setDeleteModal(false);
      toast.success("Deleted successfully");
    } catch (e) {
      console.log("er->", e);
    }
  };

  const onConfirm = () => {
    handleDeleteBroadcast();
  };

  const onCancel = () => {
    setActiveItem(null);
    setDeleteModal(false);
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
            <button
              type="button"
              className="orange-button"
              onClick={() => {
                setModal(true);
              }}
            >
              Add BroadCast
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
                      <TableCell>{app?.broadcast_title || "-"}</TableCell>
                      <TableCell>{app?.broadcast_message || "-"}</TableCell>
                      <TableCell>{app?.broadcast_send_date || "-"}</TableCell>
                      <TableCell>{app?.broadcast_expiry_date || "-"}</TableCell>

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
                        <button className="mr-2">View</button>
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
        <Bmodal
          isOpen={modal}
          toggle={() => {
            handleGetBroadcast();
            setModal(false);
            setActiveItem(null);
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
