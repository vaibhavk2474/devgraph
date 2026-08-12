const requiredEnv = [
    "PORT",
    "COGNODB_URI",
    "COGNODB_USERNAME",
    "COGNODB_PASSWORD",
] as const;

for (const key of requiredEnv) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

export default {
    port: Number(process.env.PORT),
    cognodbUri: process.env.COGNODB_URI,
    cognodbUsername: process.env.COGNODB_USERNAME,
    cognodbPassword: process.env.COGNODB_PASSWORD,
};