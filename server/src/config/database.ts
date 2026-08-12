import neo4j from "neo4j-driver";
import env from "./env.js";

const uri = env.cognodbUri;
const username = env.cognodbUsername;
const password = env.cognodbPassword;

if (!uri || !username || !password) {
    throw new Error("Missing CognoDB environment variables");
}

export const driver = neo4j.driver(
    uri,
    neo4j.auth.basic(username, password)
);