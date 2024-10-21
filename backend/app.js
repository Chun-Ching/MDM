// app.js
const express = require('express');
const axios = require('axios');
const morgan = require('morgan'); // 引入morgan
const cors = require('cors'); // 引入cors
const app = express();
const PORT = 3000;
const tokenUrl = 'https://ap02.manage.samsungknox.com/emm/oauth/token';
const devicelistapi = 'https://ap02.manage.samsungknox.com/emm/oapi/device/selectDeviceList'; // 注意這裡的 URL 變化

// 使用CORS中間件
app.use(cors());

// 使用morgan中間件來記錄請求日誌
app.use(morgan('combined')); // 'combined'格式會顯示詳細的請求日誌

// 解析x-www-form-urlencoded格式的請求體
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Node.js application!' });
});

// 獲取 Token 並立即獲取裝置列表 (官方)
app.post('/api/devices-list', async (req, res) => {
    const tokenHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const tokenData = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'TommyAPI@thinkingsoftware.tw',
        client_secret: 'P@ssw0rd',
    });

    try {
        // 獲取 Token
        console.log('正在獲取 Token...');
        const tokenResponse = await axios.post(tokenUrl, tokenData, { headers: tokenHeaders });
        const token = tokenResponse.data.access_token;
        console.log('成功獲取 Token:', token);

        // 使用獲取的 Token 來獲取裝置列表
        console.log('正在獲取裝置列表...');
        const deviceResponse = await axios.post(devicelistapi, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            }
        });

        // 返回裝置列表數據
        console.log('成功獲取裝置列表');
        res.json(deviceResponse.data);
    } catch (error) {
        console.error('發生錯誤:', error);
        if (error.response) {
            console.error('API 響應錯誤:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            console.error('未知錯誤:', error.message);
            res.status(500).json({ error: '獲取裝置列表時發生錯誤', details: error.message });
        }
    }
});

// 新增 API：同步取得Token和裝置列表中的 userName (自行改寫)
app.get('/api/devices-usernames', async (req, res) => {
    const tokenHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const tokenData = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'TommyAPI@thinkingsoftware.tw',
        client_secret: 'P@ssw0rd',
    });

    try {
        // 獲取 Token
        console.log('正在獲取 Token...');
        const tokenResponse = await axios.post(tokenUrl, tokenData, { headers: tokenHeaders });
        const token = tokenResponse.data.access_token;
        console.log('成功獲取 Token:', token);

        // 使用獲取的 Token 來獲取裝置列表
        console.log('正在獲取裝置列表...');
        const deviceResponse = await axios.post(devicelistapi, null, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            }
        });

        console.log('設備列表 API 響應:', deviceResponse.data);

        // 檢查數據格式並提取 userName
        if (deviceResponse.data.resultValue && Array.isArray(deviceResponse.data.resultValue.deviceList)) {
            const usernames = deviceResponse.data.resultValue.deviceList.map(device => device.userName);
            console.log('成功獲取並處理裝置列表的 userName');
            res.json(usernames);
        } else {
            console.error('設備列表數據格式錯誤:', deviceResponse.data);
            res.status(500).json({ error: '設備列表數據格式錯誤' });
        }
    } catch (error) {
        console.error('發生錯誤:', error);
        if (error.response) {
            console.error('API 響應錯誤:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            console.error('未知錯誤:', error.message);
            res.status(500).json({ error: '獲取裝置列表時發生錯誤', details: error.message });
        }
    }
});

// 新增 API：根據裝置 ID 獲取裝置位置並提取經緯度
app.post('/api/devices-location/:deviceId', async (req, res) => {
    const { deviceId } = req.params; // 獲取裝置 ID
    const tokenHeaders = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    const tokenData = new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: 'TommyAPI@thinkingsoftware.tw',
        client_secret: 'P@ssw0rd',
    });

    try {
        // 獲取 Token
        console.log('正在獲取 Token...');
        const tokenResponse = await axios.post(tokenUrl, tokenData, { headers: tokenHeaders });
        const token = tokenResponse.data.access_token;
        console.log('成功獲取 Token:', token);

        // 使用獲取的 Token 來獲取裝置位置
        console.log('正在獲取裝置位置...');
        const locationResponse = await axios.post('https://ap02.manage.samsungknox.com/emm/oapi/device/selectDeviceLocation', new URLSearchParams({
            deviceId: deviceId
        }), {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            }
        });

        console.log('裝置位置 API 響應:', locationResponse.data);

        // 提取經緯度
        const { latitude, longitude } = locationResponse.data.resultValue;

        // 返回經緯度數據
        res.json({ latitude, longitude });
    } catch (error) {
        console.error('發生錯誤:', error);
        if (error.response) {
            console.error('API 響應錯誤:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data });
        } else {
            console.error('未知錯誤:', error.message);
            res.status(500).json({ error: '獲取裝置位置時發生錯誤', details: error.message });
        }
    }
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
