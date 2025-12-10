
import http,{IncomingMessage,ServerResponse} from "http";
import {Pool} from "pg";

const pool:Pool = new Pool({
    user:'Zakiya',
    password:'password',
    host:'localhost',
    port:5432,
    database:'noteo'
})
const server = http.createServer((req:IncomingMessage,res:ServerResponse)=>{

//what things i want from the browser

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Methods", "GET,POST,OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// at first what will happen

if(req.method == 'OPTIONS'){
    res.writeHead(204);
    res.end();
    return;
}
const method = req.method ?? "";

// what will i give to requests 

if(method == 'GET'){
    res.writeHead(200, {"Content-type":"application/json"});
    res.end(JSON.stringify({message:"done!"}));
}
else if (method == 'POST'){
    let body ="";
    res.on('data',(chunks:Buffer)=>{
       body += chunks.toString()
    })
    req.on('end',()=>{
        try{
            const parse = JSON.parse(body)
            res.writeHead(200,{"Content-type":"appliccation/json"});
            res.end(JSON.stringify({message:parse}))
        }
        catch{
            res.writeHead(400,{"Content-type":"application/json"});
            res.end(JSON.stringify({ error: "Not found" }));
        }
    })
}

})


server.listen(5000,()=>{
    console.log("Server Chala")
})