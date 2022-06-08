import dotenv from "dotenv";
import parseArgs from "minimist";

dotenv.config();
const args = parseArgs(process.argv.slice(2));

const getPort = () => {
    if (args.server === undefined)
        return 8080;
    
    if (args.server === true) 
        return 8080;
    
    return args.server;
}

const config = {
    PORT: getPort(),
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    MARIA_DB_CLIENT: process.env.MARIA_DB_CLIENT,
    MARIA_DB_HOST: process.env.MARIA_DB_HOST,
    MARIA_DB_USER: process.env.MARIA_DB_USER,
    MARIA_DB_PASSWORD: process.env.MARIA_DB_PASSWORD || "",
    MARIA_DB_DATABASE_NAME: process.env.MARIA_DB_DATABASE_NAME,
    MONGO_CONNECTION_STRING_SESSIONS: process.env.MONGO_CONNECTION_STRING_SESSIONS,
    MONGO_TTL_SESSIONS: Number(process.env.MONGO_TTL_SESSIONS),
    SESSION_SECRET: process.env.SESSION_SECRET,
    COOKIE_MAX_AGE: Number(process.env.COOKIE_MAX_AGE)
};

export default config;