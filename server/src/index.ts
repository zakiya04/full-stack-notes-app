/*import http, { IncomingMessage, ServerResponse } from "http";

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //these are preflight ones
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url ?? "";
  const method = req.method ?? "";

  if (url === "/api/notes" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "success!" }));
  } else if (url === "/api/notes" && method === "POST") {
    let body = "";

    // Collect the data chunks
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });

    // When all data has been received
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ received: parsed }));
        //youre just sending it back cause you dont have dB
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(5000, () => {
  console.log("Server running on localhost:5000");
});

//what all this server is doing is eithre getting the data or posting when it gets it is saying yes i got it but when it is posting then it just sends the data back to the brower?
*/


import http,{IncomingMessage,ServerResponse} from "http";

const server = http.createServer((req:IncomingMessage,res:ServerResponse)=>{
//what things i want from the browser
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Methods", "GET,POST,OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if(req.method == 'OPTIONS'){
    res.writeHead(204);
    res.end();
    return;
}
const method = req.method ?? "";

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