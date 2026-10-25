"use client";

import { useEffect, useRef, useState } from "react";

const CODE_SNIPPETS = [
  {
    lang: "TypeScript",
    code: "const authenticateUser = async (token: string): Promise<UserSession> => {\n  const session = await jwt.verify(token, process.env.JWT_SECRET);\n  return session.isValid ? session.user : null;\n};",
  },
  {
    lang: "Python / AI",
    code: "model = tf.keras.applications.InceptionV3(weights='imagenet', include_top=False)\npredictions = Dense(2, activation='softmax')(Flatten()(model.output))\nmodel.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])",
  },
  {
    lang: "SQL / Banking",
    code: "SELECT account_id, balance, currency FROM core_banking_accounts\nWHERE status = 'ACTIVE' AND branch_code = 'ID00123'\nORDER BY balance DESC LIMIT 10;",
  },
  {
    lang: "React / Realtime",
    code: "useEffect(() => {\n  const client = new StompClient({ brokerURL: 'wss://api.elshinta.internal/ws' });\n  client.onConnect = () => client.subscribe('/topic/broadcast', onMessage);\n  client.activate();\n  return () => client.deactivate();\n}, []);",
  },
];

export function DevPlayground() {
  const [activeTab, setActiveTab] = useState<"snake" | "typer">("snake");

  return (
    <section id="arcade" className="section playground-section">
      <div className="section-heading reveal">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="eyebrow">Interactive Arcade</p>
            <h2>Developer Playground & Mini-Games</h2>
          </div>
          <div className="arcade-tab-switcher">
            <button
              type="button"
              className={`arcade-tab ${activeTab === "snake" ? "active" : ""}`}
              onClick={() => setActiveTab("snake")}
            >
              🐍 Cyber Snake
            </button>
            <button
              type="button"
              className={`arcade-tab ${activeTab === "typer" ? "active" : ""}`}
              onClick={() => setActiveTab("typer")}
            >
              ⌨️ Speed Typer
            </button>
          </div>
        </div>
      </div>

      <div className="playground-card">
        {activeTab === "snake" ? <SnakeGame /> : <SpeedTyper />}
      </div>
    </section>
  );
}

