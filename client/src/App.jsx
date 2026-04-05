import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('interview');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // 面试分析表单
  const [interviewForm, setInterviewForm] = useState({
    target_position: '',
    interview_question: '',
    user_answer: ''
  });
  
  // 简历修改表单
  const [resumeForm, setResumeForm] = useState({
    job_description: '',
    application_info: ''
  });

  const handleInterviewChange = (e) => {
    const { name, value } = e.target;
    setInterviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResumeChange = (e) => {
    const { name, value } = e.target;
    setResumeForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/analyze-interview', interviewForm);
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing interview:', error);
      alert('分析失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/analyze-resume', resumeForm);
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      alert('分析失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult(null);
    if (activeTab === 'interview') {
      setInterviewForm({
        target_position: '',
        interview_question: '',
        user_answer: ''
      });
    } else {
      setResumeForm({
        job_description: '',
        application_info: ''
      });
    }
  };

  return (
    <div className="app">
      <div className="content">
        <h1>面试分析工具</h1>
        
        <div className="tab-container">
          <button 
            className={`tab ${activeTab === 'interview' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('interview');
              setResult(null);
            }}
          >
            面试分析
          </button>
          <button 
            className={`tab ${activeTab === 'resume' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('resume');
              setResult(null);
            }}
          >
            简历修改
          </button>
        </div>

        <div className="form-container">
          {activeTab === 'interview' ? (
            <form onSubmit={handleInterviewSubmit}>
              <div className="form-group">
                <label>目标岗位</label>
                <input
                  type="text"
                  name="target_position"
                  value={interviewForm.target_position}
                  onChange={handleInterviewChange}
                  placeholder="例如：前端开发工程师"
                  required
                />
              </div>
              <div className="form-group">
                <label>面试题</label>
                <textarea
                  name="interview_question"
                  value={interviewForm.interview_question}
                  onChange={handleInterviewChange}
                  rows={3}
                  placeholder="请输入面试题"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>你的回答</label>
                <textarea
                  name="user_answer"
                  value={interviewForm.user_answer}
                  onChange={handleInterviewChange}
                  rows={6}
                  placeholder="请输入你的回答"
                  required
                ></textarea>
              </div>
              <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                {loading ? '' : '分析回答'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResumeSubmit}>
              <div className="form-group">
                <label>职位描述（JD）</label>
                <textarea
                  name="job_description"
                  value={resumeForm.job_description}
                  onChange={handleResumeChange}
                  rows={6}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>投递信息</label>
                <input
                  type="text"
                  name="application_info"
                  value={resumeForm.application_info}
                  onChange={handleResumeChange}
                  placeholder="例如：我正在投递【电商平台产品规划】产品经理岗位"
                  required
                />
              </div>
              <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
                {loading ? '' : '分析JD'}
              </button>
            </form>
          )}
        </div>

        {result && (
          <div className="result-container">
            <h2>分析结果</h2>
            {activeTab === 'interview' ? (
              <div className="interview-result">
                <div className="result-section">
                  <h3>核心问题</h3>
                  <ul>
                    {result.interview_analysis_result.core_issues.map((issue, index) => (
                      <li key={index}>{issue}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-section">
                  <h3>改进建议</h3>
                  <ul>
                    {result.interview_analysis_result.improvement_suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-section">
                  <h3>预测追问</h3>
                  <ul>
                    {result.interview_analysis_result.predicted_questions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-section">
                  <h3>参考回答</h3>
                  <div className="reference-answer">
                    {result.interview_analysis_result.reference_answer}
                  </div>
                </div>
              </div>
            ) : (
              <div className="resume-result">
                <div className="result-section">
                  <h3>胜任岗位所需关键词</h3>
                  <ul>
                    {result.resume_analysis_result.keywords.map((keyword, index) => (
                      <li key={index}>{keyword}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-section">
                  <h3>岗位痛点分析</h3>
                  <ul>
                    {result.resume_analysis_result.pain_points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <button className="reset-btn" onClick={resetForm}>
              重新分析
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;