import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent } from "@mui/material";
import moment from "moment";
import { getLoansList } from "../../../apis/universaty";
import Imodal from "../../../components/insurance/InsuranceModal";

export default function MedicalInsurance() {
  const [rows, setRows] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(null);
  const [sortModel, setSortModel] = React.useState([]);

  const columns = [
    { field: "loan_request_id", headerName: "Id", width: 50 },
    { field: "university_name", headerName: "University Name", width: 250 },
    { field: "course_title", headerName: "Course Title", width: 150 },
    {
      field: "course_start_date",
      headerName: "Course Start Date",
      width: 150,
      valueFormatter: (params) =>
        params ? moment(params).format("MM/DD/YYYY") : "-",
    },
    { field: "loan_type", headerName: "Type", width: 120 },
    { field: "loan_amount", headerName: "Amount" },
    { field: "notes", headerName: "Notes", width: 200 },
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
      const res = await getLoansList();
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
              Loans
            </h4>
          </div>
          <div style={{ height: "auto", width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              autoHeight
              pagination={false}
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model)}
              getRowId={(row) => row.loan_request_id}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
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
          mode="loan"
        />
      )}
    </div>
  );
}
