import DashboardCard from "../components/DashboardCard";

export default function DashboardPage() {

    return (

        <div
            className="
                min-h-screen
                bg-[#FAF7F2]
                p-8
                h-screen
                pb-4
            "
        >

            {/* Hero */}

            <div
                className="
                    bg-gradient-to-r
                    from-[#F4EFE4]
                    to-[#E9F0E2]
                    rounded-3xl
                    p-12
                    shadow-sm
                    border
                    border-[#E5DED0]
                    mb-10
                "
            >

                <div
                    className="
                        max-w-3xl
                    "
                >

                    {/* <div
                        className="
                            text-sm
                            uppercase
                            tracking-widest
                            text-[#6B8E5E]
                            font-semibold
                        "
                    >
                        Welcome
                    </div> */}

                    <h1
                        className="
                            mt-3
                            text-5xl
                            font-bold
                            text-[#2C2C2C]
                        "
                    >
                        Vrindavan Dairy
                    </h1>

                    <p
                        className="
                            mt-4
                            text-xl
                            text-[#5A5A5A]
                        "
                    >
                        Fresh Milk • Healthy Life
                    </p>

                    {/* <p
                        className="
                            mt-6
                            text-base
                            text-[#666]
                            max-w-2xl
                            leading-relaxed
                        "
                    >
                        Manage customers, milk deliveries,
                        dairy products, payments, reports,
                        and billing from a single place.
                    </p> */}

                </div>

            </div>

            {/* Quick Actions */}

            <div
                className="
                    mb-10
                "
            >

                <h2
                    className="
                        text-2xl
                        font-semibold
                        text-[#2C2C2C]
                        mb-5
                    "
                >
                    Quick Actions
                </h2>

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-4
                        gap-5
                    "
                >

                    <DashboardCard
                        title="Daily Entry"
                        description="Record daily milk entries."
                        path="/daily-entry"
                    />

                    <DashboardCard
                        title="Payments"
                        description="Manage customer payments."
                        path="/payments"
                    />

                    <DashboardCard
                        title="Single Bill"
                        description="Generate and print one bill."
                        path="/single-bill"
                    />

                    <DashboardCard
                        title="Bulk Bills"
                        description="Generate and print all bills."
                        path="/bulk-bills"
                    />

                </div>

            </div>

            {/* Management */}

            <div className="pb-8">

                <h2
                    className="
                        text-2xl
                        font-semibold
                        text-[#2C2C2C]
                        mb-5
                    "
                >
                    Management
                </h2>

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-5
                    "
                >

                    <DashboardCard
                        title="Customer Management"
                        description="Create, activate and manage customers."
                        path="/customer"
                    />

                    <DashboardCard
                        title="Product Management"
                        description="Manage dairy products and pricing."
                        path="/product"
                    />

                    <DashboardCard
                        title="Monthly Supplies Reports"
                        description="View customer reports and summaries."
                        path="/report"
                    />

                    <DashboardCard
                        title="Customer Bill Preview"
                        description="View customer bill if generated till this point"
                        path="/billing"
                    />

                </div>

            </div>

        </div>

    );
}