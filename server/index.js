const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const interviewRoutes = require('./src/routes/interviewRoutes');
const resumeRoutes = require('./src/routes/resumeRoutes');

const app = express();
const port = 5001;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 路由
app.use('/api', interviewRoutes);
app.use('/api', resumeRoutes);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '服务运行正常' });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});