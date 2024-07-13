import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent } from "@mui/material";
import moment from "moment";
import { getMedicalList } from "../../../apis/universaty";
import Imodal from "../../../components/insurance/InsuranceModal";

export default function MedicalInsurance() {
  const [rows, setRows] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);

  const columns = [
    { field: "medical_insurance_id", headerName: "Id", width: 50 },
    {
      field: "cover_start_date",
      headerName: "Cover Start Date",
      width: 150,
      valueFormatter: (params) =>
        params.value ? moment(params.value).format("MM/DD/YYYY") : "-",
    },
    {
      field: "cover_end_date",
      headerName: "Cover End Date",
      width: 150,
      valueFormatter: (params) =>
        params.value ? moment(params.value).format("MM/DD/YYYY") : "-",
    },
    {
      field: "destination_country",
      headerName: "Destination Country",
      width: 200,
    },
    { field: "university_name", headerName: "University Name", width: 200 },
    { field: "course_title", headerName: "Course Title", width: 200 },
    { field: "course_cost", headerName: "Course Cost", width: 150 },
    {
      field: "course_start_date",
      headerName: "Course Start Date",
      width: 150,
      valueFormatter: (params) =>
        params.value ? moment(params.value).format("MM/DD/YYYY") : "-",
    },
    {
      field: "course_end_date",
      headerName: "Course End Date",
      width: 150,
      valueFormatter: (params) =>
        params.value ? moment(params.value).format("MM/DD/YYYY") : "-",
    },
    { field: "student_notes", headerName: "Student Notes", width: 200 },
    { field: "admin_remarks", headerName: "Admin Remarks", width: 200 },
    { field: "status", headerName: "Status" },
    {
      field: "actions",
      headerName: "Actions",

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

  const handleGetMedicalInsurance = async () => {
    try {
      const res = await getMedicalList();
      setRows(res);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  React.useEffect(() => {
    handleGetMedicalInsurance();
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
              Medical Insurance
            </h4>
          </div>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              autoHeight
              pagination={false}
              getRowId={(row) => row.medical_insurance_id}
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
