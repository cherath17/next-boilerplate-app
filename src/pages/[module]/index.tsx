// pages/[module]/index.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import DashBoardLayout from "@/Layout/dashboardLayout";
import NoData from "@/component/Empty";
import { AlertCircle } from "lucide-react";

const validModules = [
  "dashboard",
  "users",
  "portal",
  "language",
  "theming",
  "profile",
  "component",
  "station",
];

const ModulePage = () => {
  const router = useRouter();
  const { module } = router.query; // get dynamic route

  useEffect(() => {
    if (module && !validModules.includes(module as string)) {
      router.replace("/dashboard"); // redirect unknown module
    }
  }, [module, router]);

  if (
    !module ||
    (typeof module === "string" && !validModules.includes(module))
  ) {
    return (
      <NoData
        title="Module Under Progress"
        description={`The module "${module}" is not available yet.`}
        icon={AlertCircle}
      />
    );
  }

  return (
    <DashBoardLayout>
      <NoData
        title="Module Under Progress"
        description={`The module "${module}" is not available yet.`}
        icon={AlertCircle}
      />
      s
    </DashBoardLayout>
  );
};

export default ModulePage;
