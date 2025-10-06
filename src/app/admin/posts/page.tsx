import NavBarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function PostPages() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <NavBarAdmin />
        <div className="ml-64 overflow-y-auto p-6 mt-7">
          <h1 className="text-2xl font-bold mb-3">Data Posts</h1>
          <h2>
            <Link
              className="inline-block rounded-lg px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
              href={"/admin/posts/add-posts"}
            >
              Tambah Post
            </Link>
          </h2>
          <div className="overflow-x-auto mt-5">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-4 py-2 font-medium">
                      Invoice
                    </TableHead>
                    <TableHead className="px-4 py-2 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="px-4 py-2 font-medium">
                      Method
                    </TableHead>
                    <TableHead className="px-4 py-2 font-medium">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium px-4 py-2">
                      INV001
                    </TableCell>
                    <TableCell className="font-medium px-4 py-2">
                      Paid
                    </TableCell>
                    <TableCell className="font-medium px-4 py-2">
                      Credit Card
                    </TableCell>
                    <TableCell className="font-medium px-4 py-2">
                      $250.00
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
