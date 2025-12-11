
import http,{IncomingMessage,ServerResponse} from "http";
import {Pool} from "pg";

const pool:Pool = new Pool({
    user:'Zakiya',
    password:'password',
    host:'localhost',
    port:5432,
    database:'noteo'
})
const server = http.createServer(async (req:IncomingMessage,res:ServerResponse)=>{

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
    let data = await pool.query('SELECT * FROM notes;')
    res.writeHead(200, {"Content-type":"application/json"});
    res.end(JSON.stringify(data.rows));
}
else if (method == 'POST'){
    let body ="";
    req.on('error',err => console.error(err));
    req.on('data',(chunks:Buffer)=>{
       body += chunks.toString()
    });
    req.on('end',async()=>{
        try{
            const parse = JSON.parse(body);
            
            const query= `INSERT INTO note (title,body,pinned) VALUES($1,$2,$3) RETURNING *`
            const values = [parse.title,parse.body,parse.pinned];
            const result = await pool.query(query,values)

            res.writeHead(200,{"Content-type":"appliccation/json"});
            res.end(JSON.stringify(result.rows[0]))
        }
        catch{
            res.writeHead(400,{"Content-type":"application/json"});
            res.end(JSON.stringify({ error: "Not found" }));
        }
    })
}
else if (req.method == "DELETE"){
    let body = "";
    req.on('data',(chunk)=>{
        body += chunk
    });
    req.on('end',async ()=>{
        const {id} = JSON.parse(body);
        
        try{
           const note = await pool.query(`SELECT * FROM note WHERE id = $1`,[id]);

        if (note.rowCount === 0){
            res.writeHead(404,{"Content-Type":"application/json"});
            res.end(JSON.stringify({error:'Notes Not Found'}))
        }
        await pool.query(`delete from note where id = $1 `,[id]);
        const updated = await pool.query(`select * from note`);

        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(updated.rows));
        }
       catch{
        res.writeHead(404,{"Content-Type":"application/json"});
        res.end(JSON.stringify({error:"Could'nt get note"}))
       }
    })
}
});


server.listen(5000,()=>{
    console.log("Server Chala")
})