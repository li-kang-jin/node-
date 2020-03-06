
let axios = require('axios');
let cheerio = require('cheerio');
let sqlQuery = require('./lcMysql')







async function getPageUrl(num){
    let httpPage = "https://www.taoziba.com/type/id1-"+num+".html";
    let res = await axios.get(httpPage);
    //console.log(res.data)
     let $ = cheerio.load(res.data);
     let movieList = [];
     //#main > div.movielist > ul > li:nth-child(2) > a
     $('#main > div.movielist > ul > li > a').each((i,item)=>{
        let href = $(item).attr("href");
        let url ="https://www.taoziba.com/"+href;
         //console.log(url)
        movieList.push(url)
     });
     movieList.forEach(async function(item,i){  
      // console.log(item)
       await fn(item)
     })
    
}


async function fn(url){
   let res = await axios(url);
   let $ = cheerio.load(res.data);
   let title=$('#main > div.endpage.clearfix > div.l > div.info > h1').text();
   let httpUrl ="www.taoziba.com/" + $('#main > div:nth-child(4) > div.play-list > li > a').attr("href");
   let text = $("#main > div.endpage.clearfix > div.l > div.info > div.textdesc").text();
   let actor = $('#main > div.endpage.clearfix > div.l > div.info > ul > li:nth-child(3)').text();
   let diQu = $("#main > div.endpage.clearfix > div.l > div.info > ul > li:nth-child(5)").text();
    console.log(title)
   console.log(httpUrl) 
   console.log(text)
   console.log(actor)
   console.log(diQu)
   
   let arr =[title,httpUrl,text,actor,diQu];
   let strSql = "insert into movies (title,httpUrl,text,actor,diQu) values (?,?,?,?,?)";
   await sqlQuery(strSql,arr)
      console.log("电影写入数据库：",title) 

}
/* let a ="https://www.taoziba.com//movie/id116031.html";   
fn(a) */
 
async function wait(milliseconds){
   return new Promise(function(resolve,reject){
       setTimeout(function(){
           resolve()
       },milliseconds)
   })
}

async function spider(){
   //获取所有的页面总数
   for(let i=301;i<=500;i++){
       await wait(2000)
       getPageUrl(i)
   }
}


spider()