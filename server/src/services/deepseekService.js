// DeepSeek API服务
const { OpenAI } = require('openai');
const config = require('../../config');

class DeepSeekService {
  constructor() {
    this.client = new OpenAI({
      apiKey: config.deepseek.apiKey,
      baseURL: config.deepseek.baseUrl
    });
    this.model = config.deepseek.model;
  }

  // 调用DeepSeek API
  async callDeepSeek(messages, options = {}) {
    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 1024,
        stream: options.stream || false,
        response_format: options.responseFormat || undefined
      });
      return response.choices[0].message.content;
    } catch (error) {
      console.error('DeepSeek API调用错误:', error);
      throw new Error('API调用失败，请检查配置和网络连接');
    }
  }

  // 分析面试回答
  async analyzeInterview(targetPosition, interviewQuestion, userAnswer) {
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的面试教练，擅长分析面试回答并提供改进建议。请按照以下要求分析用户的面试回答：\n1. 分析回答是否偏离主题\n2. 分析回答的逻辑结构是否清晰\n3. 分析回答是否有具体案例支持\n4. 分析回答的表达质量\n5. 提供具体的改进建议\n6. 预测面试官可能的后续追问\n7. 生成一个高质量的参考回答\n\n请以JSON格式输出结果，包含以下字段：\n- core_issues: 核心问题数组\n- improvement_suggestions: 改进建议数组\n- predicted_questions: 预测追问数组\n- reference_answer: 参考回答字符串'
      },
      {
        role: 'user',
        content: `目标岗位: ${targetPosition}\n面试题: ${interviewQuestion}\n用户回答: ${userAnswer}`
      }
    ];

    console.log('面试分析请求:', messages);

    const options = {
      responseFormat: { type: 'json_object' }
    };

    try {
      const result = await this.callDeepSeek(messages, options);
      console.log('DeepSeek API返回结果:', result);
      return JSON.parse(result);
    } catch (error) {
      console.error('面试分析失败:', error);
      // 返回模拟数据作为 fallback
      return {
        core_issues: ['分析API调用失败，使用模拟数据'],
        improvement_suggestions: ['请检查DeepSeek API配置'],
        predicted_questions: ['你能详细说明一下你的回答吗？'],
        reference_answer: '参考回答生成失败，请检查DeepSeek API配置后重试。'
      };
    }
  }

  // 分析简历
  async analyzeResume(jobDescription, applicationInfo) {
    const messages = [
      {
        role: 'system',
        content: '你是一个专业的招聘专家，擅长分析职位描述并提取关键信息。请按照以下要求分析用户提供的职位描述：\n1. 提炼5-10个胜任这个岗位所需的硬技能、相关经验、以及软能力的关键词\n2. 分析这个岗位需要解决的痛点是什么(以关键词形式总结)\n\n请以JSON格式输出结果，包含以下字段：\n- keywords: 关键词数组\n- pain_points: 痛点分析数组'
      },
      {
        role: 'user',
        content: `投递信息: ${applicationInfo}\n职位描述: ${jobDescription}`
      }
    ];

    console.log('简历分析请求:', messages);

    const options = {
      responseFormat: { type: 'json_object' }
    };

    try {
      const result = await this.callDeepSeek(messages, options);
      console.log('DeepSeek API返回结果:', result);
      return JSON.parse(result);
    } catch (error) {
      console.error('简历分析失败:', error);
      // 返回模拟数据作为 fallback
      return {
        keywords: ['分析API调用失败，使用模拟数据', '请检查DeepSeek API配置'],
        pain_points: ['无法分析岗位痛点，请检查配置后重试']
      };
    }
  }
}

module.exports = new DeepSeekService();