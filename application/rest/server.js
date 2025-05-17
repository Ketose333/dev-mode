const express = require('express');
const app = express();
let path = require('path');
let sdk = require('./sdk');

const PORT = 8001;
const HOST = '0.0.0.0';
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/init', function (req, res) {
    let a = req.query.a;
    let aval = req.query.aval;
    let b = req.query.b;
    let bval = req.query.bval;
    let args = [a, aval, b, bval];
    sdk.send(false, 'Init', args, res);
 });

app.get('/invoke', function (req, res) {
    let a = req.query.a;
    let b = req.query.b;
    let value = req.query.value;
    let args = [a, b, value];
    sdk.send(false, 'Invoke', args, res);
});

app.get('/query', function (req, res) {
    let name = req.query.name;
    let args = [name];
    sdk.send(true, 'Query', args, res);
 });

 app.get('/delete', function (req, res) {
    let name = req.query.name;
    let args = [name];
    sdk.send(false, 'Delete', args, res);
});

app.get('/queryAll', function (req, res) {
    sdk.send(true, 'GetAllQuery', [], res);
});


// 차량 등록
app.post('/addCar', (req, res) => {
  const { vin, owner, model } = req.body;
  const args = [vin, owner, model];
  sdk.send(false, 'AddCar', args, res);
});

// 차량 수리 기록 등록
app.post('/addCarRecord', (req, res) => {
  const { vin, record } = req.body;
  const args = [vin, record];
  sdk.send(false, 'AddCarRecord', args, res);
});

// 차량 수리기록 조회
app.get('/getCar', (req, res) => {
  const { vin } = req.query;  // 쿼리 파라미터에서 vin 받기
  if (!vin) {
    return res.status(400).json({ error: "vin is required" });
  }
  const args = [vin];
  sdk.send(true, 'GetCar', args, res);  // true: evaluateTransaction (조회)
});



// 포인트 수령
app.post('/receivePoints', (req, res) => {
  const { vin, points } = req.body;
  const args = [vin, points];
  sdk.send(false, 'ReceivePoints', args, res);
});

// 포인트 사용
app.post('/payPoints', (req, res) => {
  const { vin, points } = req.body;
  const args = [vin, points];
  sdk.send(false, 'PayPoints', args, res);
});




app.use(express.static(path.join(__dirname, '../client')));
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
