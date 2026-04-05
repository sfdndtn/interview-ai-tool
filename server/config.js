// 配置文件
module.exports = {
  deepseek: {
    apiKey: process.env.DEEPSEEK_API_KEY || 'your_deepseek_api_key',
    baseUrl: 'https://api.deepseek.com',
    model: 'deepseek-chat' // 或 'deepseek-reasoner' 用于更复杂的推理
  }
};