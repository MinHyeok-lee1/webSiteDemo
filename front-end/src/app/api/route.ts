import axios from "axios";

export async function GET(request: Request) {
  return new Response("Hello, Next.js!");
}

export async function getUserData() {
  const res = await axios
    .get("http://192.168.0.17:19004/user/all")
    .then((res) => res.data);
  // const data = await res.json();
  console.log(res);
  return res;
}
