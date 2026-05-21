export default function StatusBadge({
    type,
}) {
    const styles = {
        active:
            "bg-green-100 text-green-700",

        pending:
            "bg-yellow-100 text-yellow-700",

        restricted:
            "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`
                px-3 py-1 rounded-full
                text-xs font-semibold
                ${styles[type]}
            `}
        >
            {type}
        </span>
    );
}