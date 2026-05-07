'use client';
import { useState, useEffect } from 'react';

export function useLang() {
  const [lang, setLang] = useState('ko');
  useEffect(() => {
    const saved = localStorage.getItem('hiop-lang');
    if (saved === 'en' || saved === 'ko') setLang(saved);
  }, []);
  const toggle = (l) => { setLang(l); localStorage.setItem('hiop-lang', l); };
  return [lang, toggle];
}
