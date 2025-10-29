'use client';

import { useState, useEffect } from 'react';

type Rule = {
  id: number;
  name: string;
  display_name: string;
  quality: string;
  description: string;
};

type Question = {
  id: number;
  rule_name: string;
  text: string;
  order_index: number;
  is_active: boolean;
};

type FeedbackMessage = {
  id: number;
  rule_name: string;
  score_range: string;
  min_score: number;
  max_score: number;
  message: string;
};

type LandingContent = {
  id: number;
  section: string;
  title: string;
  content: string;
  order_index: number;
  is_active: boolean;
};

export default function ContentEditor() {
  const [activeTab, setActiveTab] = useState<'rules' | 'questions' | 'feedback' | 'landing'>('rules');
  const [rules, setRules] = useState<Rule[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [feedback, setFeedback] = useState<FeedbackMessage[]>([]);
  const [landing, setLanding] = useState<LandingContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ type: string; id: number | null }>({ type: '', id: null });
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [rulesRes, questionsRes, feedbackRes, landingRes] = await Promise.all([
        fetch('/api/content/rules'),
        fetch('/api/content/questions'),
        fetch('/api/content/feedback'),
        fetch('/api/content/landing')
      ]);

      setRules(await rulesRes.json());
      setQuestions(await questionsRes.json());
      setFeedback(await feedbackRes.json());
      setLanding(await landingRes.json());
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (type: string, item: any) => {
    setEditing({ type, id: item.id });
    setFormData(item);
  };

  const handleSave = async () => {
    try {
      const endpoint = `/api/content/${editing.type}`;
      const method = editing.id ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setEditing({ type: '', id: null });
        setFormData({});
        loadData();
      } else {
        alert('Error saving content');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving content');
    }
  };

  const handleCancel = () => {
    setEditing({ type: '', id: null });
    setFormData({});
  };

  if (loading) {
    return <div className="text-center py-8">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'rules', label: 'Rules' },
            { key: 'questions', label: 'Questions' },
            { key: 'feedback', label: 'Feedback Messages' },
            { key: 'landing', label: 'Landing Page' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'rules' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Rules Management</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {rules.map(rule => (
                <div key={rule.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-lg">{rule.display_name}</h4>
                      <p className="text-sm text-gray-600">Quality: {rule.quality}</p>
                      <p className="text-sm text-gray-500 mt-1">{rule.description}</p>
                    </div>
                    <button
                      onClick={() => handleEdit('rules', rule)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'questions' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Questions Management</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {questions.map(question => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-600">
                          {question.rule_name} - Q{question.order_index}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          question.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {question.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-gray-700">{question.text}</p>
                    </div>
                    <button
                      onClick={() => handleEdit('questions', question)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Feedback Messages Management</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {feedback.map(msg => (
                <div key={msg.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-600">
                          {msg.rule_name} - {msg.score_range}
                        </span>
                        <span className="text-sm text-gray-500">
                          ({msg.min_score}-{msg.max_score})
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm whitespace-pre-wrap">
                        {msg.message.substring(0, 200)}...
                      </p>
                    </div>
                    <button
                      onClick={() => handleEdit('feedback', msg)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'landing' && (
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Landing Page Content Management</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {landing.map(section => (
                <div key={section.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-blue-600">
                          {section.section}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded ${
                          section.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {section.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {section.title && <h4 className="font-medium mb-1">{section.title}</h4>}
                      <p className="text-gray-700 text-sm">
                        {section.content.substring(0, 200)}...
                      </p>
                    </div>
                    <button
                      onClick={() => handleEdit('landing', section)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editing.type && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">
              Edit {editing.type.charAt(0).toUpperCase() + editing.type.slice(1)}
            </h3>
            
            <div className="space-y-4">
              {editing.type === 'rules' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <input
                      type="text"
                      value={formData.display_name || ''}
                      onChange={(e) => setFormData({...formData, display_name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
                    <input
                      type="text"
                      value={formData.quality || ''}
                      onChange={(e) => setFormData({...formData, quality: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}

              {editing.type === 'questions' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rule</label>
                    <select
                      value={formData.rule_name || ''}
                      onChange={(e) => setFormData({...formData, rule_name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {rules.map(rule => (
                        <option key={rule.name} value={rule.name}>{rule.display_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                    <textarea
                      value={formData.text || ''}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
                    <input
                      type="number"
                      value={formData.order_index || ''}
                      onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_active || false}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                </>
              )}

              {editing.type === 'feedback' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rule</label>
                    <select
                      value={formData.rule_name || ''}
                      onChange={(e) => setFormData({...formData, rule_name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {rules.map(rule => (
                        <option key={rule.name} value={rule.name}>{rule.display_name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Score Range</label>
                    <select
                      value={formData.score_range || ''}
                      onChange={(e) => setFormData({...formData, score_range: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="high">High (67-100)</option>
                      <option value="medium">Medium (34-66)</option>
                      <option value="low">Low (0-33)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      value={formData.message || ''}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={8}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Use {score} placeholder for the actual score"
                    />
                  </div>
                </>
              )}

              {editing.type === 'landing' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                    <input
                      type="text"
                      value={formData.section || ''}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                      value={formData.content || ''}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
                    <input
                      type="number"
                      value={formData.order_index || ''}
                      onChange={(e) => setFormData({...formData, order_index: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_active || false}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">Active</label>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
