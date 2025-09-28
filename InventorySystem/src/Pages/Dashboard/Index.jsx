// src/pages/dashboard/page.tsx or page.jsx

import AppLayout from "@/Layout"
import AreaChart from "./Charts/AreaChart"
import DashboardCards from "./Cards/DashboardCards"
import ChartBarMultiple from "./Charts/BarChart"
import ChartPieDonutText from "./Charts/PieChart"
export default function DashboardPage() {
  return (
    <AppLayout>

        {/* Cards */}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="" >
            <DashboardCards 
                CardDescriptionContent = 'Total Revenue'
                CardTitleContent = '$1,250.00'
                BadgeContent = '+12.5%'
                FooterMainContent = 'Trending up this month'
                FooterSubContent = 'Visitors for the last 6 months'
            />
        </div>
        <div className="" >
            <DashboardCards 
                CardDescriptionContent = 'Total Revenue'
                CardTitleContent = '$1,250.00'
                BadgeContent = '+12.5%'
                FooterMainContent = 'Trending up this month'
                FooterSubContent = 'Visitors for the last 6 months'
            />
        </div>
        <div className="" >
            <DashboardCards 
                CardDescriptionContent = 'Total Revenue'
                CardTitleContent = '$1,250.00'
                BadgeContent = '+12.5%'
                FooterMainContent = 'Trending up this month'
                FooterSubContent = 'Visitors for the last 6 months'
            />
        </div>
      </div>

      {/* Area charts */}

      <div className="" >
        <AreaChart />
      </div>

        {/* Bar Charts */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <div className="">
                <ChartBarMultiple />
            </div>
            <div className="">
                <ChartPieDonutText />
            </div>
        </div>

    </AppLayout>
  )
}
