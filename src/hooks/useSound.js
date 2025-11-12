import { useCallback } from "react";

export default function useSound(soundPath) {
  return useCallback(() => {
    const audio = new Audio(soundPath);
    audio.play().catch(() => {}); // prevent errors if user hasn't interacted yet
  }, [soundPath]);
}
