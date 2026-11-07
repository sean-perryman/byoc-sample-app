# byoc-sample-app

A deliberately tiny Node.js application for BYOC-PaaS smoke tests. It has no
Dockerfile: a platform should detect and build it with Railpack.

Run it locally with Node.js 20 or newer:

```sh
npm start
```

The application listens on `PORT` (default `3000`). `GET /` and `GET /marker`
return the contents of `marker.txt` as plain text. Smoke tests update that file
with a unique run marker, push the commit, and verify the deployed application
returns the new value.
