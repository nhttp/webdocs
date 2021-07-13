import { UnprocessableEntityError } from "./deps.ts";

export async function faunaQuery(query: string, variables: { [k: string]: any } = {}) {
    // const token = Deno.env.get("FAUNA_SECRET");
    const token = "fnAEN5gC6gACQN4D7TiuoCKZKBUhx3NVDVm1ecf2";
    if (!token) {
        throw new Error("environment variable FAUNA_SECRET not set");
    }
    const res = await fetch("https://graphql.fauna.com/graphql", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ query, variables })
    });
    const { data, errors } = await res.json();
    if (errors) {
        throw new UnprocessableEntityError(errors);
    }
    return data;
}