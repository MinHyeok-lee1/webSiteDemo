import axios from "axios";
import { getUserData } from "./api/route";
import Layout from "./loading";

// This is an async Server Component
export default async function Page() {
  const getData = await getUserData();

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
            {getData.map((data: any) => (
              <tr key={data._id}>
                <td>{data.userBase.name}</td>
                <td>{data.userBase.role}</td>
                <td>{data.userBase.age}</td>
                <td>{data.userBase.major}</td>

                <td>{data.userPower.level}</td>
                <td>{data.userPower.sheildPower}</td>
                <td>{data.userPower.swordPower}</td>
                <td>{data.userPower.magicPower}</td>

                {data.userPower.skills.map((skill: [string], idx: number) => (
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
