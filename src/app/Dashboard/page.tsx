"use client";
import { columns, Payment } from "@/data/columns";
import { DataTable } from "@/data/data-table";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config";
import { useEffect, useState } from "react";

export default function DemoPage() {
  const [users, setUsers] = useState<Payment[]>([]);
  async function fetchUsers() {
    const querySnapshot = await getDocs(collection(db, "Collage_users"));
    const usersData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setUsers(usersData);
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
}
