const express = require('express');
const router = express.Router();
const deepseekService = require('../services/deepseekService');

router.post('/analyze-interview', async (req, res) => {
  try {
    const { target_position, interview_question, user_answer } = req.body;
    
    if (!target_position || !interview_question || !user_answer) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const analysisResult = await deepseekService.analyzeInterview(
      target_position,
      interview_question,
      user_answer
    );
    
    res.json({ analysis_result: analysisResult });
  } catch (error) {
    console.error('面试分析错误:', error);
    res.status(500).json({ error: '分析失败，请重试' });
  }
});

module.exports = router;