import React from 'react';
import { HeroSheet } from '@securedme/hero-sheet';

type HeroBookCockpitProps = {
  projection: Record<string, any>;
  onCommand: (type: string, payload?: Record<string, unknown>) => Promise<unknown>;
  busy?: boolean;
  error?: string | null;
};

/** The same HeroSheet package is hosted by AlgoQuest web/mobile and Builder. */
export default function HeroBookCockpit({ projection, onCommand, busy = false, error = null }: HeroBookCockpitProps) {
  return (
    <div className="h-[720px] min-h-[640px] overflow-hidden rounded-[18px]" data-testid="hero-sheet-embedded">
      <HeroSheet projection={projection} onCommand={onCommand} mode="embedded" busy={busy} error={error} title="Grimoire du Mage" />
    </div>
  );
}
