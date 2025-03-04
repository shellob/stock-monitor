import StockChart from "../components/StockChart";
import StockTable from "../components/StockTable";

export default function Home() {
  return (
    <div className="container mx-auto p-6 bg-black min-h-screen text-white">
      <h1 className="text-center text-4xl font-bold text-[#38B68D]">
        📈 Биржевой Монитор
      </h1>
      <StockTable />
      <StockChart />
    </div>
  );
}
