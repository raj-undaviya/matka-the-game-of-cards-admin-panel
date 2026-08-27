import { useMemo, useState, useEffect } from "react";
import { SlidersHorizontal, Check, X, ShieldCheck } from "lucide-react";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import TablePagination from "@/components/shared/TablePagination";
import SearchInput from "@/components/ui/SearchInput";
import { CustomDropdown } from "@/components/ui/FormControls";
import Modal from "@/components/ui/Modal";
import walletApi from "@/api/walletApi";

const WALLET_PAGE_SIZE = 10;

const withdrawStatusOptions = [
  { value: "pending", label: "Status: Pending" },
  { value: "approved", label: "Status: Approved" },
  { value: "rejected", label: "Status: Rejected" },
  { value: "paid", label: "Status: Paid" },
  { value: "failed", label: "Status: Failed" },
];

function LoadingRows() {
  return (
    <div className="space-y-3 py-6">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="h-12 animate-pulse rounded-lg bg-slate-100" />
      ))}
    </div>
  );
}

export default function WalletWithdrawalsTable() {
  const [withdraws, setWithdraws] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [jumpPage, setJumpPage] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");

  // Action states
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState("approve"); // approve or reject
  const [adminNote, setAdminNote] = useState("");
  const [submittingAction, setSubmittingAction] = useState(false);

  const fetchWithdraws = async () => {
    setLoading(true);
    try {
      const res = await walletApi.getWithdraws({ status: statusFilter });
      setWithdraws(res.data || []);
    } catch (err) {
      console.error("Failed to fetch withdraw requests:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdraws();
    setPage(1);
  }, [statusFilter]);

  const handleActionSubmit = async () => {
    if (!selectedRequest) return;
    setSubmittingAction(true);
    try {
      const res = await walletApi.withdrawAction(selectedRequest.id, {
        action: actionType,
        reason: adminNote,
      });
      if (res.data?.success) {
        setActionModalOpen(false);
        setAdminNote("");
        fetchWithdraws();
      } else {
        alert(res.data?.message || "Failed to submit action.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error submitting withdrawal action.");
    } finally {
      setSubmittingAction(false);
    }
  };

  const handleMarkPaid = async (requestId) => {
    if (!window.confirm("Are you sure you want to mark this withdrawal as manually Paid?")) return;
    try {
      const res = await walletApi.markPaid(requestId);
      fetchWithdraws();
    } catch (err) {
      console.error(err);
      alert("Error marking payout as paid.");
    }
  };

  const columns = [
    { 
      title: "DATE/TIME (UTC)", 
      dataIndex: "requested_at",
      render: (val) => val ? new Date(val).toLocaleString() : "-"
    },
    { 
      title: "REQUEST ID", 
      dataIndex: "id" 
    },
    {
      title: "PLAYER ID",
      dataIndex: "wallet_user",
      render: (value) => <span className="font-semibold text-blue-600">{value}</span>,
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      render: (val) => <span className="font-extrabold text-red-600">₹{val}</span>,
    },
    {
      title: "PAYMENT METHOD",
      dataIndex: "mode",
      render: (val) => <span className="uppercase font-medium text-slate-800">{val === "bank_account" ? "Bank Account" : val}</span>,
    },
    {
      title: "PAYMENT DETAILS",
      render: (_, row) => {
        if (row.mode === "upi") {
          return (
            <div className="text-xs font-semibold text-slate-900">
              <span className="text-slate-500 uppercase">UPI ID:</span> {row.upi_id || "-"}
            </div>
          );
        }
        return (
          <div className="text-xs space-y-0.5">
            <div><span className="text-slate-500">Name:</span> <span className="font-semibold">{row.account_holder || "-"}</span></div>
            <div><span className="text-slate-500">Acc No:</span> <span className="font-semibold">{row.account_number || "-"}</span></div>
            <div><span className="text-slate-500">IFSC:</span> <span className="font-semibold">{row.ifsc_code || "-"}</span></div>
          </div>
        );
      }
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (value) => <StatusBadge type={value.toLowerCase()} label={value} />,
    },
    {
      title: "ACTIONS",
      render: (_, row) => {
        if (row.status === "pending") {
          return (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedRequest(row);
                  setActionType("approve");
                  setActionModalOpen(true);
                }}
                className="inline-flex h-8 items-center gap-1 rounded bg-emerald-600 px-2 text-xs font-bold text-white transition-default hover:bg-emerald-700"
              >
                <Check className="h-3 w-3" />
                Approve
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRequest(row);
                  setActionType("reject");
                  setActionModalOpen(true);
                }}
                className="inline-flex h-8 items-center gap-1 rounded bg-red-600 px-2 text-xs font-bold text-white transition-default hover:bg-red-700"
              >
                <X className="h-3 w-3" />
                Reject
              </button>
              <button
                type="button"
                onClick={() => handleMarkPaid(row.id)}
                className="inline-flex h-8 items-center gap-1 rounded border border-slate-200 bg-white px-2 text-xs font-bold text-slate-700 transition-default hover:bg-slate-50"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                Mark Paid
              </button>
            </div>
          );
        }
        return <span className="text-slate-400 text-xs">No Actions</span>;
      }
    }
  ];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return withdraws.filter((item) => {
      const searchable = [
        item.id,
        item.wallet_user,
        item.amount,
        item.upi_id,
        item.account_number,
        item.account_holder,
      ]
        .join(" ")
        .toLowerCase();
      return !normalizedQuery || searchable.includes(normalizedQuery);
    });
  }, [withdraws, query]);

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

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm mt-6">
      <div className="flex flex-col gap-4 border-b border-gray-100 p-4 md:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-950">Withdrawal Request Board</h2>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Review and dispatch cashfree automatic payouts or reject/mark payouts.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:min-w-[34rem]">
          <SearchInput
            placeholder="Search withdrawals, players, accounts..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              resetPage();
            }}
            className="min-w-0 flex-1"
          />
          <div className="sm:w-48">
            <CustomDropdown
              value={statusFilter}
              options={withdrawStatusOptions}
              onChange={(value) => {
                setStatusFilter(value);
              }}
              ariaLabel="Withdrawal Status"
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
              <p className="mt-3 text-sm font-extrabold text-slate-900">No withdrawals found</p>
              <p className="mt-1 text-sm font-medium text-slate-500">
                Adjust search query or switch status filter to find requests.
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

      {/* ── Action Overlay Dialog ── */}
      <Modal
        open={actionModalOpen}
        title={actionType === "approve" ? "Approve Withdrawal Payout" : "Reject Withdrawal Request"}
        description={`Confirming will mark Request #${selectedRequest?.id} for user ${selectedRequest?.wallet_user} as ${actionType === "approve" ? "approved & Cashfree payout will be sent." : "rejected."}`}
        onClose={() => setActionModalOpen(false)}
        maxWidth="max-w-lg"
        footer={
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setActionModalOpen(false)}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={submittingAction}
              onClick={handleActionSubmit}
              className={`inline-flex min-h-10 items-center justify-center rounded-lg px-4 text-sm font-bold text-white shadow-sm transition-all ${
                actionType === "approve"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {submittingAction ? "Processing..." : "Confirm Action"}
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Amount to Transfer
            </label>
            <div className="mt-1 text-2xl font-extrabold text-slate-900">
              ₹{selectedRequest?.amount}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Admin Note / Reason
            </label>
            <textarea
              className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500/20"
              rows={3}
              placeholder="Provide a comment or note for this action..."
              value={adminNote}
              onChange={(e) => setAdminNote(e.target.value)}
            />
          </div>
        </div>
      </Modal>
    </section>
  );
}
