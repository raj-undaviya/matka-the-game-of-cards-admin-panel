import MuiPagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@/components/ui/Button";

export default function TablePagination({
  page,
  pageCount,
  jumpPage,
  onPageChange,
  onJumpPageChange,
  onJumpToPage,
}) {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <Stack>
        <MuiPagination
          count={pageCount}
          page={page}
          onChange={(_, value) => onPageChange(value)}
          color="primary"
          shape="rounded"
          showFirstButton
          showLastButton
        />
      </Stack>

      <div className="flex items-center gap-2">
        <span className="text-sm whitespace-nowrap" style={{ color: "var(--text-light-color)" }}>
          Jump to page
        </span>
        <TextField
          size="small"
          value={jumpPage}
          onChange={(e) => onJumpPageChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onJumpToPage()}
          sx={{ width: 72 }}
          inputProps={{ min: 1, max: pageCount }}
        />
        {/* <Button variant="secondary" size="small" onClick={onJumpToPage}>
          Go
        </Button> */}
      </div>
    </div>
  );
}
