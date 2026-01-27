export default function middleware(req) {
    const url = new URL(req.url);
    if (url.pathname === '/') {
        url.pathname = '/it';
        // Native Response.redirect is supported in Edge
        return Response.redirect(url.toString(), 307);
    }
}

export const config = {
    matcher: ['/'],
};
