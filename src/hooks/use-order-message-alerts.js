"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/src/utils/axios";
import { normalizeMessageAlerts } from "@/components/Orders/messages/order-message-utils";

export function useOrderMessageAlerts(enabled = true) {
  const employeeQuery = useQuery({
    queryKey: ["message-alerts-employee", "orders-nav"],
    queryFn: () =>
      axiosInstance.get("/admin/message-alerts/employee").then((res) => res.data),
    enabled,
    staleTime: 60_000,
  });

  const clientQuery = useQuery({
    queryKey: ["message-alerts-client", "orders-nav"],
    queryFn: () =>
      axiosInstance.get("/admin/message-alerts/client").then((res) => res.data),
    enabled,
    staleTime: 60_000,
  });

  const employeeAlerts = normalizeMessageAlerts(employeeQuery.data);
  const clientAlerts = normalizeMessageAlerts(clientQuery.data);

  return {
    employeeAlerts,
    clientAlerts,
    isLoading: employeeQuery.isLoading || clientQuery.isLoading,
    hasAlerts: employeeAlerts.length > 0 || clientAlerts.length > 0,
  };
}
