// 面试分析服务

class InterviewService {
  // 分析面试回答
  analyzeInterview(target_position, interview_question, user_answer) {
    // 模拟分析过程
    const core_issues = this.identifyCoreIssues(user_answer);
    const improvement_suggestions = this.generateImprovementSuggestions(user_answer);
    const predicted_questions = this.generatePredictedQuestions(interview_question, user_answer);

    return {
      analysis_result: {
        core_issues,
        improvement_suggestions,
        predicted_questions
      }
    };
  }

  // 识别核心问题
  identifyCoreIssues(answer) {
    const issues = [];
    
    // 检查回答长度
    if (answer.length < 50) {
      issues.push('回答过于简短，缺乏详细内容');
    }
    
    // 检查是否有具体案例
    if (!answer.includes('例如') && !answer.includes('比如') && !answer.includes('案例') && !answer.includes('项目')) {
      issues.push('回答缺乏具体案例支持');
    }
    
    // 检查逻辑结构
    if (!answer.includes('首先') && !answer.includes('其次') && !answer.includes('最后') && !answer.includes('然后')) {
      issues.push('回答逻辑结构不够清晰');
    }
    
    // 检查是否有数据支持
    if (!/\d/.test(answer)) {
      issues.push('回答缺乏数据支持，建议添加具体数据');
    }
    
    return issues.length > 0 ? issues : ['回答整体质量良好，无明显问题'];
  }

  // 生成改进建议
  generateImprovementSuggestions(answer) {
    const suggestions = [];
    
    if (answer.length < 50) {
      suggestions.push('建议增加回答长度，提供更多详细信息');
    }
    
    if (!answer.includes('例如') && !answer.includes('比如') && !answer.includes('案例') && !answer.includes('项目')) {
      suggestions.push('建议添加具体案例，增强回答的说服力');
    }
    
    if (!answer.includes('首先') && !answer.includes('其次') && !answer.includes('最后') && !answer.includes('然后')) {
      suggestions.push('建议使用结构化的表达方式，如分点说明');
    }
    
    if (!/\d/.test(answer)) {
      suggestions.push('建议添加具体数据，量化你的成就');
    }
    
    suggestions.push('建议使用STAR法则（情境-任务-行动-结果）结构化回答');
    suggestions.push('建议在回答中突出你的核心能力和价值');
    
    return suggestions;
  }

  // 生成预测追问
  generatePredictedQuestions(question, answer) {
    const questions = [];
    
    // 根据问题类型生成不同的追问
    if (question.includes('经验') || question.includes('经历') || question.includes('项目')) {
      questions.push('你在这个项目中遇到了哪些挑战？如何解决的？');
      questions.push('你在这个过程中担任什么角色？具体负责哪些工作？');
      questions.push('这个项目的结果如何？有什么量化的成果？');
    } else if (question.includes('优势') || question.includes('特长') || question.includes('能力')) {
      questions.push('请举一个具体例子来说明你的这个优势');
      questions.push('你认为这个优势如何帮助你胜任我们的岗位？');
      questions.push('你如何在工作中发挥这个优势？');
    } else if (question.includes('缺点') || question.includes('不足')) {
      questions.push('你是如何意识到这个缺点的？');
      questions.push('你采取了哪些措施来改进这个缺点？');
      questions.push('这个缺点对你的工作有什么影响？');
    } else {
      questions.push('你能再详细解释一下这个部分吗？');
      questions.push('这个经历对你有什么启发？');
      questions.push('如果再次遇到类似情况，你会怎么做？');
    }
    
    return questions;
  }
}

module.exports = new InterviewService();