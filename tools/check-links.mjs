import fs from 'node:fs'; import path from 'node:path';
const root='dist'; const files=[]; (function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name); e.isDirectory()?w(p):p.endsWith('.html')&&files.push(p)}})(root);
let bad=0,count=0;
for(const f of files){const h=fs.readFileSync(f,'utf8'); for(const m of h.matchAll(/(?:href|src)="(\/[^"#?]*)/g)){count++; let u=m[1]; let t=path.join(root,u); if(u.endsWith('/')) t=path.join(t,'index.html'); if(!fs.existsSync(t)){bad++;console.log('KIRIK',f,u)}}}
console.log(files.length+' sayfa, '+count+' baglanti, kirik: '+bad);
if (bad) process.exit(1);
