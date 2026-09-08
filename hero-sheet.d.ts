declare module '@securedme/hero-sheet' {
  import type { ReactNode } from 'react';

  export type HeroSheetProps = {
    projection: Record<string, any> | null;
    onCommand?: (type: string, payload?: Record<string, unknown>) => Promise<unknown> | unknown;
    forge?: ReactNode;
    title?: string;
    mode?: 'embedded' | 'extension';
    busy?: boolean;
    error?: string | null;
  };

  export function HeroSheet(props: HeroSheetProps): ReactNode;
  export function isHeroSheetProjection(value: unknown): boolean;
  export const HERO_SHEET_TABS: readonly string[];
}
