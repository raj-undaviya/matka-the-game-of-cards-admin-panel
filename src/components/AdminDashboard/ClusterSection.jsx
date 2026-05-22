import ClusterCard from "../shared/ClusterCard";
import { clusters } from "@/data/dashboarddata";

export default function ClusterSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

            {clusters.map((cluster) => (
                <ClusterCard
                    key={cluster.name}
                    {...cluster}
                />
            ))}

        </div>
    );
}