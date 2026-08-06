'use client';
import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    // Inject widget stylesheet
    if (!document.getElementById('wa-widget-styles')) {
      const link = document.createElement('link');
      link.id = 'wa-widget-styles';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/gh/kibretmulugeta/personal-ai-assistant@main/apps/widget/dist/widget.css';
      document.head.appendChild(link);
    }

    // Inject widget script
    const scriptId = 'wa-widget-script';
    let script = document.getElementById(scriptId);

    const initWidget = () => {
      if (window.WebsiteAssistant) {
        window.WebsiteAssistant.init({
          apiKey: 'demo-api-key-12345',
          apiEndpoint: 'https://personal-ai-assistant-r1zt.onrender.com/api/v1',
          theme: 'dark',
          position: 'bottom-right',
          primaryColor: '#6366f1',
          welcomeMessage: "Hello! I am Alemu's AI Digital Twin. Ask me anything about Alemu's research, skills, projects, or experience!"
        });
      }
    };

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.jsdelivr.net/gh/kibretmulugeta/personal-ai-assistant@main/apps/widget/dist/widget.js';
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      initWidget();
    }
  }, []);

  return null;
}
