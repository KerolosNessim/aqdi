"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from "../home/Header";
import { axiosInstance } from "@/src/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../home/loader";
import { useRouter } from "next/navigation";
import OrdersToolbar from "./shared/orders-toolbar";
import OrdersStatusCards from "./shared/orders-status-cards";
import OrdersTable from "./shared/orders-table";
import OrdersPagination from "./shared/orders-pagination";
import {
  applyAdvancedFilters,
  emptyAdvancedFilters,
} from "./shared/orders-filter-utils";
import { useOrderStatusCounts } from "./shared/use-order-status-counts";

export default function AllOrdersWrapper() {
  const [activeFilter, setActiveFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState(emptyAdvancedFilters);
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, debouncedSearchQuery]);

  const handleResetAll = () => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    setActiveFilter("");
    setAdvancedFilters(emptyAdvancedFilters);
    setShowMoreFilters(false);
    setCurrentPage(1);
  };

  const { data: statusData, isLoading: statusLoading } = useQuery({
    queryKey: ["status"],
    queryFn: () => axiosInstance("/admin/contract-statuses"),
  });

  const statusItems = statusData?.data?.data?.items;

  const { allTotal, byId: countsById } = useOrderStatusCounts(statusItems, {
    baseUrl: "/admin/orders",
    statusParam: "contract_status_id",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["orders", activeFilter, debouncedSearchQuery, currentPage],
    queryFn: () => {
      let url = `/admin/orders?contract_status_id=${activeFilter}&page=${currentPage}`;
      if (debouncedSearchQuery) {
        url += `&search=${encodeURIComponent(debouncedSearchQuery)}`;
      }
      return axiosInstance(url);
    },
  });

  const orders = data?.data?.data?.items ?? [];
  const pagination = data?.data?.data?.pagination;

  const filteredOrders = useMemo(
    () => applyAdvancedFilters(orders, advancedFilters, { showStatusColumn: true }),
    [orders, advancedFilters]
  );

  if (isLoading || statusLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
      <Header
        page="welcome"
        title="جميع الطلبات"
        isMain={false}
        first="الرئيــسية"
        firstURL="/"
        second="جميع الطلبات"
        secondURL="/home/orders"
      />

      <div className="flex flex-col gap-6 mt-4 relative z-10">
        <OrdersToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          queryKeys={["orders"]}
          showMoreFilters={showMoreFilters}
          onToggleMoreFilters={() => setShowMoreFilters((prev) => !prev)}
          advancedFilters={advancedFilters}
          onAdvancedFiltersChange={setAdvancedFilters}
          onResetAll={handleResetAll}
          showStatusField
        />
        <OrdersStatusCards
          statusItems={statusItems}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          allTotal={allTotal}
          countsById={countsById}
        />
      </div>

      <OrdersTable
        orders={filteredOrders}
        showStatusColumn
        showChangeStatus
        queryKey={["orders"]}
        onRowClick={(row) => router.push(`/home/orders/${row.id}`)}
      />

      <OrdersPagination
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
