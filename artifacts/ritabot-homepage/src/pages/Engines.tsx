import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Copy, CheckCheck, Globe, Cpu, Languages } from "lucide-react";
import { useState } from "react";

const MAX_CHARS = 200;

// ── Placeholder API functions ──────────────────────────────────────
// Replace these stubs with real API calls when ready.
// Each function should accept source text (and language params)
// and return the translated string.
//
// Environment secrets to configure:
//   GOOGLE_API_KEY  – Google Cloud Translation API key
//   ML_API_KEY      – In-house ML engine API key
//   DEEPL_API_KEY   – DeepL API key
// ────────────────────────────────────────────────────────────────────

async function translateWithGoogle(_text: string): Promise<string> {
  // TODO: Implement Google Translate API call
  // const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  return "Google translation will appear here";
}

async function translateWithML(_text: string): Promise<string> {
  // TODO: Implement ML Engine API call
  // const apiKey = import.meta.env.VITE_ML_API_KEY;
  return "ML translation will appear here";
}

async function translateWithDeepL(_text: string): Promise<string> {
  // TODO: Implement DeepL API call
  // const apiKey = import.meta.env.VITE_DEEPL_API_KEY;
  return "DeepL translation will appear here";
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 transition-colors cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

interface EngineConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  borderColor: string;
  translate: (text: string) => Promise<string>;
  description: string;
}

const engines: EngineConfig[] = [
  {
    id: "google",
    name: "Google Translate",
    icon: <Globe className="w-5 h-5" />,
    color: "text-blue-500",
    borderColor: "border-blue-500/20",
    translate: translateWithGoogle,
    description:
      "Industry-standard cloud translation API by Google. Supports over 100 languages with high reliability and broad language coverage, making it one of the most widely used translation services worldwide.",
  },
  {
    id: "ml",
    name: "ML Engine",
    icon: <Cpu className="w-5 h-5" />,
    color: "text-emerald-500",
    borderColor: "border-emerald-500/20",
    translate: translateWithML,
    description:
      "Our in-house, custom-trained, self-hosted translation engine built by the RitaBot team. Designed specifically for Discord communities, offering fast translations with no external dependencies — your data never leaves our infrastructure.",
  },
  {
    id: "deepl",
    name: "DeepL",
    icon: <Languages className="w-5 h-5" />,
    color: "text-sky-400",
    borderColor: "border-sky-400/20",
    translate: translateWithDeepL,
    description:
      "Premium translation API known for producing natural-sounding translations, especially across European languages. Leverages advanced neural network technology for contextually accurate and fluent results.",
  },
];

export default function Engines() {
  const [inputText, setInputText] = useState("");
  const [outputs, setOutputs] = useState<Record<string, string>>({
    google: "",
    ml: "",
    deepl: "",
  });
  const [loading, setLoading] = useState<Record<string, boolean>>({
    google: false,
    ml: false,
    deepl: false,
  });

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setLoading({ google: true, ml: true, deepl: true });

    const results = await Promise.allSettled(
      engines.map(async (engine) => {
        const result = await engine.translate(inputText);
        return { id: engine.id, result };
      })
    );

    const newOutputs: Record<string, string> = {};
    const newLoading: Record<string, boolean> = { google: false, ml: false, deepl: false };

    results.forEach((res) => {
      if (res.status === "fulfilled") {
        newOutputs[res.value.id] = res.value.result;
      } else {
        const id = engines[results.indexOf(res)]?.id || "";
        newOutputs[id] = "Translation failed. Please try again.";
      }
    });

    setOutputs(newOutputs);
    setLoading(newLoading);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-primary-foreground">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Translation Engines
            </h1>
            <p className="text-lg text-muted-foreground">
              Compare the quality of our translation engines side by side. Enter
              text below and see how each engine handles the translation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_CHARS) {
                    setInputText(e.target.value);
                  }
                }}
                maxLength={MAX_CHARS}
                rows={4}
                placeholder="Type or paste text to translate..."
                className="w-full px-5 py-4 rounded-2xl bg-card border border-border/50 dark:border-white/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 resize-none text-base transition-all duration-200"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-muted-foreground">
                  {inputText.length}/{MAX_CHARS} characters
                </span>
                <button
                  onClick={handleTranslate}
                  disabled={!inputText.trim()}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_25px_rgba(88,101,242,0.5)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_0_20px_rgba(88,101,242,0.3)]"
                >
                  Translate
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto mb-16">
            {engines.map((engine) => (
              <div
                key={engine.id}
                className={`bg-card rounded-2xl border ${engine.borderColor} dark:border-opacity-30 overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20`}
              >
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className={engine.color}>{engine.icon}</span>
                    <span className="font-semibold text-sm text-foreground">
                      {engine.name}
                    </span>
                  </div>
                  <CopyButton text={outputs[engine.id] || ""} />
                </div>
                <div className="px-5 py-4 min-h-[120px]">
                  {loading[engine.id] ? (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Translating...</span>
                    </div>
                  ) : outputs[engine.id] ? (
                    <p className="text-sm text-foreground leading-relaxed">
                      {outputs[engine.id]}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground/50 italic">
                      Translation will appear here
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground text-center mb-8">
              About Our Engines
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {engines.map((engine) => (
                <div
                  key={engine.id}
                  className="bg-card rounded-2xl md:rounded-3xl p-6 md:p-8 border border-border/50 dark:border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-black/50"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${engine.color} bg-current/10`}
                      style={{ backgroundColor: `color-mix(in srgb, currentColor 10%, transparent)` }}
                    >
                      <span className={engine.color}>{engine.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground font-display">
                      {engine.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {engine.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
