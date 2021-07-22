const express = require('express');
const app = express();
const mongoClient = require('mongodb') //?
app.use(express.urlencoded({extended: true})); //경고메세지 안보이게


app.set('view engine','ejs');
app.set('views',__dirname+'/views');//이거 수정
app.engine('ejs', require('ejs').__express);//경로지정

var db;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://jina26861:Pa55w.rd@cluster0.cpnf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(error, client){
    if (error) return console.log(error)
    db = client.db('todoapp');
    app.listen(8080, (에러)=>{
        console.log(에러)
    })
    //db.collection('post').insertOne( {제목:'company',주소:'00회사'} , function(error,result){
    //     console.log('저장완료');
     //});


});

//app.use()
app.get('/list', function(요청,응답){
    db.collection('todolist').find().toArray( function(에러, 결과){
        console.log(결과)
        응답.render('list.ejs', {posts: 결과})
    })  
})
// app.get('/list', function(요청,응답){
//     db.collection('post').find().toArray( function(에러, 결과){
//         console.log(결과)
//         응답.render('list.ejs', {posts: 결과})
//     })  
// })
app.get('/write', function(요청,응답){
    응답.render('form')
    //응답.sendFile(__dirname+'index.html')
})
// app.post('/add', function(요청,응답){
//     db.collection('count').findOne( {name:'총게시물갯수'} , function(error,result){
//         if (error) return console.log(error)
//         console.log(result.totalpost)
//         var 총갯수 = result.totalpost

//         db.collection('post').insertOne( {title:요청.body.title,date:요청.body.date,_id:총갯수+1} , function(error,result){
//             if (error) return console.log(error)
//             console.log("저장완료")

//             db.collection('count').updateOne( {name:'총게시물갯수'} ,{ $inc:{totalpost:1}}, function(error,result){
//                 if (error) return console.log(err)
//                 응답.render('list')
//             })
//        });
// });
app.post('/add', function(요청,응답){
    db.collection('count').findOne( {name:'게시물갯수'} , function(error,result){
        if (error) return console.log(error)
        console.log(result.totalpost)
        var 총갯수 = result.totalpost

        db.collection('todolist').insertOne( {title:요청.body.title,date:요청.body.date,_id:총갯수+1} , function(error,result){
            if (error) return console.log(error)
            console.log("저장완료")

            db.collection('count').updateOne( {name:'게시물갯수'} ,{ $inc:{totalpost:1}}, function(error,result){
                if (error) return console.log(err)

                db.collection('todolist').find().toArray( function(에러, 결과){
                    응답.render('list.ejs', {posts: 결과})
                }) 
            })
       });
    });

})
app.get('/ejs',function(요청,응답){
    응답.render('index')
})
//mongoClient.connect('mongodb+srv://jina26861@Pa55w.rd', function(에러,client){
    // app.listen(8080, (에러)=>{
    //     console.log(에러)
    // })
//})


