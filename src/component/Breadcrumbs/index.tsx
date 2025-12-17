"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

//  ShadCN Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";

//  App Data
import { sideMenu } from "@template/common/sideMenu";

//  Type
import { BreadcrumbsProps } from "@/interface/breadcrumbsProps.interface";

export default function Breadcrumbs({
  showIcon = false,
  classNames = "",
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  const menuMap: Record<string, any> = {};

  sideMenu.forEach((item) => {
    // Add parent item if it has `to`
    if (item.to) menuMap[item.to] = item;

    // Add children safely
    item.children?.forEach((child) => {
      if (child.to) menuMap[child.to] = child;
    });
  });

  //  Extract path segments
  const segments = pathname?.replace(/\/$/, "").split("/").filter(Boolean);

  //  Build breadcrumb items
  const items = segments?.map((seg, index) => {
    const href = "/" + segments?.slice(0, index + 1).join("/");
    const match = menuMap[href];

    const label = match
      ? t(match.label)
      : seg.charAt(0).toUpperCase() + seg.slice(1);

    const Icon = match?.Icon;
    const isLast = index === segments?.length - 1;

    return (
      <BreadcrumbItem key={href}>
        <BreadcrumbLink asChild>
          <Link
            href={href}
            className={`flex items-center gap-2 transition ${
              isLast
                ? "text-primary-menu font-semibold"
                : "text-muted-foreground hover:text-foreground hover:underline"
            }`}
          >
            {showIcon && Icon && <Icon className="w-4 h-4" />}
            {label}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
    );
  });

  //  Render
  return (
    <Breadcrumb className={classNames}>
      <BreadcrumbList className="flex items-center gap-0">
        {items?.map((item, index) => (
          <div key={index} className="flex items-center">
            {item}
            {index < items?.length - 1 && (
              <BreadcrumbSeparator className="text-muted-foreground mx-2">
                /
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
