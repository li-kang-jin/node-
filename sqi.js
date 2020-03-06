let mysql = require('mysql');

//console.log(mysql)
let options = {
  host:"localhost",
  //port:"3306",//可选，默认式3306
  user:"root",
  password:"123456",
  database:"hello"
}
//创建与数据库的连接的对象
let con = mysql.createConnection(options);

con.connect((err)=>{
  if(err){
     console.log(err)
  }else{
    console.log('数据库连接成功')
  }
});

 
let strSql7 = "insert into user (username,password,mail) values (?,?,?)"
con.query(strSql7,["小红","password","123@126.com"],(err,results)=>{
    console.log(err);
    console.log(results)
})