import {
    NavLink,
    Outlet,
    useLocation
} from "react-router-dom";

import {
    Menu,
    LayoutDashboard,
    Milk,
    DollarSign,
    Users,
    Package,
    Receipt,
    FileText,
    Printer,
    BarChart3,

} from "lucide-react";

import logo from "./assets/logo.png";

import { useState } from "react";

export default function AppLayout() {
    const location = useLocation();

    const pageTitles: Record<string, string> = {
        "/dashboard": "Dashboard",
        "/daily-entry": "Daily Entry",
        "/customer": "Customer Management",
        "/product": "Product Management",
        "/payments": "Payments",
        "/billing": "Billing",
        "/single-bill": "Single Bill Printing",
        "/bulk-bills": "Bulk Bill Printing",
        "/report": "Monthly Reports",
    };

    const pageTitle =
        pageTitles[
            location.pathname
        ] ?? "Vrindavan Dairy";

    const sections = [
        {
            title: "Home",
            items: [
                {
                    label: "Dashboard",
                    path: "/dashboard",
                    icon: LayoutDashboard,
                },
            ],
        },
        {
            title: "Operations",
            items: [
                {
                    label: "Daily Entry",
                    path: "/daily-entry",
                    icon: Milk
                },
                {
                    label: "Payments",
                    path: "/payments",
                    icon: DollarSign
                },
            ],
        },
        {
            title: "Management",
            items: [
                {
                    label: "Customer Management",
                    path: "/customer",
                    icon: Users
                },
                {
                    label: "Product Management",
                    path: "/product",
                    icon: Package
                },
            ],
        },
        {
            title: "Billing",
            items: [
                {
                    label: "Bill Preview",
                    path: "/billing",
                    icon: Receipt
                },
                {
                    label: "Single Bill",
                    path: "/single-bill",
                    icon: FileText
                },
                {
                    label: "Bulk Bill Printing",
                    path: "/bulk-bills",
                    icon: Printer
                },
            ],
        },
        {
            title: "Reports",
            items: [
                {
                    label: "Monthly Supplies Reports",
                    path: "/report",
                    icon: BarChart3
                },
            ],
        },
    ];

    const [sidebarOpen, setSidebarOpen] =
        useState(true);

    return (

        <div
            className="
                h-screen
                flex
                bg-[#F8F5EF]
                overflow-hidden
            "
        >

            {/* Sidebar */}

            <aside
                className={
                    `
                        ${
                            sidebarOpen                
                                ? "w-64"
                                : "w-20"
                        }
                        h-screen
                        flex
                        flex-col
                        flex-shrink-0
                        bg-[#2F4F2F]
                        text-white
                        border-r
                        border-white/10
                        shadow-md
                        transition-all
                        duration-300
                    `
                }
            >

                <div
                    className="
                        px-6
                        py-8
                        border-b
                        border-white/10
                    "
                >

                    {sidebarOpen ? (

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <img
                                src={logo}
                                alt="Logo"
                                className="
                                    h-15
                                    w-15
                                    object-contain
                                "
                            />

                            <div>

                                <h1
                                    className="
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                    "
                                >
                                    Vrindavan Dairy
                                </h1>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-green-100
                                    "
                                >
                                    Fresh Milk • Healthy Life
                                </p>

                            </div>

                        </div>

                    ) : (

                        <div
                            className="
                                flex
                                justify-center
                            "
                        >

                            <span>VD</span>

                        </div>

                    )}

                </div>

                <nav
                    className="
                        flex-1
                        overflow-y-auto
                        px-5
                        py-6
                        min-h-0
                    "
                >

                    {sections.map(
                        (section) => (

                            <div
                                key={section.title}
                                className="mb-8"
                            >

                                {sidebarOpen && (

                                    <div
                                        className="
                                            mb-3
                                            px-2
                                            text-[11px]
                                            font-semibold
                                            uppercase
                                            tracking-[0.18em]
                                            text-green-200
                                        "
                                    >
                                        {section.title}
                                    </div>

                                )}

                                <div className="space-y-2">

                                {section.items.map(
                                    (item) => {

                                        const Icon =
                                            item.icon;

                                        return (

                                            <NavLink

                                                key={item.path}

                                                to={item.path}

                                                className={(
                                                    {
                                                        isActive,
                                                    },
                                                ) =>
                                                    `
                                                        flex
                                                        items-center
                                                        rounded-xl
                                                        transition-all
                                                        duration-200
                                                        ${
                                                            sidebarOpen
                                                                ? "px-4 py-3 gap-3"
                                                                : "justify-center py-3"
                                                        }
                                                        ${
                                                            isActive
                                                                ? "bg-[#6B8E5E] shadow-sm"
                                                                : "hover:bg-white/10"
                                                        }
                                                    `
                                                }

                                            >

                                                <Icon
                                                    size={20}
                                                    className="
                                                        flex-shrink-0
                                                    "
                                                />

                                                {sidebarOpen && (

                                                    <span
                                                        className="
                                                            font-medium
                                                        "
                                                    >
                                                        {item.label}
                                                    </span>

                                                )}

                                            </NavLink>

                                        );

                                    },
                                )}

                                </div>

                            </div>

                        ),
                    )}

                </nav>

                <div
                    className="
                        border-t
                        border-white/10
                        px-5
                        py-4
                        text-xs
                        text-green-100
                    "
                >

                    {sidebarOpen && (
                        <>Vrindavan Dairy v1.0</>
                    )}

                </div>

            </aside>

            {/* Right Side */}

            <div
                className="
                    flex-1
                    flex
                    flex-col
                    bg-[#FAF7F2]
                    overflow-hidden
                "
            >

                {/* Top Navigation */}

                <header
                    className="
                        h-16
                        bg-[#FAF7F2]
                        border-b
                        border-[#E7DFD3]
                        flex
                        items-center
                        justify-between
                        px-8
                        flex-shrink-0
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-4
                        "
                    >

                        <button
                            type="button"
                            onClick={() =>
                                setSidebarOpen(
                                    (previous) =>
                                        !previous,
                                )
                            }
                            className="
                                text-2xl
                                text-[#2F4F2F]
                                hover:text-[#6B8E5E]
                                transition
                            "
                            >
                            <Menu size={22} />
                        </button>

                        <div>

                            <h2
                                className="
                                    text-lg
                                    font-semibold
                                    text-[#2B2B2B]
                                "
                            >
                                {pageTitle}
                            </h2>

                        </div>

                    </div>

                    <div
                        className="
                            text-sm
                            text-gray-500
                        "
                    >

                        {new Date().toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            },
                        )}

                    </div>

                </header>

                {/* Page */}

                <main
                    className="
                        flex-1
                        overflow-y-auto
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );
}