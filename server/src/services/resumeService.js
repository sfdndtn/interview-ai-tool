// 简历分析服务

class ResumeService {
  // 分析简历
  analyzeResume(job_description, resume_content) {
    // 模拟分析过程
    const optimization_suggestions = this.generateOptimizationSuggestions(job_description, resume_content);
    const optimized_resume = this.generateOptimizedResume(job_description, resume_content);

    return {
      resume_analysis_result: {
        optimization_suggestions,
        optimized_resume
      }
    };
  }

  // 生成优化建议
  generateOptimizationSuggestions(job_description, resume_content) {
    const suggestions = [];
    
    // 提取JD中的关键词
    const jdKeywords = this.extractKeywords(job_description);
    
    // 提取简历中的关键词
    const resumeKeywords = this.extractKeywords(resume_content);
    
    // 检查匹配度
    const missingKeywords = jdKeywords.filter(keyword => !resumeKeywords.includes(keyword));
    
    if (missingKeywords.length > 0) {
      suggestions.push(`建议添加以下关键词：${missingKeywords.slice(0, 3).join('、')}`);
    }
    
    // 检查简历长度
    if (resume_content.length < 200) {
      suggestions.push('简历内容过于简短，建议增加更多详细信息');
    }
    
    // 检查是否有具体成就
    if (!resume_content.includes('成就') && !resume_content.includes('成果') && !resume_content.includes('业绩') && !/[0-9]+/.test(resume_content)) {
      suggestions.push('建议添加具体成就和量化成果，增强简历说服力');
    }
    
    // 检查是否针对岗位定制
    if (!resume_content.toLowerCase().includes(job_description.toLowerCase().split(' ')[0])) {
      suggestions.push('建议针对目标岗位定制简历内容');
    }
    
    suggestions.push('建议使用STAR法则（情境-任务-行动-结果）描述工作经历');
    suggestions.push('建议突出与目标岗位相关的技能和经验');
    
    return suggestions;
  }

  // 生成优化后的简历
  generateOptimizedResume(job_description, resume_content) {
    // 提取JD中的关键要求
    const jdRequirements = this.extractRequirements(job_description);
    
    // 基础简历内容
    let optimized = resume_content;
    
    // 添加缺失的关键词
    const jdKeywords = this.extractKeywords(job_description);
    const resumeKeywords = this.extractKeywords(resume_content);
    const missingKeywords = jdKeywords.filter(keyword => !resumeKeywords.includes(keyword));
    
    if (missingKeywords.length > 0) {
      optimized += `\n\n技能补充：${missingKeywords.slice(0, 3).join('、')}`;
    }
    
    // 增加量化成果
    if (!/[0-9]+/.test(resume_content)) {
      optimized += '\n\n主要成就：成功完成多个项目，提升了团队效率和业务指标。';
    }
    
    // 针对岗位定制
    const position = job_description.split(' ')[0] || '目标岗位';
    optimized = optimized.replace(/我有/g, `作为${position}，我有`);
    
    return optimized;
  }

  // 提取关键词
  extractKeywords(text) {
    // 简单的关键词提取逻辑
    const commonKeywords = [
      '经验', '技能', '能力', '项目', '管理', '分析', '开发', '设计', '团队', '沟通',
      '创新', '解决', '优化', '提升', '协作', '领导', '执行', '规划', '策略', '用户'
    ];
    
    return commonKeywords.filter(keyword => text.includes(keyword));
  }

  // 提取岗位要求
  extractRequirements(text) {
    // 简单的要求提取逻辑
    const requirements = [];
    
    if (text.includes('经验')) {
      requirements.push('相关工作经验');
    }
    if (text.includes('技能')) {
      requirements.push('专业技能');
    }
    if (text.includes('学历')) {
      requirements.push('学历要求');
    }
    if (text.includes('证书')) {
      requirements.push('相关证书');
    }
    
    return requirements;
  }
}

module.exports = new ResumeService();