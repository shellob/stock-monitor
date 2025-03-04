import StockTable from "@/components/StockTable";
import StockChart from "@/components/StockChart";

export default function Home() {
  return (
    <main className="p-6 bg-black min-h-screen text-white">

      <StockTable />
      <StockChart />
    </main>
  );
}
