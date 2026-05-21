import StatCard from "./StatCard";
import { Users2, Network } from "lucide-react";

export default function DashboardStats() {
    return (
        <div className="space-y-5">

            <StatCard
                label="ACTIVE USERS"
                value="12,842"
                icon={<Users2 />}
                barPct={75}
                barColor="bg-green-500"
            />

            <StatCard
                label="NETWORK LOAD"
                value="4.2 GB/s"
                icon={<Network />}
                barPct={60}
                barColor="bg-blue-500"
            />

        </div>
    );
}