const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const zlib=require('node:zlib');
const root=path.resolve(__dirname,'..');
const reviewRoot=process.argv[2]?path.resolve(process.argv[2]):null;
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.md':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
 let rel;try{rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 const review=reviewRoot&&rel.startsWith('/revisao/');
 const base=review?reviewRoot:root;
 let file=path.resolve(base,'.'+(review?rel.slice('/revisao'.length):rel));
 if(file!==base&&!file.startsWith(base+path.sep)){res.writeHead(403).end();return}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)){res.writeHead(404).end('Not found');return}
 const type=types[path.extname(file)]||'application/octet-stream';
 let data=fs.readFileSync(file);
 const qa=new URL(req.url,'http://localhost').searchParams.has('qa');
 if(qa&&path.extname(file)==='.html')data=Buffer.from(data.toString().replace('</body>','<script src="/scripts/qa-metrics.js"></script></body>'));
 const gzip=/(?:text\/|application\/json)/.test(type)&&(req.headers['accept-encoding']||'').includes('gzip');
 const out=gzip?zlib.gzipSync(data):data;
 const headers={'Content-Type':type,'Content-Length':out.length,'Cache-Control':'no-store',...(gzip?{'Content-Encoding':'gzip','Vary':'Accept-Encoding'}:{})};
 const slow=/[?&]network=mobile/.test(req.url)||/[?&]network=mobile/.test(req.headers.referer||'');
 if(slow){setTimeout(()=>{res.writeHead(200,headers);let pos=0;const send=()=>{if(res.destroyed)return;const next=Math.min(out.length,pos+16384);res.write(out.subarray(pos,next));pos=next;if(pos>=out.length)res.end();else setTimeout(send,82)};send()},150)}else{res.writeHead(200,headers);res.end(out)}
}).listen(8765,'127.0.0.1',()=>console.log('Prévia: http://127.0.0.1:8765/'));
