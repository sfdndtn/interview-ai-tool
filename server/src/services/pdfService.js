// PDF解析服务
const pdfParse = require('pdf-parse');

class PdfService {
  // 解析PDF文件
  async parsePdf(file) {
    try {
      // 尝试不同的文件数据获取方式
      let pdfData;
      if (file.data) {
        // 直接使用Buffer数据
        pdfData = file.data;
      } else if (file.tempFilePath) {
        // 使用临时文件路径
        const fs = require('fs');
        pdfData = fs.readFileSync(file.tempFilePath);
      } else {
        throw new Error('无法获取文件数据');
      }
      
      const data = await pdfParse(pdfData);
      return data.text;
    } catch (error) {
      console.error('PDF解析错误:', error);
      throw new Error('PDF解析失败，请检查文件格式是否正确');
    }
  }

  // 验证文件是否为PDF
  isValidPdf(file) {
    return file.mimetype === 'application/pdf';
  }

  // 验证文件大小
  isValidFileSize(file, maxSize = 5 * 1024 * 1024) {
    return file.size <= maxSize;
  }
}

module.exports = new PdfService();