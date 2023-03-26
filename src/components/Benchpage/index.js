import React from 'react';

const link = "https://raw.githubusercontent.com/nhttp/benchmarks/master/results/result.json";
export default function Benchmark() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState("");
  React.useEffect(() => bench(), []);
  const bench = async () => {
    const res = await fetch(link);
    if (res.ok) {
      const datas = await res.json();
      setLoading(false);
      const arr = datas.map((el) => {
        return {
          ...el,
          href: el.Name.split("](")[1].replace(")", "")
        }
      }).filter((el) => el["Lang/Runtime"] === "Deno");
      setData(arr);
      setDate(arr[0]?.["Date"]);
    }
  }
  if (loading) return <h1>loading...</h1>;
  return (
    <div>
      <i>Auto Run Benchmark At : {date}</i>
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
                  <a href={el.href} target="_blank" rel="noopener noreferrer">{el.OriginalName}</a>
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
      <p>Created By : <a href="https://github.com/nhttp/benchmarks/commits?author=github-actions%5Bbot%5D" target="_blank" rel="noopener noreferrer">bot_ci</a></p>
    </div>
  )
}