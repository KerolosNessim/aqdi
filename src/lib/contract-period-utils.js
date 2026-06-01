import { getInstrumentTypeLabel, INSTRUMENT_TYPES } from "./instrument-types";

export function normalizeContractPeriods(response) {
  const payload = response?.data ?? response;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  if (Array.isArray(payload)) return payload;
  return [];
}

export function formatContractPeriodPrice(price) {
  if (price === null || price === undefined || price === "") return null;
  const value = Number(price);
  if (!Number.isFinite(value)) return String(price);
  return `${value.toLocaleString("ar-SA")} ر.س`;
}

export function getContractPeriodLabel(period) {
  return period?.period || period?.note_trans || period?.note_ar || "—";
}

export function getContractTypeLabel(type) {
  if (type === "commercial") return "تجاري";
  if (type === "housing") return "سكني";
  return type || "—";
}

export function groupContractPeriodsByInstrumentType(periods = []) {
  const grouped = new Map();

  for (const period of periods) {
    const key = period?.instrument_type || "other";
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(period);
  }

  const orderedKeys = [
    ...INSTRUMENT_TYPES.filter((type) => grouped.has(type)),
    ...[...grouped.keys()].filter((key) => !INSTRUMENT_TYPES.includes(key)),
  ];

  return orderedKeys.map((instrumentType) => ({
    id: instrumentType,
    name: getInstrumentTypeLabel(instrumentType),
    items: grouped.get(instrumentType) ?? [],
  }));
}
