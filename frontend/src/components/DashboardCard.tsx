import { Link } from "react-router-dom";

interface DashboardCardProps {
    title: string;
    description: string;
    path: string;
}

export default function DashboardCard({
    title,
    description,
    path,
}: DashboardCardProps) {

    return (

        <Link
            to={path}
            className="
                block
                bg-white
                rounded-2xl
                p-6
                shadow-sm
                border
                border-[#EFE8DA]
                hover:shadow-md
                hover:bg-[#F8F4EC]
                transition
            "
        >

            <h3
                className="
                    text-lg
                    font-semibold
                    text-[#2C2C2C]
                "
            >
                {title}
            </h3>

            <p
                className="
                    mt-2
                    text-sm
                    text-gray-600
                "
            >
                {description}
            </p>

        </Link>

    );
}