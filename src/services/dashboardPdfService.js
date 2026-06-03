import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const emptyLabel = "-";

const text = (value) => {
  if (value === null || value === undefined || value === "") return emptyLabel;
  return String(value).replace(/[^\x20-\x7E]/g, " ").trim() || emptyLabel;
};

const percent = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? `${Math.round(number)}%` : emptyLabel;
};

const getFileStamp = () => {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

const getFinalY = (doc, fallback) => doc.lastAutoTable?.finalY || fallback;

const addTitle = (doc, title, subtitle) => {
  doc.setFillColor(20, 83, 45);
  doc.rect(0, 0, 210, 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, 14, 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(subtitle, 14, 22);
};

const addSection = (doc, title, y) => {
  doc.setTextColor(31, 41, 55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(title, 14, y);
  return y + 4;
};

const addTable = (doc, { title, startY, head, body }) => {
  const y = addSection(doc, title, startY);

  autoTable(doc, {
    startY: y,
    head,
    body: body.length ? body : [Array(head[0]?.length || 1).fill(emptyLabel)],
    theme: "grid",
    styles: {
      font: "helvetica",
      fontSize: 8.5,
      cellPadding: 2.5,
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: [22, 101, 52],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14 },
  });

  return getFinalY(doc, y) + 10;
};

const getExportData = (dashboardData = {}) => ({
  kpiCards: dashboardData.kpiCards || [],
  revenue: {
    bars: dashboardData.revenue?.bars || [],
    hours: dashboardData.revenue?.hours || [],
    growth: dashboardData.revenue?.growth || "+0.0%",
    period: dashboardData.revenue?.period || "Last 24 hours",
  },
  topGames: dashboardData.topGames || [],
  clusters: dashboardData.clusters || [],
  activity: dashboardData.activity || [],
  devices: dashboardData.devices || [],
});

export const exportDashboardPdf = (dashboardData = {}, metadata = {}) => {
  const data = getExportData(dashboardData);
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const generatedAt = metadata.generatedAt || new Date();
  const generatedLabel = generatedAt.toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });

  addTitle(doc, "Platform Overview Report", `Generated ${generatedLabel}`);

  let y = 40;
  y = addTable(doc, {
    title: "Key Metrics",
    startY: y,
    head: [["Metric", "Value", "Change", "Progress"]],
    body: data.kpiCards.map((card) => [
      text(card.label),
      text(card.value),
      text([card.delta, card.deltaSub].filter(Boolean).join(" ")),
      percent(card.barPct),
    ]),
  });

  y = addTable(doc, {
    title: "Revenue Telemetry",
    startY: y,
    head: [["Period", "Growth", "Sample Points"]],
    body: [[text(data.revenue.period), text(data.revenue.growth), text(data.revenue.bars.length)]],
  });

  y = addTable(doc, {
    title: "Revenue Distribution",
    startY: y,
    head: [["Label", "Bar Level"]],
    body: data.revenue.bars.map((bar, index) => [
      text(data.revenue.hours[index] || `Point ${index + 1}`),
      percent(bar),
    ]),
  });

  y = addTable(doc, {
    title: "Top Performing Games",
    startY: y,
    head: [["Game", "Players", "Revenue"]],
    body: data.topGames.map((game) => [
      text(game.name),
      text(Number(game.players || 0).toLocaleString()),
      text(game.revenue),
    ]),
  });

  y = addTable(doc, {
    title: "Server Clusters",
    startY: y,
    head: [["Cluster", "Status", "Health"]],
    body: data.clusters.map((cluster) => [
      text(cluster.name),
      text(cluster.status),
      cluster.ok ? "Healthy" : "Needs Attention",
    ]),
  });

  y = addTable(doc, {
    title: "Recent Platform Activity",
    startY: y,
    head: [["Player", "Location", "Event", "Amount", "Status"]],
    body: data.activity.map((item) => [
      text(item.user),
      text(item.location),
      text(item.event),
      text(item.amount),
      text(item.status),
    ]),
  });

  addTable(doc, {
    title: "Device Distribution",
    startY: y,
    head: [["Device", "Share"]],
    body: data.devices.map((device) => [text(device.label), percent(device.pct)]),
  });

  doc.save(`dashboard-overview-${getFileStamp()}.pdf`);
};
