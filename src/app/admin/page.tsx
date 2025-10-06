import NavBarAdmin from "@/components/NavbarAdmin";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminPages() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <NavBarAdmin />
        <div className="ml-64 overflow-y-auto p-6 mt-7">
          <h1 className="text-2xl font-bold text-slate-700">Dashboard Admin</h1>
          <p className="text-slate-500 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, nobis.
          </p>
          <Card>
            <CardHeader className="text-2xl">
              <h1>Order</h1>
            </CardHeader>
            <CardContent>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
                recusandae explicabo perferendis minus sint voluptas, sapiente
                aliquid eos assumenda natus vero pariatur doloribus ut cum? Ipsa
                natus excepturi fugit quisquam.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
