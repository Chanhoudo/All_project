var express = require('express');
var favicon = require('serve-favicon');
const session = require('express-session')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)
var path = require('path');

var index = require('./routes/index');
var users = require('./routes/users');

var authRouter = require('./login/auth.js');
var authCheck = require('./login/authCheck.js');
var template = require('./login/template.js');

const app = express();

app.listen(8080, function(){
    console.log('listening on 8080\n');
});

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.com',function(req, res){
    res.sendFile(__dirname + '/index.html');
});


app.get('/record.com',function(req, res){
    res.sendFile(__dirname + '/record.html');
});

app.use('/images',express.static('images'));
app.use('/css',express.static('css'));
app.use('/fonts',express.static('fonts'));
app.use('/js',express.static('js'));
app.use('/node_modules',express.static('node_modules'));

//이벤트 핸들러 (input), 버튼 눌렀을때 함수 호출 => input내부에 적혀있는 값을 가져올수 있음.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

// 인증 라우터
app.use('/auth', authRouter);

// 메인 페이지
app.get('/login.com', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
  }
  else{var html = template.HTML('Welcome',
    `<hr>
    <h2>메인 페이지에 오신 것을 환영합니다</h2>
    <p>로그인에 성공하셨습니다.</p>`,
    );    
    res.redirect('/');
    res.send(html);
    }
})


// 메인 페이지
app.get('/block', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
  }
  else{
    res.redirect('block/list');
    res.send(html);
    }
})








//block

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/block', require('./routes/block'));

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

