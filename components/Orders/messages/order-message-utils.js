export function normalizeMessageAlerts(response) {
  if (!response) return [];
  const data = response?.data ?? response;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.data?.items)) return data.data.items;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(response?.items)) return response.items;
  return [];
}

export function isMessageOnline(alert) {
  if (alert?.is_online === true || alert?.is_online === 1) return true;
  if (alert?.is_online === false || alert?.is_online === 0) return false;
  if (alert?.is_active === false || alert?.is_active === 0) return false;
  return true;
}

export function groupAlertsBySection(alerts) {
  const map = new Map();

  for (const alert of alerts) {
    const sectionId = alert?.section?.id ?? alert?.message_alert_section_id ?? "general";
    const sectionName =
      alert?.section?.name_ar || alert?.section?.name_en || "عام";

    if (!map.has(sectionId)) {
      map.set(sectionId, {
        id: sectionId,
        name: sectionName,
        items: [],
      });
    }
    map.get(sectionId).items.push(alert);
  }

  return Array.from(map.values());
}

