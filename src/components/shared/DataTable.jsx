import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function DataTable({ columns, data }) {
  return (
    <TableContainer className="overflow-x-auto hide-scrollbar">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.title}
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  color: "var(--text-light-color)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid var(--border-color)",
                  bgcolor: "var(--background-light-color)",
                }}
              >
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={row.id ?? rowIndex}
              sx={{ "&:last-child td": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.title}
                  sx={{ borderBottom: "1px solid var(--border-color)", py: 2 }}
                >
                  {column.render
                    ? column.render(row[column.dataIndex], row)
                    : row[column.dataIndex]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
