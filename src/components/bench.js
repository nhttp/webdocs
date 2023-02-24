import React from 'react';

const link = "https://raw.githubusercontent.com/herudi/deno_benchmarks/master/results/result.json";
export default function Benchmark() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState("");
  React.useEffect(() => bench(), []);
  const bench = async () => {
    const res = await fetch(link);
    if (res.ok) {
      const json = await res.json();
      setLoading(false);
      const arr = json.map((el) => {
        return {
          ...el,
          Name: el.Name.split("](")[1].replace(")", "")
        }
      })
      setData(arr);
      setDate(arr[0]?.["Date"]);
    }
  }
  if (loading) return <h1>loading...</h1>;
  return (
    <div>
      <i>Run At : {date}</i>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Framework</th>
            <th>AVG</th>
            <th>GET /</th>
            <th>GET /blog/99?title=bench</th>
            <th>GET /api/user (send json)</th>
            <th>Lang/Runtime</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, i) => {
            return (
              <tr key={i}>
                <td>{i+1}</td>
                <td>
                  <a href={el.Name} target="_blank" rel="noopener noreferrer">{el.OriginalName}</a>
                </td>
                <td>{el["AVG"]}</td>
                <td>{el["GET /"]}</td>
                <td>{el["GET /blog/:id"]}</td>
                <td>{el["GET /api/user"]}</td>
                <td>{el["Lang/Runtime"]}</td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
      
    </div>
  )
}