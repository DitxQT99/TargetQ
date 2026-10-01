const ENDPOINT="https://api-faa.my.id/faa/ai-promt";

module.exports=async(req,res)=>{
  if(req.method!=="GET") return res.status(405).json({error:"Method Not Allowed"});
  try{
    const prompt=String(req.query?.prompt||"").slice(0,12000);
    const query=String(req.query?.query||"").slice(0,12000);
    if(!query) return res.status(400).json({error:"query wajib diisi"});
    const url=`${ENDPOINT}?prompt=${encodeURIComponent(prompt)}&query=${encodeURIComponent(query)}`;
    const r=await fetch(url,{headers:{accept:"application/json"},cache:"no-store"});
    const text=await r.text();
    res.setHeader("Cache-Control","no-store, max-age=0");
    res.setHeader("Content-Type","application/json; charset=utf-8");
    return res.status(r.status).send(text);
  }catch(err){
    console.error("ai-chat proxy",err);
    return res.status(502).json({error:"AI provider tidak dapat dihubungi."});
  }
};
