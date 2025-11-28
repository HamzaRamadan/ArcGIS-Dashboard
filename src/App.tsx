/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import MapViewComponent from "./components/MapViewComponent";
import RightPanel from "./components/RightPanel";
import Topbar from "./components/Navbar";
import NationwideCharts from "./components/NationwideCharts";

export default function App() {
  const [mapView, setMapView] = useState<any>(null);
  const [mapLayer, setMapLayer] = useState<any>(null);

  const [chartData, setChartData] = useState<{
    population: number[];
    agingIndex: number[];
    gdp: number[];
  }>({
    population: [],
    agingIndex: [],
    gdp: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // ⬅ شاشة التحميل
  if (isLoading) {
    return (
      <div
        className="h-screen w-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-[#0B6E4F] to-[#094F3A] text-white animate-fadeIn space-y-6"
      >
        {/* Animated Dots */}
        <div className="flex space-x-3">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
        </div>

        <p className="text-sm opacity-80 tracking-wide">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-gray-50 overflow-auto">
      <Topbar
        brandLogo="/logo-ahda.svg"
        brandPrimary="#0b6e4f"
        brandAccent="#f2c94c"
        onZoomClick={() => mapView?.goTo(mapLayer?.fullExtent)}
      />

      <div
        className="
          grid 
          grid-cols-1 
          lg:grid-cols-[1fr_380px] 
          h-auto 
          lg:h-[calc(100vh-64px)]
          w-full
        "
      >
        <div className="flex flex-col w-full overflow-visible lg:overflow-hidden">
          <div className="flex-1 relative w-full overflow-visible">
            <MapViewComponent
              setChartData={setChartData}
              setView={setMapView}
              setLayer={setMapLayer}
            />
          </div>

          <div className="block lg:hidden p-4 bg-white shadow rounded-b-lg overflow-visible w-full">
            <NationwideCharts chartData={chartData} />
          </div>
        </div>

        <div className="p-4 lg:pt-6 lg:pr-6 overflow-y-auto overflow-x-hidden w-full h-full">
          <RightPanel />
        </div>
      </div>

      <div className="hidden lg:block p-4 bg-white shadow rounded-b-lg overflow-hidden w-full">
        <NationwideCharts chartData={chartData} />
      </div>
    </div>
  );
}
