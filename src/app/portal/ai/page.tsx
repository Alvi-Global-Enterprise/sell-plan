import { PageHeader, Panel, PortalButton } from "@/components/portal/ui";

const tools = [
  {
    title: "AI Business Plan Generator",
    body: "Create a structured plan with market, offer and growth sections.",
  },
  {
    title: "Market Research Assistant",
    body: "Summarise industry trends and competitor angles for your niche.",
  },
  {
    title: "Financial Forecast Helper",
    body: "Draft revenue and cost assumptions for early planning.",
  },
  {
    title: "Marketing Strategy Ideas",
    body: "Generate channel ideas tailored to your business type.",
  },
];

export default function AIToolsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="AI-powered tools"
        title="Smarter business planning"
        description="UI for AI tools promised on the landing page. Starter includes basic assistance; advanced tools unlock with higher plans."
        actions={<PortalButton href="/portal/membership">Upgrade plan</PortalButton>}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {tools.map((t) => (
          <Panel key={t.title}>
            <h2 className="text-[16px] font-extrabold text-[#0B1B32]">{t.title}</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[#5B6577]">
              {t.body}
            </p>
            <div className="mt-4">
              <label className="block text-[12px] font-semibold text-[#0B1B32]">
                Describe your business
              </label>
              <textarea
                rows={3}
                placeholder="e.g. London café seeking expansion funding"
                className="mt-1.5 w-full rounded-[8px] border border-[#E3E8EF] bg-[#F8FAFC] px-3 py-2 text-[14px] outline-none focus:border-[#00AEEF]"
              />
              <PortalButton className="mt-3">Generate draft</PortalButton>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
