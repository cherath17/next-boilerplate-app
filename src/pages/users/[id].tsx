"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { userData } from "@/constants/users";
import { User } from "@/interface/table.interface";
import DashBoardLayout from "@/Layout/dashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!id) return;
    // Find user dynamically based on query
    const foundUser = userData.find((u) => u.id === Number(id));
    setUser(foundUser || null);
  }, [id]);

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-red-500">User not found or loading...</p>
        <Link
          href="/users"
          className="text-blue-600 hover:underline mt-4 block"
        >
          ← Back to User List
        </Link>
      </div>
    );
  }

  return (
    <DashBoardLayout>
      <Card className="max-w-md p-4">
        <CardHeader>
          <CardTitle>User Detail</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 text-gray-700">
          <div>
            <span className="font-semibold">ID:</span> {user.id}
          </div>
          <div>
            <span className="font-semibold">Name:</span> {user.name}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {user.status}
          </div>
          <div>
            <span className="font-semibold">Role:</span> {user?.info.role}
          </div>
          <div>
            <span className="font-semibold">Years of Experience:</span>{" "}
            {user?.info?.yearsOfExperience}
          </div>

          <Link
            href="/users"
            className="inline-block mt-4 text-blue-600 hover:underline"
          >
            ← Back to User List
          </Link>
        </CardContent>
      </Card>
    </DashBoardLayout>
  );
}
