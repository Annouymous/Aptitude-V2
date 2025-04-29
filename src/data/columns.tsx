"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "lucide-react";
export type Payment = {
  username?: string;
  status?: number;
  score?: number;
  mobile?: string;
  birthYear?: string;
  progress?: {
    currentQuestion?: number;
    score?: number;
  };
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Full Name
        <ArrowDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile Number",
  },
  {
    accessorKey: "birthYear",
    header: "Birth Year",
  },
  {
    accessorKey: "score",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Score
        <ArrowDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("score") as string;
      return (
        <div className="w-full font-extrabold text-lg  justify-center items-center ">
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = Number(row.getValue("status"));
      return (
        <div className="w-full font-medium justify-center items-center ">
          {status === 0 && (
            <div className="bg-red-600/25 text-center rounded-md p-2">
              <span className="text-red-600">Failed</span>
            </div>
          )}
          {status === 1 && (
            <div className="bg-green-600/25 text-center rounded-md p-2">
              <span className="text-green-600 ">Passed</span>
            </div>
          )}
        </div>
      );
    },
  },
];
