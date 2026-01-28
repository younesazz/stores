"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"

export default function OrdersChart({ data }: { data: { label: string; value: number }[] }) {
  return (
    <div className="h-70">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
