import type { NextPage } from "next";
import React, { useState } from "react";

const ChatbotPage: NextPage = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    // setAnswer(`Echo: ${query.trim()}`);
    // setLoading(false);

    setAnswer("");
    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const data = await res.json();
      setAnswer(data.answer ?? "No answer returned.");
    } catch (err) {
      console.error(err);
      setAnswer("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="shell">
        <header>
          <h1>Chatbot</h1>
          <p>Ask a question; a mock reply appears below.</p>
        </header>

        <form className="search" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search or ask anything..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "..." : "Send"}
          </button>
        </form>

        <section className="response">
          {loading ? (
            <div className="loader" aria-label="Loading" />
          ) : answer ? (
            <p>{answer}</p>
          ) : (
            <p className="placeholder">Response will appear here.</p>
          )}
        </section>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #0b0f17;
          color: #e5e7eb;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 48px 16px;
          font-family:
            "Inter",
            system-ui,
            -apple-system,
            sans-serif;
        }

        .shell {
          width: min(900px, 100%);
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: #0d1117;
          border: 1px solid #1f2937;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
        }

        header h1 {
          margin: 0 0 4px;
          font-size: 24px;
        }

        header p {
          margin: 0;
          color: #9ca3af;
        }

        .search {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .search input {
          flex: 1;
          padding: 12px 14px;
          border-radius: 12px;
          border: 1px solid #374151;
          background: #111827;
          color: #e5e7eb;
          outline: none;
          transition:
            border 0.15s ease,
            box-shadow 0.15s ease;
        }

        .search input:focus {
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
        }

        .search button {
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #a855f7;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: #f9fafb;
          font-weight: 600;
          cursor: pointer;
          transition:
            filter 0.15s ease,
            transform 0.1s ease;
        }

        .search button:disabled {
          opacity: 0.7;
          cursor: wait;
        }

        .search button:not(:disabled):hover {
          filter: brightness(1.05);
        }

        .search button:not(:disabled):active {
          transform: translateY(1px);
        }

        .response {
          border: 1px solid #1f2937;
          border-radius: 14px;
          padding: 16px 18px;
          background: #0f1624;
          min-height: 140px;
          display: flex;
          align-items: center;
          color: #e5e7eb;
        }

        .placeholder {
          color: #6b7280;
        }

        .loader {
          width: 56px;
          height: 12px;
          background: linear-gradient(
            90deg,
            rgba(168, 85, 247, 0.2),
            #a855f7,
            rgba(99, 102, 241, 0.2)
          );
          background-size: 200% 100%;
          border-radius: 999px;
          animation: pulse 1.2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            background-position: 200% 0;
          }
          50% {
            background-position: 50% 0;
          }
          100% {
            background-position: 0 0;
          }
        }

        @media (max-width: 640px) {
          .shell {
            padding: 20px;
          }

          .search {
            flex-direction: column;
          }

          .search button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatbotPage;
