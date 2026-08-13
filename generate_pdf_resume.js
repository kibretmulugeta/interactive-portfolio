const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const mongoose = require('mongoose');

// Read MONGODB_URI from .env.local
let mongodbUri = process.env.MONGODB_URI;
if (!mongodbUri && fs.existsSync('.env.local')) {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  const match = envContent.match(/MONGODB_URI=(.+)/);
  if (match) {
    mongodbUri = match[1].trim();
  }
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>KIBRET MULUGETA ALEMU - Resume</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #111827;
      margin: 0;
      padding: 0;
      font-size: 10.5pt;
      line-height: 1.45;
      background: #ffffff;
    }
    .header {
      text-align: center;
      margin-bottom: 16px;
    }
    .name {
      font-size: 22pt;
      font-weight: 800;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: #0f172a;
      margin-bottom: 4px;
    }
    .contact-info {
      font-size: 9.5pt;
      color: #334155;
    }
    .contact-info a {
      color: #0284c7;
      text-decoration: none;
    }
    .section-title {
      font-size: 11.5pt;
      font-weight: 700;
      text-transform: uppercase;
      color: #0f172a;
      border-bottom: 1.5px solid #1e293b;
      padding-bottom: 2px;
      margin-top: 14px;
      margin-bottom: 8px;
      letter-spacing: 0.3px;
    }
    .summary-text {
      text-align: justify;
      color: #334155;
      margin-bottom: 8px;
    }
    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 700;
      color: #0f172a;
      margin-top: 6px;
      margin-bottom: 2px;
    }
    .entry-title {
      font-size: 10.5pt;
    }
    .entry-date {
      font-size: 9.5pt;
      font-weight: 600;
      color: #0f172a;
    }
    .entry-subtitle {
      font-style: italic;
      color: #475569;
      font-size: 9.5pt;
      margin-bottom: 4px;
    }
    ul {
      margin: 3px 0 8px 18px;
      padding: 0;
    }
    li {
      margin-bottom: 3px;
      color: #334155;
    }
    .skills-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 4px;
    }
    .skills-table td {
      padding: 3px 0;
      vertical-align: top;
      font-size: 9.5pt;
    }
    .skills-label {
      font-weight: 700;
      color: #0f172a;
      width: 26%;
    }
    .skills-val {
      color: #334155;
      width: 74%;
    }
    .interests-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4px 16px;
      margin-top: 4px;
    }
    .interest-item {
      color: #334155;
      font-size: 9.5pt;
    }
    .page-break {
      page-break-before: always;
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <div class="header">
    <div class="name">KIBRET MULUGETA ALEMU</div>
    <div class="contact-info">
      Addis Ababa, Ethiopia &nbsp;|&nbsp; +251 947369090 &nbsp;|&nbsp; <a href="mailto:kibretmail@gmail.com">kibretmail@gmail.com</a><br>
      <a href="https://linkedin.com/in/kibret-mulugeta">linkedin.com/in/kibret-mulugeta</a> &nbsp;|&nbsp;
      <a href="https://github.com/kibretmulugeta">github.com/kibretmulugeta</a> &nbsp;|&nbsp;
      <a href="https://kibretmulugeta.pro.et">kibretmulugeta.pro.et</a>
    </div>
  </div>

  <!-- PROFESSIONAL SUMMARY -->
  <div class="section-title">PROFESSIONAL SUMMARY</div>
  <div class="summary-text">
    AI Engineer and Medical Imaging Researcher specializing in deep learning, medical image segmentation, and bio-inspired optimization algorithms. Experienced in designing neural plasticity-inspired optimization frameworks for hyperparameter tuning and implementing U-Net/Attention U-Net architectures for brain MRI analysis. Skilled in end-to-end medical imaging pipelines using PyTorch and MONAI. Seeking graduate research opportunities in Computer Science focusing on computational intelligence, medical image analysis, and AI-driven healthcare systems.
  </div>

  <!-- PROFESSIONAL EXPERIENCE -->
  <div class="section-title">PROFESSIONAL EXPERIENCE</div>
  <div class="entry-header">
    <span class="entry-title">Freelance Machine Learning Engineer</span>
    <span class="entry-date">2023 - Present</span>
  </div>
  <div class="entry-subtitle">Self-employed</div>
  <ul>
    <li>Developed machine learning models for classification and segmentation tasks in research environments.</li>
    <li>Designed hyperparameter optimization pipelines for GPU-based training (Google Colab, AWS EC2).</li>
    <li>Created technical documentation and research manuscripts using LaTeX.</li>
    <li>Supported academic research projects in deep learning and medical imaging.</li>
  </ul>

  <!-- EDUCATION -->
  <div class="section-title">EDUCATION</div>
  <div class="entry-header">
    <span class="entry-title">Master of Science in Computer Engineering (AI & Data Engineering)</span>
    <span class="entry-date">2025</span>
  </div>
  <div class="entry-subtitle">Bahir Dar University, Ethiopia | GPA: 3.45/4.0</div>

  <div class="entry-header" style="margin-top: 6px;">
    <span class="entry-title">Bachelor of Science in Electrical and Computer Engineering</span>
    <span class="entry-date">2021</span>
  </div>
  <div class="entry-subtitle">Debre Berhan University, Ethiopia</div>

  <!-- TECHNICAL SKILLS -->
  <div class="section-title">TECHNICAL SKILLS</div>
  <table class="skills-table">
    <tr>
      <td class="skills-label">Deep Learning & AI</td>
      <td class="skills-val">PyTorch, TensorFlow, Keras, MONAI, Scikit-learn</td>
    </tr>
    <tr>
      <td class="skills-label">Medical Imaging</td>
      <td class="skills-val">NIFTI, DICOM, SimpleITK, NiBabel, OpenCV</td>
    </tr>
    <tr>
      <td class="skills-label">Optimization & AI Methods</td>
      <td class="skills-val">Bio-inspired Optimization, Neural Plasticity Learning, Genetic Algorithms, Particle Swarm Optimization (PSO), Hyperparameter Optimization</td>
    </tr>
    <tr>
      <td class="skills-label">Data Engineering</td>
      <td class="skills-val">NumPy, Pandas, SciPy, SQL, Apache Spark</td>
    </tr>
    <tr>
      <td class="skills-label">MLOps & Tools</td>
      <td class="skills-val">Linux, Docker, MLflow, Git, Jupyter Notebook, Google Colab, Overleaf</td>
    </tr>
    <tr>
      <td class="skills-label">Programming Languages</td>
      <td class="skills-val">Python, C++, Java, SQL, LaTeX</td>
    </tr>
    <tr>
      <td class="skills-label">Cloud Platforms</td>
      <td class="skills-val">AWS, Google Cloud Platform (GCP), Microsoft Azure</td>
    </tr>
  </table>

  <!-- PAGE BREAK FOR PAGE 2 -->
  <div class="page-break"></div>

  <!-- RESEARCH EXPERIENCE -->
  <div class="section-title">RESEARCH EXPERIENCE</div>
  <div class="entry-header">
    <span class="entry-title">Graduate Researcher - Master's Thesis</span>
    <span class="entry-date">2023 - 2025</span>
  </div>
  <div class="entry-subtitle">Bahir Dar University</div>
  <div style="font-weight: 600; font-size: 9.5pt; color: #0f172a; margin-bottom: 3px;">
    Thesis: Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-net Based Medical Image Segmentation
  </div>
  <ul>
    <li>Designed a biologically inspired optimization algorithm based on neural plasticity and reward-driven learning.</li>
    <li>Developed deep learning pipelines using PyTorch and TensorFlow for brain MRI segmentation (tumor & stroke lesions).</li>
    <li>Implemented preprocessing workflows including normalization, resampling, and augmentation for NIfTI and DICOM datasets.</li>
    <li>Evaluated performance using Dice Coefficient, IoU, Precision, and Recall metrics.</li>
    <li>Achieved improved convergence stability and segmentation accuracy compared to Random Search and Genetic Algorithms.</li>
  </ul>

  <div class="entry-header" style="margin-top: 8px;">
    <span class="entry-title">Neuro-Inspired U-Net Optimization Project (Open Source)</span>
  </div>
  <div class="entry-subtitle">Lead Developer | GitHub Project</div>
  <ul>
    <li>Developed a reproducible Python framework integrating bio-inspired optimization into deep learning training.</li>
    <li>Implemented Attention U-Net models for fine-grained medical image segmentation.</li>
    <li>Built automated medical imaging pipelines using MONAI and SimpleITK (skull stripping, preprocessing, artifact removal).</li>
    <li>Designed modular codebase for research reproducibility and extension.</li>
  </ul>

  <!-- RESEARCH INTERESTS -->
  <div class="section-title">RESEARCH INTERESTS</div>
  <div class="interests-grid">
    <div class="interest-item">• Medical Image Analysis (MRI / CT segmentation, neuroimaging)</div>
    <div class="interest-item">• Deep Learning Optimization and Architecture Design</div>
    <div class="interest-item">• Bio-inspired and Neuro-inspired Learning Systems</div>
    <div class="interest-item">• Domain Adaptation in Clinical AI</div>
    <div class="interest-item">• Explainable AI (XAI) for Healthcare Systems</div>
    <div class="interest-item">• Pediatric Neuroimaging and Tumor Analysis</div>
  </div>

</body>
</html>`;

async function main() {
  const tempHtmlPath = path.join(__dirname, 'resume_temp.html');
  const targetPdfPath = path.join(__dirname, 'public', 'assets', 'Kibret_Mulugeta_Resume.pdf');

  fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');
  console.log('Wrote temp HTML file to', tempHtmlPath);

  const msedgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  const command = `"${msedgePath}" --headless --disable-gpu --print-to-pdf="${targetPdfPath}" "${tempHtmlPath}"`;

  console.log('Running PDF compilation command...');
  execSync(command);
  console.log('Successfully generated PDF at:', targetPdfPath);

  // Clean up temp HTML file
  if (fs.existsSync(tempHtmlPath)) {
    fs.unlinkSync(tempHtmlPath);
  }

  // Convert generated PDF to Base64
  const pdfBuffer = fs.readFileSync(targetPdfPath);
  const base64Pdf = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;

  console.log('PDF Base64 size:', base64Pdf.length, 'bytes');

  // Update MongoDB Atlas if URI is available
  if (mongodbUri) {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongodbUri);
    console.log('Connected to MongoDB Atlas!');

    const ProfileConfigSchema = new mongoose.Schema({}, { strict: false, timestamps: true });
    const ProfileConfig = mongoose.models.ProfileConfig || mongoose.model('ProfileConfig', ProfileConfigSchema);

    const updateDoc = {
      'hero.name': 'KIBRET MULUGETA ALEMU',
      'hero.title': 'AI Engineer & Medical Imaging Researcher',
      'hero.bio': 'AI Engineer and Medical Imaging Researcher specializing in deep learning, medical image segmentation, and bio-inspired optimization algorithms. Experienced in designing neural plasticity-inspired optimization frameworks for hyperparameter tuning and implementing U-Net/Attention U-Net architectures for brain MRI analysis. Skilled in end-to-end medical imaging pipelines using PyTorch and MONAI. Seeking graduate research opportunities in Computer Science focusing on computational intelligence, medical image analysis, and AI-driven healthcare systems.',
      'hero.email': 'kibretmail@gmail.com',
      'hero.phone': '+251 947369090',
      'hero.location': 'Addis Ababa, Ethiopia',
      'hero.website': 'https://kibretmulugeta.pro.et',
      'hero.linkedinUrl': 'https://linkedin.com/in/kibret-mulugeta',
      'hero.githubUrl': 'https://github.com/kibretmulugeta',
      resumeDataUri: base64Pdf,
      skills: {
        deepLearning: ['PyTorch', 'TensorFlow', 'Keras', 'MONAI', 'Scikit-learn'],
        medicalImaging: ['NIFTI', 'DICOM', 'SimpleITK', 'NiBabel', 'OpenCV'],
        optimization: ['Bio-inspired Optimization', 'Neural Plasticity Learning', 'Genetic Algorithms', 'Particle Swarm Optimization (PSO)', 'Hyperparameter Optimization'],
        dataEngineering: ['NumPy', 'Pandas', 'SciPy', 'SQL', 'Apache Spark'],
        mlops: ['Linux', 'Docker', 'MLflow', 'Git', 'Jupyter Notebook', 'Google Colab', 'Overleaf'],
        programmingLanguages: ['Python', 'C++', 'Java', 'SQL', 'LaTeX'],
        cloudPlatforms: ['AWS', 'Google Cloud Platform (GCP)', 'Microsoft Azure'],
      },
      researchExperience: [
        {
          title: 'Graduate Researcher - Master\'s Thesis',
          role: 'Graduate Researcher',
          institution: 'Bahir Dar University',
          date: '2023 - 2025',
          thesisTitle: 'Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-net Based Medical Image Segmentation',
          bullets: [
            'Designed a biologically inspired optimization algorithm based on neural plasticity and reward-driven learning.',
            'Developed deep learning pipelines using PyTorch and TensorFlow for brain MRI segmentation (tumor & stroke lesions).',
            'Implemented preprocessing workflows including normalization, resampling, and augmentation for NIfTI and DICOM datasets.',
            'Evaluated performance using Dice Coefficient, IoU, Precision, and Recall metrics.',
            'Achieved improved convergence stability and segmentation accuracy compared to Random Search and Genetic Algorithms.',
          ],
        },
        {
          title: 'Neuro-Inspired U-Net Optimization Project (Open Source)',
          role: 'Lead Developer',
          institution: 'GitHub Project',
          date: '2023 - 2025',
          thesisTitle: '',
          bullets: [
            'Developed a reproducible Python framework integrating bio-inspired optimization into deep learning training.',
            'Implemented Attention U-Net models for fine-grained medical image segmentation.',
            'Built automated medical imaging pipelines using MONAI and SimpleITK (skull stripping, preprocessing, artifact removal).',
            'Designed modular codebase for research reproducibility and extension.',
          ],
        },
      ],
      experience: [
        {
          jobTitle: 'Freelance Machine Learning Engineer',
          company: 'Self-employed',
          date: '2023 - Present',
          bullets: [
            'Developed machine learning models for classification and segmentation tasks in research environments.',
            'Designed hyperparameter optimization pipelines for GPU-based training (Google Colab, AWS EC2).',
            'Created technical documentation and research manuscripts using LaTeX.',
            'Supported academic research projects in deep learning and medical imaging.',
          ],
        },
      ],
      education: [
        {
          degree: 'Master of Science in Computer Engineering (AI & Data Engineering)',
          institution: 'Bahir Dar University, Ethiopia',
          date: '2025',
          thesis: 'GPA: 3.45/4.0',
        },
        {
          degree: 'Bachelor of Science in Electrical and Computer Engineering',
          institution: 'Debre Berhan University, Ethiopia',
          date: '2021',
          thesis: '',
        },
      ],
      researchInterests: [
        'Medical Image Analysis (MRI / CT segmentation, neuroimaging)',
        'Bio-inspired and Neuro-inspired Learning Systems',
        'Explainable AI (XAI) for Healthcare Systems',
        'Deep Learning Optimization and Architecture Design',
        'Domain Adaptation in Clinical AI',
        'Pediatric Neuroimaging and Tumor Analysis',
      ],
    };

    const res = await ProfileConfig.findOneAndUpdate({}, { $set: updateDoc }, { upsert: true, new: true });
    console.log('Successfully updated MongoDB Atlas ProfileConfig doc:', res._id);
    await mongoose.disconnect();
  }
}

main().catch(err => {
  console.error('Error generating PDF or updating MongoDB:', err);
  process.exit(1);
});
