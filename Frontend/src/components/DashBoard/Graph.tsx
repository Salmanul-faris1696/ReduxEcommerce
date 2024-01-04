import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie } from 'recharts';

interface DataItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const data: DataItem[] = [
  { name: 'jan', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'feb', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'mar', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'api', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'may', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'jun', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'july', uv: 3490, pv: 4300, amt: 2100 },
  { name: 'aug', uv: 3500, pv: 4000, amt: 2200 },
  { name: 'sep', uv: 4000, pv: 4500, amt: 2100 },
  { name: 'oct', uv: 2050, pv: 4300, amt: 2700 },
  { name: 'nov', uv: 3000, pv: 2500, amt: 2400 },
  { name: 'dec', uv: 3700, pv: 3200, amt: 2500 },

];

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const getPath = ({ x, y, width, height }: any) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar: React.FC<any> = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath({ x, y, width, height })} stroke="none" fill={fill} />;
};

const Graph: React.FC = () => {
  return (
    <div className=''>
        <div className='flex justify-center'>
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{ top: 20, right:5, left:5, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>

        </div>

        {/* <div>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>

        </div> */}

    </div>
  );
};

export default Graph;
