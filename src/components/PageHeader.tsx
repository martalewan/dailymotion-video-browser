import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/dailymotion-logo.svg";

interface PageHeaderProps {
    children?: ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
    return (
        <header className="sticky top-0 z-10 bg-background/90 backdrop-blur-xl">
            <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
                <Link
                    to="/"
                    className="
                        shrink-0
                        rounded-md
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-brand-purple
                        focus-visible:ring-offset-2
                    "
                >
                    <img
                        src={logo}
                        alt="Dailymotion"
                        className="h-8"
                    />
                </Link>

                {children}
            </div>
        </header>
    );
}