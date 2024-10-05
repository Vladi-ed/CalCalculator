type CalHeaders = {
    Origin: string;
    "User-Agent": string;
    Referer: string;
    "content-type": string;
    Host: string;
    "Accept-Encoding": string;
    "cache-control": string;
    "Content-Length": string;
    pragma: string;
    accept: string;
    "x-site-id": string;
    authorization?: string;
}
export const method = 'POST';
export const headers:  CalHeaders = {
    "accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "Content-Length": "",
    "pragma": "no-cache",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
    "x-site-id": "09031987-273E-2311-906C-8AF85B17C8D9",
    "Host": "connect.cal-online.co.il",
    "Referer": "https://digital-web.cal-online.co.il/",
    "Origin": "https://digital-web.cal-online.co.il"
};

export const calApiUrl = 'https://api.cal-online.co.il/';
