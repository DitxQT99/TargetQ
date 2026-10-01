const ENDPOINT="https://api-faa.my.id/faa/tiktokstalk";

module.exports=async(req,res)=>{
  if(req.method!=="GET") return res.status(405).json({error:"Method Not Allowed"});
  try{
    const username=String(req.query?.username||"").trim().replace(/^@/,"");
    if(!username) return res.status(400).json({error:"username wajib diisi"});
    const url=`${ENDPOINT}?username=${encodeURIComponent(username)}`;
    const r=await fetch(url,{headers:{accept:"application/json"},cache:"no-store"});
    const text=await r.text();
    res.setHeader("Cache-Control","no-store, max-age=0");
    res.setHeader("Content-Type","application/json; charset=utf-8");
    return res.status(r.status).send(text);
  }catch(err){
    console.error("tiktokstalk proxy",err);
    return res.status(502).json({error:"TikTok profile provider tidak dapat dihubungi."});
  }
};
