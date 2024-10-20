// app.js
const express = require('express');
const axios = require('axios');
const morgan = require('morgan'); // 引入morgan
const cors = require('cors'); // 引入cors
const app = express();
const PORT = 3000;

// 使用CORS中間件
app.use(cors({
    origin: 'http://localhost:3001', // 允許的來源，根據您的前端地址進行設置
}));

// 使用morgan中間件來記錄請求日誌
app.use(morgan('combined')); // 'combined'格式會顯示詳細的請求日誌

// 解析x-www-form-urlencoded格式的請求體
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Node.js application!' });
});

app.post('/get-token', async (req, res) => {
    const url = 'https://ap02.manage.samsungknox.com/emm/oauth/token';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'TommyAPI@thinkingsoftware.tw',
        client_secret: 'P@ssw0rd',
    });

    try {
        const response = await axios.post(url, data, { headers });
        res.json(response.data);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ detail: error.response.data });
        } else {
            res.status(500).json({ detail: 'An error occurred' });
        }
    }
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});