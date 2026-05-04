'use client';

import TextEditor from '@/components/analysis/settings/terms/TextEditor';
import Header from '@/components/home/Header';
// app/editor/page.jsx  (or pages/editor.jsx for Pages Router)

import { useState } from 'react';

export default function TermsPage() {
  const [output, setOutput] = useState(null);

  return (
    <div className="min-h-screen p-6">
      <Header page='welcome' title={"الإعـدادات"} isMain={false} first="الرئيــسية" firstURL="/" second='الإعـدادات' secondURL="/home/settings" third="الشروط والاحكام" thirdURL="/home/settings/terms" />

      <div className=" mx-auto space-y-6">
        {/* Editor */}
        <div className="h-[600px]">
          <TextEditor
            placeholder="أدخل النص هنا"
            onChange={setOutput}
          />
        </div>
      </div>
    </div>
  );
}
