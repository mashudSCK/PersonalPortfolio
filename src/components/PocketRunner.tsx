import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "ready" | "playing" | "over";
const PLAYER_X = 18;
const GRAVITY = 1300;
const JUMP = 570;

export default function PocketRunner() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const scene = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLDivElement>(null);
  const obstacle = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase>("ready");
  const state = useRef({
    y: 0,
    velocity: 0,
    x: 110,
    score: 0,
    passed: false,
    last: 0,
  });
  const frame = useRef(0);
  const paint = useCallback(() => {
    if (player.current)
      player.current.style.transform = `translateY(${-state.current.y}px)`;
    if (obstacle.current) obstacle.current.style.left = `${state.current.x}%`;
  }, []);
  const start = useCallback(() => {
    state.current = {
      y: 0,
      velocity: 0,
      x: 110,
      score: 0,
      passed: false,
      last: 0,
    };
    phaseRef.current = "playing";
    setPhase("playing");
    setScore(0);
    paint();
  }, [paint]);
  const jump = useCallback(() => {
    if (phaseRef.current === "playing" && state.current.y <= 0)
      state.current.velocity = JUMP;
  }, []);
  useEffect(() => {
    if (phase !== "playing") return;
    const tick = (time: number) => {
      const s = state.current;
      if (!s.last) s.last = time;
      const dt = Math.min((time - s.last) / 1000, 0.035);
      s.last = time;
      const width = scene.current?.clientWidth || 400;
      s.velocity -= GRAVITY * dt;
      s.y = Math.max(0, s.y + s.velocity * dt);
      if (s.y === 0 && s.velocity < 0) s.velocity = 0;
      s.x -= ((190 + Math.min(s.score * 5, 70)) / width) * 100 * dt;
      const obstacleWidth = (25 / width) * 100;
      const playerWidth = (36 / width) * 100;
      if (
        s.x < PLAYER_X + playerWidth &&
        s.x + obstacleWidth > PLAYER_X &&
        s.y < 31
      ) {
        phaseRef.current = "over";
        setPhase("over");
        setBest((b) => Math.max(b, s.score));
        paint();
        return;
      }
      if (!s.passed && s.x + obstacleWidth < PLAYER_X) {
        s.passed = true;
        s.score++;
        setScore(s.score);
      }
      if (s.x < -15) {
        s.x = 110 + Math.random() * 15;
        s.passed = false;
      }
      paint();
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    const onVisibility = () => {
      state.current.last = 0;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [phase, paint]);
  return (
    <div className="jump-demo runner">
      <div
        ref={scene}
        className="jump-world runner-world"
        tabIndex={0}
        role="region"
        aria-label="Obstacle game. Press Space or the jump button to jump."
        onKeyDown={(e) => {
          if ((e.code === "Space" || e.code === "ArrowUp") && !e.repeat) {
            e.preventDefault();
            if (phaseRef.current !== "playing") start();
            else jump();
          }
        }}
        onPointerDown={(e) => {
          if (e.pointerType === "touch" && phaseRef.current === "playing") {
            e.preventDefault();
            jump();
          }
        }}
      >
        <span className="runner-score" aria-hidden="true">
          {score} <span>cleared</span>
        </span>
        <div className="jump-ground" />
        <div
          ref={player}
          className="jump-character runner-player"
          aria-hidden="true"
        >
          <span />
          <span />
        </div>
        <div ref={obstacle} className="runner-obstacle" aria-hidden="true" />
        {phase !== "playing" && (
          <p className="runner-overlay" aria-hidden="true">
            {phase === "over" ? "Oops! Try again?" : "Ready when you are."}
          </p>
        )}
      </div>
      <div className="runner-copy">
        <h2>A tiny game. One more try.</h2>
        <p>
          Jump over the obstacles and see how far you can go. Press Space or ↑
          when the game is focused, tap the game, or use the button.
        </p>
        {phase === "playing" ? (
          <button type="button" className="action-link" onClick={jump}>
            Jump
          </button>
        ) : (
          <button type="button" className="action-link" onClick={start}>
            {phase === "over" ? "Play again" : "Start game"}
          </button>
        )}
        <p className="jump-count" role="status" aria-live="polite">
          {phase === "ready"
            ? "Your score grows with each obstacle."
            : phase === "playing"
              ? `${score} ${score === 1 ? "obstacle" : "obstacles"} cleared.`
              : `Game over. ${score} cleared. Best: ${Math.max(best, score)}.`}
        </p>
      </div>
    </div>
  );
}
