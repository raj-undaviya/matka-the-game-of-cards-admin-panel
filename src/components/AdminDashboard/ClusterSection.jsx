import ClusterCard from "../shared/ClusterCard";
import { clusters } from "@/data/dashboarddata";

export default function ClusterSection({ items = clusters }) {
    if (!items.length) {
        return (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm font-semibold text-gray-500 shadow-sm">
                No cluster status available.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            {items.map((cluster) => (
                <ClusterCard
                    key={cluster.name}
                    {...cluster}
                />
            ))}

        </div>
    );
}
