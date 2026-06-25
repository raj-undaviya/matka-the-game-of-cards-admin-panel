import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import TablePagination from "@/components/shared/TablePagination";
import SearchInput from "@/components/ui/SearchInput";
import { CustomDropdown } from "@/components/ui/FormControls";
import {
  transactionStatusOptions,
  walletTransactions as mockTransactions,
  WALLET_PAGE_SIZE,
} from "@/data/walletData";

const typeDotClasses = {
  Deposit: "bg-blue-500",
  Withdrawal: "bg-orange-500",
  Prizing: "bg-emerald-500",
  "Entry Fee": "bg-slate-400",
};

const statusOptions = transactionStatusOptions.map((option) => ({
  value: option,
  label: option === "All Statuses" ? "Status: All" : option,
}));

function LoadingRows() {
  return (
    <div className="space-y-3 py-6">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="h-12 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </div>
  );
}

const columns = [
  { title: "DATE/TIME (UTC)", dataIndex: "timestamp" },
  { title: "TRANSACTION ID", dataIndex: "id" },
  {
    title: "TYPE",
    dataIndex: "type",
    render: (value) => (
      <span className="inline-flex items-center gap-2 whitespace-nowrap font-medium text-slate-900">
        <span className={`h-2 w-2 rounded-full ${typeDotClasses[value] ?? "bg-slate-400"}`} />
        {value}
      </span>
    ),
  },
  {
    title: "PLAYER ID",
    dataIndex: "playerId",
    render: (value) => <span className="font-semibold text-blue-600">{value}</span>,
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    render: (value, row) => {
      const tone =
        row.amountTone === "positive"
          ? "text-emerald-700"
          : row.amountTone === "negative"
            ? "text-red-600"
            : "text-slate-950";

      return <span className={`font-extrabold ${tone}`}>{value}</span>;
    },
  },
  {
    title: "STATUS",
    dataIndex: "status",
    render: (value) => <StatusBadge type={value.toLowerCase()} label={value} />,
  },
];

export default function WalletTransactionsTable({ transactions, loading: externalLoading }) {
  const [page, setPage] = useState(1);
  const [jumpPage, setJumpPage] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(transactionStatusOptions[0]);

  const allTransactions = transactions || mockTransactions;

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return allTransactions.filter((transaction) => {
      const matchesStatus =
        statusFilter === "All Statuses" ||
        transaction.status.toLowerCase() === statusFilter.toLowerCase();

      const searchable = [
        transaction.id,
        transaction.playerId,
        transaction.type,
        transaction.amount,
        transaction.timestamp,
      ]
        .join(" ")
        .toLowerCase();

      return matchesStatus && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [allTransactions, query, statusFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / WALLET_PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * WALLET_PAGE_SIZE, page * WALLET_PAGE_SIZE);

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
  const loading = externalLoading ?? false;

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-gray-100 p-4 md:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-950">Recent Transaction Ledger</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Search and review recent platform wallet movements.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:min-w-[34rem]">
          <SearchInput
            placeholder="Search transactions, players, or IDs..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPage();
            }}
            className="min-w-0 flex-1"
          />
          <div className="sm:w-44">
            <CustomDropdown
              value={statusFilter}
              options={statusOptions}
              onChange={(value) => {
                setStatusFilter(value);
                resetPage();
              }}
              ariaLabel="Transaction Status"
            />
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6">
        {loading && <LoadingRows />}

        {!loading && paginated.length > 0 && <DataTable columns={columns} data={paginated} />}

        {!loading && paginated.length === 0 && (
          <div className="grid min-h-48 place-items-center rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center">
            <div className="px-4">
              <SlidersHorizontal className="mx-auto h-8 w-8 text-slate-400" />
              <p className="mt-3 text-sm font-extrabold text-slate-900">No transactions found</p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Adjust the search term or status filter to see more results.
              </p>
            </div>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <TablePagination
            page={page}
            pageCount={pageCount}
            jumpPage={jumpPage}
            onPageChange={handlePageChange}
            onJumpPageChange={setJumpPage}
            onJumpToPage={handleJumpToPage}
          />
        )}
      </div>
    </section>
  );
}
