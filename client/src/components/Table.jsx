import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ columns, rows }) => {
  const [pageSize, setPageSize] = useState(5);

  return (
    <div style={{ height: 372, width: "100%" }}>
      <DataGrid
        pageSize={pageSize}
        rows={rows}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        columns={columns}
        pagination
      />
    </div>
  );
};

export default Table;
