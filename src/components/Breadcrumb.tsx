import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  routes: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ routes }) => {
  return (
    <nav className="flex items-center self-stretch p-3 lg:py-4">
      <ol className="flex items-center flex-grow flex-wrap">
        {routes.map((route, index) => (
          <li
            key={index}
            className={`flex items-center ${
              index === routes.length - 1 ? "flex-1 overflow-hidden" : ""
            }`}
          >
            {route.href ? (
              <Link
                href={route.href}
                className={`text-14 font-400  break-words line-clamp-1 ${
                  index === routes.length - 1 ? "text-primary-default" : ""
                }`}
              >
                {route.label}
              </Link>
            ) : (
              <span
                className={`px-1 break-words line-clamp-1 ${
                  index === routes.length - 1 ? "text-primary-default" : ""
                }`}
              >
                {route.label}
              </span>
            )}
            {index < routes.length - 1 && (
              <span className="px-1 text-gray-400">{`>`}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
