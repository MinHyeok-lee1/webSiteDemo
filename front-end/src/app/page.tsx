import { Fragment, use } from "react";
import axios from "axios";

export default function Page() {
  const getdata = use(getSomething());
  return (
    <>
      <h1>메인 페이지 </h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>직업</th>
              <th>나이</th>
              <th>전공</th>
              <th>스킬</th>
            </tr>
          </thead>
          <tbody>
            {getdata.map((data: any) => (
              <tr key={data._id}>
                <td>{data.name}</td>
                <td>{data.role}</td>
                <td>{data.age}</td>
                <td>{data.major}</td>

                {data.skills.map((skill: string, idx: number) => (
                  <td key={idx}>{skill}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export async function getSomething() {
  const res = await axios
    .get("http://192.168.0.17:19004/user/all")
    .then((res) => res.data);
  // const data = await res.json();
  console.log(res);
  return res;
}
