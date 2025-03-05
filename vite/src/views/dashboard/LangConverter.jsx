import React, { useEffect, useState } from 'react';

const LangConverter = ({ inputText, lang }) => {
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/translate?text=${encodeURIComponent(inputText)}&dest=${lang}`);
      const data = await response.json();
      console.log(data);
      setTranslatedText(data.response);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };
  useEffect(() => {
    handleTranslate(inputText);
  }, [lang]);

  return translatedText;
};

export default LangConverter;
