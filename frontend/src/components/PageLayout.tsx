interface PageLayoutProps {
    title: string;
    description?: string;
    children: React.ReactNode;
}

export default function PageLayout({
    children,
}: PageLayoutProps) {

    return (

        <div
            className="
                p-8
                max-w-7xl
                mx-auto
                h-screen
            "
        >

            <div

                className="

                    space-y-8

                "

            >

                {children}

            </div>

        </div>

    );
}