const flagMap = {
  eu: "🇪🇺",
  gb: "🇬🇧",
  uk: "🇬🇧",
  us: "🇺🇸",
  in: "🇮🇳",
};

const formatTimeAgo = (isoString) => {
  if (!isoString) return "never";
  try {
    const diffMs = new Date() - new Date(isoString);
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(isoString).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return isoString;
  }
};

export const mapComplianceResponse = (data = {}) => {
  const complianceRate = data.overall_compliance_score ?? 88;

  const jurisdictions = (data.jurisdictions || []).map((j) => ({
    id: j.code || j.id,
    flag: flagMap[String(j.code).toLowerCase()] || "🏳️",
    name: j.name,
    subtitle: j.description || "Regulatory Standards",
    status: j.status === "compliant" ? "compliant" : "alert",
    complianceScore: j.compliance_score || 0,
  }));

  const restrictionControls = (data.restriction_controls || []).map((r) => ({
    id: String(r.id),
    label: r.name,
    description: r.description || "",
    enabled: r.is_enabled ?? false,
    slug: r.slug,
  }));

  // Map policy documents
  const docs = data.documents || [];
  const policyTabs = docs.map((doc) => ({
    id: doc.doc_type || doc.id,
    label: doc.doc_type === "terms_of_service" ? "Terms of Service" :
           doc.doc_type === "privacy_policy" ? "Privacy Policy" :
           doc.doc_type === "responsible_gaming" ? "Responsible Gaming" : doc.title,
  }));

  const policyDocuments = {};
  docs.forEach((doc) => {
    policyDocuments[doc.doc_type || doc.id] = {
      id: doc.id,
      title: doc.title,
      lastSaved: formatTimeAgo(doc.updated_at),
      html: doc.content || "",
      isPublished: doc.is_published,
      publishedAt: doc.published_at,
    };
  });

  return {
    complianceRate,
    jurisdictions,
    restrictionControls,
    policyTabs,
    policyDocuments,
  };
};

export const mapPolicyVersionsResponse = (versions = []) => {
  return (Array.isArray(versions) ? versions : []).map((v) => {
    const updatedByName = v.updated_by?.username || v.updated_by?.email || "System";
    const initials = updatedByName
      ? updatedByName
          .split(/[\s_-]+/)
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "SYS";

    let dateStr = "—";
    if (v.created_at) {
      try {
        dateStr = new Date(v.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } catch {
        dateStr = v.created_at;
      }
    }

    return {
      id: String(v.id),
      version: v.version_number || "v0.0.0",
      document: v.document?.title || "Policy Document",
      updatedBy: updatedByName,
      initials,
      date: dateStr,
      summary: v.change_summary || "No description provided",
    };
  });
};
