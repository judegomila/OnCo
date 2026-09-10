"use client";

import { useLayer } from "@/lib/layer";
import { useT, type UiKey } from "@/lib/i18n/ui";

/**
 * Wrap server-rendered technical content. Hidden when the reader has chosen Plain or Simple,
 * replaced by a one-line note with a switch back to Technical.
 */
export function LayerAware({ children, label }: { children: React.ReactNode; label?: string }) {
  const [layer, update] = useLayer();
  const { t } = useT();
  if (layer.level === "technical") return <>{children}</>;
  return (
    <div className="card p-3 text-sm text-muted flex flex-wrap items-center gap-2">
      <span>{t("layer.hiddenNote", { label: label ?? t("layer.technicalSummary"), mode: t(`level.${layer.level}` as UiKey) })}</span>
      <button type="button" onClick={() => update({ level: "technical" })} className="underline">{t("layer.showTechnical")}</button>
    </div>
  );
}
