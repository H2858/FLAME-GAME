/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types/game';
import { TRANSLATIONS } from '../i18n/translations';
import { RotateCcw, ArrowRight, Home, Sparkles, Skull, MapPin } from 'lucide-react';

interface GameOverVictoryModalProps {
  type: 'game_over' | 'victory';
  lang: Language;
  soulsEarned: number;
  stageName: string;
  isLastStage?: boolean;
  onRetry: () => void;
  onNextStage?: () => void;
  onOpenStageSelect?: () => void;
  onOpenUpgrades: () => void;
  onMainMenu: () => void;
}

export const GameOverVictoryModal: React.FC<GameOverVictoryModalProps> = ({
  type,
  lang,
  soulsEarned,
  stageName,
  isLastStage = false,
  onRetry,
  onNextStage,
  onOpenStageSelect,
  onOpenUpgrades,
  onMainMenu,
}) => {
  const t = TRANSLATIONS[lang];
  const isVictory = type === 'victory';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-3 py-[max(10px,env(safe-area-inset-top))] backdrop-blur-md overflow-y-auto"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-md max-h-[calc(100dvh-20px)] overflow-y-auto overscroll-contain bg-[linear-gradient(155deg,#14243a_0%,#0b1426_55%,#101a30_100%)] border border-cyan-400/30 rounded-[26px] p-4 sm:p-5 shadow-[0_24px_90px_rgba(0,0,0,.7),0_0_35px_rgba(34,211,238,.12)] flex flex-col text-center">
        {/* Emblem */}
        <div className="mx-auto mb-2">
          {isVictory ? (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-cyan-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)]">
              <Sparkles className="w-7 h-7 text-cyan-300" />
            </div>
          ) : (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-950/80 border-2 border-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)]">
              <Skull className="w-7 h-7 text-red-400" />
            </div>
          )}
        </div>

        {/* Title */}
        <h2
          className={`text-xl sm:text-2xl font-black mb-1 ${
            isVictory ? 'text-cyan-200' : 'text-red-400'
          }`}
        >
          {isVictory ? t.victory : t.gameOver}
        </h2>
        <p className="text-xs text-slate-400 mb-2">{stageName}</p>

        {isVictory && (
          <p className="text-[11px] sm:text-xs text-cyan-100 font-medium mb-3 px-3 py-2 bg-cyan-950/70 rounded-xl border border-cyan-500/40 leading-relaxed shadow-lg">
            💙 {t.victoryStory}
          </p>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {isVictory && onNextStage && (
            <button
              onClick={onNextStage}
              className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/50 active:scale-95 transition-all"
            >
              <span>{isLastStage ? t.mainMenu : t.nextStage}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onRetry}
            className={`w-full py-2 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all ${
              !isVictory
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-900/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t.tryAgain}</span>
          </button>

          {onOpenStageSelect && (
            <button
              onClick={onOpenStageSelect}
              className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-cyan-500/30 active:scale-95 transition-all"
            >
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{t.stageSelect}</span>
            </button>
          )}

          <button
            onClick={onOpenUpgrades}
            className="w-full py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-cyan-500/30 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{t.upgradeShrine}</span>
          </button>

          <button
            onClick={onMainMenu}
            className="w-full py-2 px-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 font-medium text-xs flex items-center justify-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{t.mainMenu}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
