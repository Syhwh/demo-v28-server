import app from './app';
import http from 'http';

const server = http.createServer(app);
console.log(`port ${process.env.PORT}`);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
