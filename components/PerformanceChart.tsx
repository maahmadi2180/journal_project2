import React from 'react';
import {
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
} from 'recharts';

interface ChartData {
    name: string;
    pnl: number;
}

interface PerformanceChartProps {
    data: ChartData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
    // Show placeholder if there is only the starting point (no closed trades)
    if (!data || data.length <= 1) {
        return (
            <div className="flex items-center justify-center h-[300px] bg-gray-800/50 rounded-lg text-gray-400">
                برای نمایش نمودار، حداقل یک معامله بسته شده نیاز است.
            </div>
        );
    }
    
    const gradientId = "pnlGradient";

    return (
        <>
          <svg style={{ height: 0, width: 0, position: 'absolute' }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#68d391" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#68d391" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </svg>
          <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
                  <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#a0aec0', fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: '#a0aec0', fontSize: 12 }} />
                  <Tooltip
                      contentStyle={{
                          backgroundColor: 'rgba(30, 41, 59, 0.9)',
                          borderColor: '#4a5568',
                          color: '#e2e8f0',
                          borderRadius: '0.5rem',
                      }}
                      labelStyle={{ color: '#cbd5e0' }}
                      itemStyle={{ fontWeight: 'bold' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pnl" 
                    name="سود/زیان تجمعی" 
                    stroke="#68d391" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill={`url(#${gradientId})`} />
              </AreaChart>
          </ResponsiveContainer>
        </>
    );
};

export default PerformanceChart;
