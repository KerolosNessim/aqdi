const ORDER_MESSAGE_CONTEXTS = {
  owner: {
    patterns: [/صك/i, /المالك/i, /وثيق/i, /deed/i, /owner/i],
    excludePatterns: [/وكيل/i, /agent/i],
  },
  agent: {
    patterns: [/وكيل/i, /agent/i],
    excludePatterns: [],
  },
  propertyAddress: {
    patterns: [/عنوان/i, /الوطني/i, /address/i, /national/i, /العنوان/i, /صحيح/i, /مبنى/i, /حي/i, /شارع/i],
    excludePatterns: [/وكيل/i, /صك/i, /المالك/i],
  },
  propertyDetails: {
    patterns: [/عقار/i, /property/i, /وحدة/i, /طابق/i, /استخدام/i, /نوع/i],
    excludePatterns: [/عنوان/i, /الوطني/i, /وكيل/i, /صك/i],
  },
};

function matchesContext(haystack, context) {
  const config = ORDER_MESSAGE_CONTEXTS[context];
  if (!config) return true;
  if (config.excludePatterns?.some((pattern) => pattern.test(haystack))) return false;
  return config.patterns.some((pattern) => pattern.test(haystack));
}

export function filterAlertsByOrderContext(alerts, context) {
  if (!Array.isArray(alerts) || !context) return [];

  const filtered = alerts.filter((alert) => {
    const sectionName = alert?.section?.name_ar || alert?.section?.name_en || "";
    const itemName =
      alert?.section_item?.name_ar || alert?.section_item?.name_en || "";
    const messageText = alert?.message || "";
    return matchesContext(`${sectionName} ${itemName} ${messageText}`, context);
  });

  return filtered.length > 0 ? filtered : alerts;
}

export function getOrderSectionFields(orderData, context) {
  const summary = orderData?.contract_summary ?? {};
  const orderId = orderData?.uuid ?? orderData?.id ?? summary?.id;

  if (context === "owner") {
    return [
      { label: "رقم الطلب", value: orderId },
      { label: "اسم المالك", value: summary.name_owner },
      { label: "رقم الهوية", value: summary.property_owner_id_num },
      { label: "تاريخ الميلاد", value: summary.property_owner_dob },
      { label: "رقم الجوال", value: summary.property_owner_mobile },
    //  { label: "ايبان المالك", value: summary.property_owner_iban },
      { label: "المنطقة", value: summary.relation_labels?.property_region },
      { label: "المدينة", value: summary.relation_labels?.property_city },
      { label: "الحي", value: summary.neighborhood },
      { label: "الشارع", value: summary.street },
    ];
  }

  if (context === "agent") {
    return [
      { label: "رقم الطلب", value: orderId },
      { label: "اسم الوكيل", value: summary.name_owner },
      { label: "رقم الهوية", value: summary.id_num_of_property_owner_agent },
      { label: "تاريخ الميلاد", value: summary.dob_of_property_owner_agent },
      { label: "رقم الجوال", value: summary.mobile_of_property_owner_agent },
    ];
  }

  const step1 = orderData?.step1 ?? {};

  if (context === "propertyAddress") {
    return [
      { label: "رقم الطلب", value: orderId },
      { label: "المدينة", value: step1.city_name || step1.property_city_id },
      { label: "المنطقة", value: step1.property_place_name || step1.property_place_id },
      { label: "الحي", value: step1.neighborhood },
      { label: "الشارع", value: step1.street },
      { label: "رقم المبنى", value: step1.building_number },
      { label: "رقم الإضافي", value: step1.extra_figure },
      { label: "الرمز البريدي", value: step1.postal_code },
      { label: "خط العرض", value: step1.latitude },
      { label: "خط الطول", value: step1.longitude },
    ];
  }

  if (context === "propertyDetails") {
    return [
      { label: "رقم الطلب", value: orderId },
      { label: "استخدام العقار", value: step1.property_usages_name },
      { label: "نوع العقار", value: step1.property_type_name },
      { label: "إجمالي عدد الوحدات في كل طابق", value: step1.number_of_units_per_floor },
      { label: "إجمالي عدد الطوابق", value: step1.number_of_floors },
      { label: "عمر العقار", value: step1.age_of_the_property },
      { label: "إجمالي عدد الوحدات في العقار", value: step1.number_of_units_in_realestate },
      { label: "إسم مالك العقار", value: summary.name_owner },
    ];
  }

  return [];
}

export function formatSectionDataBlock(fields) {
  return fields
    .filter(({ value }) => value !== null && value !== undefined && value !== "")
    .map(({ label, value }) => `\t•\t${label}: ${value}`)
    .join("\n");
}

export function getOrderContractUuid(orderData) {
  const summary = orderData?.contract_summary ?? {};
  return (
    orderData?.uuid ??
    orderData?.contract_uuid ??
    summary?.uuid ??
    summary?.contract_uuid ??
    ""
  );
}

export function getOrderId(orderData) {
  const summary = orderData?.contract_summary ?? {};
  return getOrderContractUuid(orderData) || orderData?.id || summary?.id || "";
}

export function getErrorTypeLabel(alert) {
  return (
    alert?.section_item?.name_ar ||
    alert?.section_item?.name_en ||
    alert?.section?.name_ar ||
    alert?.section?.name_en ||
    alert?.message?.trim()?.split("\n")[0] ||
    "رسالة خطأ"
  );
}

export function composeOrderErrorMessage(alert, orderData) {
  const template = (alert?.message || "").trim();
  const orderId = getOrderId(orderData);
  if (!template && !orderId) return "";
  if (!orderId) return template;
  if (!template) return `رقم الطلب: ${orderId}`;
  return `${template}\n\nرقم الطلب: ${orderId}`;
}

export function composeOrderSectionMessage(alert, orderData) {
  return composeOrderErrorMessage(alert, orderData);
}

export function getAlertDialogTitle(alert) {
  return getErrorTypeLabel(alert);
}

export function getOrderClientPhone(orderData) {
  const summary = orderData?.contract_summary ?? {};
  return (
    summary?.property_owner_mobile ||
    orderData?.user?.mobile ||
    orderData?.user_mobile ||
    summary?.mobile_of_property_owner_agent ||
    ""
  );
}
