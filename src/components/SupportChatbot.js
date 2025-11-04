import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChatBubbleBottomCenterText, HiXMark, HiPaperAirplane } from 'react-icons/hi2';
import chatbotFaqs, { CONTACT_EMAIL } from '../data/chatbotFaqs';

const normalize = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const scoreMatch = (inputTokens, keywords = [], question = '') => {
  const normalizedQuestion = normalize(question);
  let score = 0;
  keywords.forEach((keyword) => {
    const normalizedKeyword = normalize(keyword);
    if (!normalizedKeyword) return;
    if (normalizedKeyword.split(' ').every((token) => inputTokens.has(token))) {
      score += normalizedKeyword.length;
    } else if (normalizedKeyword.length > 3 && normalizedKeyword.split(' ').some((token) => inputTokens.has(token))) {
      score += normalizedKeyword.length / 2;
    }
  });
  if (normalizedQuestion && normalizedQuestion.split(' ').some((token) => inputTokens.has(token))) {
    score += normalizedQuestion.length * 0.2;
  }
  return score;
};

const useChatResponder = () => {
  const faqIndex = useMemo(
    () =>
      chatbotFaqs.map((faq) => ({
        ...faq,
        normalizedKeywords: (faq.keywords || []).map(normalize),
        normalizedQuestion: normalize(faq.question)
      })),
    []
  );

  return (rawInput) => {
    const normalizedInput = normalize(rawInput);
    if (!normalizedInput) return null;
    const tokens = new Set(normalizedInput.split(' '));

    let bestMatch = null;
    let bestScore = 0;

    faqIndex.forEach((entry) => {
      const score = scoreMatch(tokens, entry.normalizedKeywords, entry.normalizedQuestion);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    });

    if (bestScore < 4) return null;
    return bestMatch;
  };
};

const initialGreeting = {
  from: 'bot',
  text: "Hi there! I'm the ProjectMentorHub assistant. Ask me anything about projects, payments, or support and I'll point you in the right direction."
};

const SupportChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([initialGreeting]);
  const getResponse = useChatResponder();

  const toggleChat = () => {
    setIsOpen((value) => {
      if (!value) {
        // Reset messages when opening fresh to keep conversation crisp long-term.
        setMessages((current) => (current.length ? current : [initialGreeting]));
      }
      return !value;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setInput('');

    const match = getResponse(trimmed);

    setMessages((prev) => {
      const next = [...prev, { from: 'user', text: trimmed }];
      if (match) {
        next.push({
          from: 'bot',
          text: match.answer
        });
      } else {
        next.push({
          from: 'bot',
          text: `I couldn't find a ready answer for that. Please drop us a message at ${CONTACT_EMAIL} and we'll help you within one business day.`
        });
      }
      return next;
    });
  };

  const handleQuickQuestion = (faq) => {
    setMessages((prev) => [
      ...prev,
      { from: 'user', text: faq.question },
      { from: 'bot', text: faq.answer }
    ]);
    setIsOpen(true);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-80 sm:w-96 rounded-3xl bg-white shadow-2xl border border-black/10 overflow-hidden flex flex-col"
            >
              <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">ProjectMentorHub Assistant</p>
                  <p className="text-xs text-white/70">Instant answers to common questions</p>
                </div>
                <button
                  type="button"
                  onClick={toggleChat}
                  className="rounded-full p-1 hover:bg-white/10 transition"
                  aria-label="Close chat"
                >
                  <HiXMark className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.from}-${index}-${message.text.slice(0, 6)}`}
                    className={[
                      'px-3 py-2 rounded-2xl text-sm leading-relaxed',
                      message.from === 'bot'
                        ? 'bg-gray-100 text-gray-800 max-w-[80%]'
                        : 'bg-gray-900 text-white ml-auto max-w-[80%]'
                    ].join(' ')}
                  >
                    {message.text}
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 px-4 py-3">
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:border-gray-400"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gray-900 text-white hover:bg-black transition disabled:opacity-50"
                    disabled={!input.trim()}
                    aria-label="Send message"
                  >
                    <HiPaperAirplane className="h-4 w-4" />
                  </button>
                </form>
                <div className="mt-3">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-2">
                    Quick questions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chatbotFaqs.slice(0, 3).map((faq) => (
                      <button
                        key={faq.id}
                        type="button"
                        onClick={() => handleQuickQuestion(faq)}
                        className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:border-gray-400 hover:text-gray-900 transition"
                      >
                        {faq.question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={toggleChat}
          className="h-14 w-14 rounded-full bg-gray-900 text-white shadow-xl grid place-items-center hover:bg-black transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chat support"
        >
          <HiOutlineChatBubbleBottomCenterText className="h-7 w-7" />
        </motion.button>
      </div>
    </>
  );
};

export default SupportChatbot;
