// Code: Login API
export async function POST(request: Request) {
  return request
    .json()
    .then((body) => {
      if (body.username === "admin" && body.password === "admin") {
        return new Response(JSON.stringify({ token: "123" }), { status: 200 });
      }
      return new Response("Unauthorized", { status: 401 });
    })
    .catch(() => new Response("Bad Request", { status: 400 }));
}
