import { dictionary } from "@/i18n";

interface ScrollCueProps {
  /** id (senza #) della sezione successiva a cui saltare. */
  targetId: string;
}

/**
 * Indicatore di scroll in basso — prima esisteva solo nella Hero; ora ogni
 * sezione (tranne l'ultima, Education, dove non c'è altro sotto) lo mostra,
 * puntando sempre alla sezione successiva.
 */
export function ScrollCue({ targetId }: ScrollCueProps) {
  return (
    <a href={`#${targetId}`} className="scroll-cue" aria-label={dictionary.hero.scrollCue}>
      <span />
    </a>
  );
}
