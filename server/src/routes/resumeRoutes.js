const express = require('express');
const router = express.Router();
const deepseekService = require('../services/deepseekService');

router.post('/analyze-resume', async (req, res) => {
  try {
    const { job_description, application_info } = req.body;
    
    if (!job_description || !application_info) {
      return res.status(400).json({ error: '缺少必要参数' });
    }
    
    const analysisResult = await deepseekService.analyzeResume(
      job_description,
      application_info
    );
    
    res.json({ resume_analysis_result: analysisResult });
  } catch (error) {
    console.error('简历分析错误:', error);
    res.status(500).json({ error: error.message || '分析失败，请重试' });
  }
});

module.exports = router;