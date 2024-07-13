import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent } from "@mui/material";
import { getApplication } from "../../../apis/universaty";
import Amodal from "../../../components/applicationmodal/ApplcationModal";

export default function StudentApplication() {
  const [rows, setRows] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);

  const columns = [
    { field: "application_id", headerName: "Application Id", width: 150 },
    { field: "student_name", headerName: "Student Name", width: 200 },
    { field: "university_name", headerName: "University Name", width: 200 },
    { field: "course_name", headerName: "Course Name", width: 200 },
    { field: "student_notes", headerName: "Student Notes", width: 200 },
    {
      field: "application_status",
      headerName: "Application Status",
      width: 200,
    },
    { field: "admin_remarks", headerName: "Admin Remarks", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <span
          onClick={() => {
            setModal(true);
            setActiveItem(params.row);
          }}
          className="mr-2 button-wrapper-edit"
        >
          Edit
        </span>
      ),
    },
  ];

  const handleGetApplications = async () => {
    try {
      const res = await getApplication();
      setRows(res);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  React.useEffect(() => {
    handleGetApplications();
  }, []);

  return (
    <div className="user-wrapper p-5">
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
              Student Application
            </h4>
          </div>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              autoHeight
              pagination={false}
              getRowId={(row) => row.application_id}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "orange",
                  color: "white",
                  fontSize: 16,
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      {modal && (
        <Amodal
          isOpen={modal}
          toggle={() => {
            handleGetApplications();
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
