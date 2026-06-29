interface SectionCardProps {
    title?: string;
    children: React.ReactNode;
}

export default function SectionCard({
    title,
    children,
}: SectionCardProps) {

    return (

        <div
            className="
                bg-white
                border
                border-[#E8E2D6]
                rounded-2xl
                shadow-sm
                p-8
                transition
            "
        >

            {title && (

                <h2
                    className="
                        text-xl
                        font-semibold
                        mb-4
                    "
                >
                    {title}
                </h2>

            )}

            {children}

        </div>

    );
}