export default function TextWave({ text = "Classy Shimmer", className = "text-4xl sm:text-3xl font-bold", startColor, midColor }: TextWaveProps) {
  return (
    <div className="flex items-center">
      <div className="relative overflow-hidden">
        <h1 className={`${className} shimmer-text`}>{text}</h1>
      </div>
      <style>{`
                .shimmer-text {
                    --shimmer-color-start: ${startColor || "hsla(173, 57%, 40%, 1)"};
                    --shimmer-color-mid: ${midColor || "hsla(173, 57%, 40%, 0.5)"};
                    background: linear-gradient(
                        90deg,
                        var(--shimmer-color-start) 0%,
                        var(--shimmer-color-start) 40%,
                        var(--shimmer-color-mid) 50%,
                        var(--shimmer-color-start) 60%,
                        var(--shimmer-color-start) 100%
                    );
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: shimmer 2.5s infinite linear;
                }

                @media (prefers-color-scheme: dark) {
                    .shimmer-text {
                        --shimmer-color-start: ${startColor || "hsla(173, 57%, 40%, 1)"};
                        --shimmer-color-mid: ${midColor || "hsla(173, 57%, 40%, 0.5)"};
                    }
                }

                @keyframes shimmer {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }
            `}</style>
    </div>
  )
}

interface TextWaveProps {
  text?: string
  className?: string
  startColor?: string
  midColor?: string
}
