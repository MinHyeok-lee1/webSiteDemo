import { Fragment, use } from "react";
import axios from "axios";

export default function Page() {
  const getdata = use(getSomething());
  return (
    <>
      <h1>순위표</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>직업</th>
              <th>나이</th>
              <th>전공</th>

              <th>LV</th>
              <th>SP</th>
              <th>HP</th>
              <th>MP</th>

              <th>보유 스킬</th>
            </tr>
          </thead>
          <tbody>
            {getdata.map((data) => (
              <tr key={data._id}>
                <td>{data.userBase.name}</td>
                <td>{data.userBase.role}</td>
                <td>{data.userBase.age}</td>
                <td>{data.userBase.major}</td>

                <td>{data.userPower.level}</td>
                <td>{data.userPower.sheildPower}</td>
                <td>{data.userPower.swordPower}</td>
                <td>{data.userPower.magicPower}</td>

                {data.userPower.skills.map((skill, idx: number) => (
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
