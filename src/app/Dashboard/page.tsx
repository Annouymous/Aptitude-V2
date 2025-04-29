import { columns, Payment } from "@/data/columns";
import { DataTable } from "@/data/data-table";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../config";

async function fetchUsers() {
  const querySnapshot = await getDocs(collection(db, "Collage_users"));
  const usersData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
  }));
  return usersData;
}

export default async function DemoPage() {
  const data = await fetchUsers();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
