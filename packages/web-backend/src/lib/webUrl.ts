// the env is comma separated list of urls, we need to get the first one (with www)
export const WWW_WEB_URL = (process.env.WEB_URL || 'http://localhost:9179').split(',')[0].trim();