// -------------------------------------------------------------
// 1. Retro Cyber Snake Game
// -------------------------------------------------------------
function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "running" | "paused" | "over">("idle");
  const [soundEnabled, setSoundEnabled] = useState(true);

  const directionRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const snakeRef = useRef<Array<{ x: number; y: number }>>([
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 15, y: 10 });
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Sound generator using Web Audio API
  const playBeep = (freq: number, duration: number) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio not permitted or supported
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("vinsky_snake_highscore");
    if (saved) setHighScore(parseInt(saved, 10) || 0);
  }, []);

  const spawnFood = () => {
    const cols = 24;
    const rows = 18;
    let newFood = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
    // Ensure food doesn't spawn on snake
    while (snakeRef.current.some((segment) => segment.x === newFood.x && segment.y === newFood.y)) {
      newFood = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
      };
    }
    foodRef.current = newFood;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const gridSize = 20;

    // Background
    ctx.fillStyle = "#070b09";
    ctx.fillRect(0, 0, width, height);

    // Subtle grid lines
    ctx.strokeStyle = "rgba(73, 245, 169, 0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Food (Amber glow)
    const food = foodRef.current;
    ctx.save();
    ctx.shadowColor = "#f2b84b";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#f2b84b";
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Snake Body
    snakeRef.current.forEach((segment, index) => {
      ctx.save();
      if (index === 0) {
        // Head
        ctx.fillStyle = "#49f5a9";
        ctx.shadowColor = "#49f5a9";
        ctx.shadowBlur = 14;
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);

        // Eyes
        ctx.fillStyle = "#060807";
        ctx.fillRect(segment.x * gridSize + 4, segment.y * gridSize + 4, 3, 3);
        ctx.fillRect(segment.x * gridSize + gridSize - 7, segment.y * gridSize + 4, 3, 3);
      } else {
        // Body (gradient cyan to green)
        ctx.fillStyle = index % 2 === 0 ? "#4dd7ff" : "#32b896";
        ctx.shadowColor = "#4dd7ff";
        ctx.shadowBlur = 4;
        ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, gridSize - 4, gridSize - 4);
      }
      ctx.restore();
    });
  };

  const update = () => {
    const head = { ...snakeRef.current[0] };
    const dir = directionRef.current;
    head.x += dir.x;
    head.y += dir.y;

    const cols = 24;
    const rows = 18;

    // Wall collision
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
      endGame();
      return;
    }

    // Self collision
    if (snakeRef.current.some((seg) => seg.x === head.x && seg.y === head.y)) {
      endGame();
      return;
    }

    const newSnake = [head, ...snakeRef.current];

    // Eat food
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      playBeep(620, 0.08);
      setScore((prev) => {
        const next = prev + 10;
        if (next > highScore) {
          setHighScore(next);
          localStorage.setItem("vinsky_snake_highscore", next.toString());
        }
        return next;
      });
      spawnFood();
    } else {
      newSnake.pop();
    }

    snakeRef.current = newSnake;
    draw();
  };

  const endGame = () => {
    playBeep(180, 0.3);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    setGameState("over");
  };

  const startGame = () => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    directionRef.current = { x: 1, y: 0 };
    setScore(0);
    spawnFood();
    setGameState("running");

    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    gameLoopRef.current = setInterval(update, 110);
  };

  const pauseGame = () => {
    if (gameState === "running") {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      setGameState("paused");
    } else if (gameState === "paused") {
      setGameState("running");
      gameLoopRef.current = setInterval(update, 110);
    }
  };

  const changeDirection = (newDir: { x: number; y: number }) => {
    const current = directionRef.current;
    // Disallow reversing into self
    if (newDir.x !== -current.x || newDir.y !== -current.y) {
      directionRef.current = newDir;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        changeDirection({ x: 0, y: -1 });
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        changeDirection({ x: 0, y: 1 });
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        changeDirection({ x: -1, y: 0 });
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        changeDirection({ x: 1, y: 0 });
      } else if (e.code === "Space") {
        e.preventDefault();
        if (gameState === "idle" || gameState === "over") startGame();
        else pauseGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, highScore]);

  useEffect(() => {
    draw();
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, []);

  return (
    <div className="snake-container">
      {/* Game Bar */}
      <div className="arcade-header-bar">
        <div className="score-badge">
          <span>SCORE</span>
          <strong>{score}</strong>
        </div>
        <div className="score-badge gold">
          <span>HIGH SCORE</span>
          <strong>{highScore}</strong>
        </div>
        <div className="arcade-controls-row">
          <button
            type="button"
            className="sound-toggle-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Sound ON" : "Sound MUTED"}
          >
            {soundEnabled ? "🔊 Sound ON" : "🔇 Muted"}
          </button>
          {gameState === "idle" && (
            <button type="button" className="button button-primary" onClick={startGame}>
              ▶ Start Game
            </button>
          )}
          {gameState === "running" && (
            <button type="button" className="button button-ghost" onClick={pauseGame}>
              ⏸ Pause
            </button>
          )}
          {gameState === "paused" && (
            <button type="button" className="button button-primary" onClick={pauseGame}>
              ▶ Resume
            </button>
          )}
          {gameState === "over" && (
            <button type="button" className="button button-primary" onClick={startGame}>
              🔄 Play Again
            </button>
          )}
        </div>
      </div>

      {/* Canvas Wrap */}
      <div className="canvas-wrapper">
        <canvas ref={canvasRef} width={480} height={360} className="snake-canvas" />

        {gameState === "idle" && (
          <div className="canvas-overlay">
            <h3 className="neon-text">CYBER SNAKE</h3>
            <p className="muted">Use Arrow Keys or WASD to navigate.</p>
            <button type="button" className="button button-primary" onClick={startGame}>
              Press Space or Click to Play
            </button>
          </div>
        )}

        {gameState === "paused" && (
          <div className="canvas-overlay">
            <h3>GAME PAUSED</h3>
            <button type="button" className="button button-primary" onClick={pauseGame}>
              Resume
            </button>
          </div>
        )}

        {gameState === "over" && (
          <div className="canvas-overlay game-over-overlay">
            <h3 style={{ color: "var(--red)" }}>SYSTEM OVERLOAD</h3>
            <p>Final Score: <strong>{score}</strong></p>
            <button type="button" className="button button-primary" onClick={startGame}>
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Touch D-Pad for Mobile Users */}
      <div className="mobile-dpad" aria-label="Mobile Game Controls">
        <div className="dpad-row">
          <button type="button" className="dpad-btn" onClick={() => changeDirection({ x: 0, y: -1 })}>
            ▲
          </button>
        </div>
        <div className="dpad-row center">
          <button type="button" className="dpad-btn" onClick={() => changeDirection({ x: -1, y: 0 })}>
            ◀
          </button>
          <div className="dpad-center" />
          <button type="button" className="dpad-btn" onClick={() => changeDirection({ x: 1, y: 0 })}>
            ▶
          </button>
        </div>
        <div className="dpad-row">
          <button type="button" className="dpad-btn" onClick={() => changeDirection({ x: 0, y: 1 })}>
            ▼
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Code Speed Typer Game
// -------------------------------------------------------------
function SpeedTyper() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const currentSnippet = CODE_SNIPPETS[snippetIndex];
  const targetCode = currentSnippet.code;

  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Timer loop
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (startTime && !isCompleted) {
      timer = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [startTime, isCompleted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());

    setInput(val);

    // Check completion
    if (val === targetCode) {
      setIsCompleted(true);
    }
  };

  const handleReset = (nextIndex?: number) => {
    setInput("");
    setStartTime(null);
    setElapsed(0);
    setIsCompleted(false);
    if (typeof nextIndex === "number") {
      setSnippetIndex(nextIndex);
    }
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Metrics calculation
  const wordsTyped = input.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(elapsed / 60, 0.016);
  const wpm = Math.round(wordsTyped / minutes);

  // Accuracy calculation
  let correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === targetCode[i]) correctChars++;
  }
  const accuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

  return (
    <div className="typer-container">
      {/* Header bar */}
      <div className="arcade-header-bar">
        <div className="score-badge">
          <span>SPEED (WPM)</span>
          <strong>{wpm}</strong>
        </div>
        <div className="score-badge">
          <span>ACCURACY</span>
          <strong>{accuracy}%</strong>
        </div>
        <div className="score-badge">
          <span>TIME</span>
          <strong>{elapsed}s</strong>
        </div>
        <div className="snippet-selector">
          <label htmlFor="snippet-select" className="sr-only">Choose Language Snippet</label>
          <select
            id="snippet-select"
            value={snippetIndex}
            onChange={(e) => handleReset(Number(e.target.value))}
            className="filter-pill"
          >
            {CODE_SNIPPETS.map((s, idx) => (
              <option key={idx} value={idx}>
                {s.lang}
              </option>
            ))}
          </select>
          <button type="button" className="button button-ghost" onClick={() => handleReset()}>
            🔄 Reset
          </button>
        </div>
      </div>

      {/* Target Code with character highlight */}
      <div className="code-display-box" onClick={() => inputRef.current?.focus()}>
        <pre className="code-display-pre">
          {targetCode.split("").map((char, index) => {
            let className = "char-pending";
            if (index < input.length) {
              className = input[index] === char ? "char-correct" : "char-wrong";
            }
            return (
              <span key={index} className={className}>
                {char === "\n" ? "↵\n" : char}
              </span>
            );
          })}
        </pre>
      </div>

      {/* Input Text Area */}
      <div className="typer-input-wrap">
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          placeholder="Start typing the code snippet above to test your speed..."
          rows={4}
          disabled={isCompleted}
          className="typer-textarea"
          autoFocus
          spellCheck={false}
        />
      </div>

      {/* Completed Banner */}
      {isCompleted && (
        <div className="typer-win-card">
          <h4>🎉 Codebase Cleanly Compiled!</h4>
          <p>
            You achieved <strong>{wpm} WPM</strong> with <strong>{accuracy}% accuracy</strong> in {elapsed} seconds.
          </p>
          <button
            type="button"
            className="button button-primary"
            onClick={() => handleReset((snippetIndex + 1) % CODE_SNIPPETS.length)}
          >
            Next Snippet →
          </button>
        </div>
      )}
    </div>
  );
}
