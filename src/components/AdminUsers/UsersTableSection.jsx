import { useMemo, useState } from "react";
import DataTable from "@/components/shared/DataTable";
import TablePagination from "@/components/shared/TablePagination";
import StatusBadge from "@/components/shared/StatusBadge";
import UserAvatar from "@/components/ui/UserAvatar";
import UsersTableFilters from "@/components/AdminUsers/UsersTableFilters";
import UsersTableActions from "@/components/AdminUsers/UsersTableActions";
import {
  USERS_PAGE_SIZE,
  statusFilterOptions,
  kycFilterOptions,
} from "@/data/usersData";

const columns = [
  {
    title: "PLAYER",
    dataIndex: "name",
    render: (_, row) => (
      <div className="flex items-center gap-3">
        <UserAvatar initials={row.initials} />
        <div>
          <p className="font-semibold">{row.name}</p>
          <p className="text-xs" style={{ color: "var(--text-light-color)" }}>
            #{row.id}
          </p>
        </div>
      </div>
    ),
  },
  { title: "REGISTERED", dataIndex: "registered" },
  {
    title: "KYC STATUS",
    dataIndex: "kycStatus",
    render: (value) => <StatusBadge type={value.toLowerCase()} label={value} />,
  },
  { title: "BALANCE", dataIndex: "balance" },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (value) => (
      <StatusBadge
        type={value === "RESTRICTED" ? "restricted" : value.toLowerCase()}
        label={value === "ACTIVE" ? "Active" : value === "RESTRICTED" ? "Restricted" : value}
      />
    ),
  },
  {
    title: "ACTIONS",
    dataIndex: "id",
    render: (value) => <UsersTableActions userId={value} />,
  },
];

export default function UsersTableSection({
  usersList,
  loading,
  statusFilter,
  kycFilter,
  searchQuery,
  onStatusChange,
  onKycChange,
  onSearchChange,
}) {
  const [page, setPage] = useState(1);
  const [jumpPage, setJumpPage] = useState("");

  const pageCount = Math.max(1, Math.ceil(usersList.length / USERS_PAGE_SIZE));
  const paginated = useMemo(
    () => usersList.slice((page - 1) * USERS_PAGE_SIZE, page * USERS_PAGE_SIZE),
    [usersList, page]
  );

  const handlePageChange = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), pageCount));
  };

  const handleJumpToPage = () => {
    const num = parseInt(jumpPage, 10);
    if (!Number.isNaN(num) && num >= 1 && num <= pageCount) {
      setPage(num);
      setJumpPage("");
    }
  };

  const resetPage = () => setPage(1);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <UsersTableFilters
        statusFilter={statusFilter}
        kycFilter={kycFilter}
        statusOptions={statusFilterOptions}
        kycOptions={kycFilterOptions}
        onStatusChange={(value) => {
          onStatusChange(value);
          resetPage();
        }}
        onKycChange={(value) => {
          onKycChange(value);
          resetPage();
        }}
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          onSearchChange(value);
          resetPage();
        }}
      />

      {loading ? (
        <div className="space-y-3 py-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-12 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      ) : (
        <>
          <DataTable columns={columns} data={paginated} />

          <TablePagination
            page={page}
            pageCount={pageCount}
            jumpPage={jumpPage}
            onPageChange={handlePageChange}
            onJumpPageChange={setJumpPage}
            onJumpToPage={handleJumpToPage}
          />
        </>
      )}
    </div>
  );
}
