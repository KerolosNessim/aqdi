"use client"
import React from "react";
import Header from "../home/Header";
import DayCard from "./finAnalysis/DayCard";
import UserCard from "./finAnalysis/UserCard";
import OrderCard from "./finAnalysis/OrderCard";
import EmployeeCard from "./finAnalysis/EmployeeCard";
import UnitsCard from "./finAnalysis/UnitsCard";
import LocationsCard from "./finAnalysis/LocationsCard";
import LayeringCard from "./finAnalysis/LayeringCard";
import AnalsCard from "./finAnalysis/AnalsCard";
import Loader from "../home/loader";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/src/utils/axios";
import {
    formatMap,
    formatMetricValue,
    formatPercentage,
    normalizeDashboardAnalytics,
} from "@/src/lib/dashboard-analytics";

const CARD_GRID =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 w-full min-w-0 mb-3";

const getControlPanelLink = (label) => {
    if (!label) return null;
    if (label.includes("الموظفين")) return "/home/employees";
    if (label.includes("المستخدمين")) return null;
    if (label.includes("المدن")) return "/home/settings/cities";
    if (label.includes("الوحدات")) return "/home/settings/unit-types";
    if (label.includes("العقود الغير المكتملة") || label.includes("عقود غير مكتملة")) {
        return "/home/incolpleted-orders-analysis/total";
    }
    if (label.includes("العقود المكتملة") || label.includes("عقود مكتملة")) {
        return "/home/completed-orders";
    }
    return null;
};

const getOrderAnalyticsLink = (label) => {
    if (!label) return "/home/orders-analysis";
    if (label.includes("الطلبات المكتملة")) return "/home/completed-orders?created_at=total";
    if (label.includes("الطلبات غير المكتملة")) return "/home/incolpleted-orders-analysis/total";
    if (label.includes("واتساب مكتملة") || label.includes("واتساب المكتملة")) {
        return "/home/completed-whatsapp";
    }
    if (label.includes("واتساب غير مكتملة") || label.includes("واتساب الغير مكتملة")) {
        return "/home/incompleted-whatsapp";
    }
    if (label.includes("مسترجعه") || label.includes("مسترجعة")) {
        return "/home/return-orders?created_at=total";
    }
    return null;
};

function SectionBlock({ title, children }) {
    return (
        <section className="min-w-0 w-full">
            <h2 className="text-[18px] font-bold text-black mb-[18px]">{title}</h2>
            {children}
        </section>
    );
}

function CardGrid({ children, columns = CARD_GRID }) {
    if (!children || (Array.isArray(children) && children.length === 0)) return null;
    return <div className={columns}>{children}</div>;
}

export default function Statistics() {
    const { data: statisticsData, isError, isLoading } = useQuery({
        queryKey: ["getAnalysis"],
        queryFn: () => axiosInstance.get("/admin/dashboard-analytics").then((res) => res?.data),
    });

    if (isLoading) return <Loader />;

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen text-[#FF4D4F]" dir="rtl">
                تعذر تحميل بيانات التحليلات
            </div>
        );
    }

    const apiData = normalizeDashboardAnalytics(statisticsData?.data ?? statisticsData);

    if (!apiData) {
        return (
            <div className="flex items-center justify-center h-screen text-[#A3A3A3]" dir="rtl">
                لا توجد بيانات تحليلات متاحة
            </div>
        );
    }

    const analysisData = {
        title: "لوحة التحكم :",
        incomes: apiData.control_panel.map((item) => ({
            name: item.label_ar ?? item.label ?? "",
            value: formatMetricValue(item),
            valueType: item.type === "currency" ? "price" : "count",
            link: getControlPanelLink(item.label_ar),
        })),
    };

    const financial = apiData.financial_analytics;

    const financialSection = {
        title: "التحليــلات المــاليــة :",
        incomes: formatMap(financial.income, "/home/financial-analysis"),
        orders: Object.entries(financial.completed_orders || {}).map(([key, item]) => ({
            name: item?.label_ar ?? key,
            value: formatMetricValue(item),
            valueType: "count",
            percentage: formatPercentage(item?.percentage_change),
            type: key === "total" ? "total-regular" : key,
            link: `/home/completed-orders?created_at=${key}`,
        })),
        incompleteOrders: formatMap(financial.incomplete_orders, "/home/incolpleted-orders-analysis", "count"),
        returns: Object.entries(financial.refunds || {}).map(([key, item]) => ({
            name: item?.label_ar ?? key,
            value: formatMetricValue(item),
            valueType: "price",
            percentage: formatPercentage(item?.percentage_change),
            type: key === "total" ? "total" : key,
            link: `/home/return-orders?created_at=${key}`,
        })),
        expenses: formatMap(financial.expenses, "/home/expense-analysis"),
    };

    const userAnalytics = apiData.user_analytics ?? {};

    const userSection = {
        title: "تحلــيلات المستخدميــن : ",
        usersAnalysis: formatMap(userAnalytics.new_users, "/home/user-analysis", "count"),
        userAvtivity: [
            userAnalytics.user_activity_rate && {
                name: userAnalytics.user_activity_rate.label_ar,
                value: `${userAnalytics.user_activity_rate.value ?? 0}%`,
                valueType: "count",
                type: "onlyNumber",
            },
            userAnalytics.most_clients_completed_requests && {
                name: userAnalytics.most_clients_completed_requests.label_ar,
                value: formatMetricValue(userAnalytics.most_clients_completed_requests),
                type: "onlyNumber",
                link: "/home/user-analysis/top_completed_orders",
            },
            userAnalytics.most_clients_incomplete_requests && {
                name: userAnalytics.most_clients_incomplete_requests.label_ar,
                value: formatMetricValue(userAnalytics.most_clients_incomplete_requests),
                type: "onlyNumberTwoSpace",
                link: "/home/user-analysis/top_incompleted_orders",
            },
        ].filter(Boolean),
        userOrders: [
            userAnalytics.most_clients_requests && {
                name: userAnalytics.most_clients_requests.label_ar,
                value: formatMetricValue(userAnalytics.most_clients_requests),
                type: "onlyButton",
                link: "/home/user-analysis/top_orders",
            },
            userAnalytics.most_clients_returns && {
                name: userAnalytics.most_clients_returns.label_ar,
                value: formatMetricValue(userAnalytics.most_clients_returns),
                type: "onlyButton",
                link: "/home/user-analysis/top_refunds",
            },
            userAnalytics.most_clients_real_estate && {
                name: userAnalytics.most_clients_real_estate.label_ar,
                value: formatMetricValue(userAnalytics.most_clients_real_estate),
                type: "onlyButton",
                link: "/home/user-analysis/top_properties",
            },
            userAnalytics.most_clients_units && {
                name: userAnalytics.most_clients_units.label_ar,
                value: formatMetricValue(userAnalytics.most_clients_units),
                type: "onlyNumberTwoSpace",
                link: "/home/user-analysis/top_units",
            },
        ].filter(Boolean),
    };

    const ordersSection = {
        title: "تحليــلات الطلبــات  : ",
        orders: apiData.order_analytics.map((item) => ({
            name: item.label_ar ?? "",
            value:
                item.type === "percentage"
                    ? item.value != null && item.value !== ""
                        ? `${item.value}%`
                        : "—"
                    : formatMetricValue(item),
            valueType: "count",
            type: item.type === "percentage" ? "onlyNumber" : "regular",
            link: getOrderAnalyticsLink(item.label_ar),
        })),
    };

    const employeesSection = {
        title: "تحليــلات الموظفيــن : ",
        employeesAnalysis: apiData.employee_analytics.map((item) => {
            let cardId = "total";
            const key = (item.key || "").toLowerCase();
            const label = item.label_ar || "";

            if (key.includes("received") || label.includes("استلم") || label.includes("المستلمة")) {
                cardId = "most_received_orders";
            } else if (key.includes("completed") || label.includes("وثق") || label.includes("المكتملة")) {
                cardId = "most_completed_orders";
            } else if (
                key.includes("incomplete") ||
                key.includes("incompleted") ||
                label.includes("غير مدفوع") ||
                label.includes("الغير مدفوع")
            ) {
                cardId = "most_incompleted_orders";
            } else if (
                key.includes("refund") ||
                key.includes("return") ||
                label.includes("استرجاع") ||
                label.includes("المرتجعة")
            ) {
                cardId = "most_refunded_orders";
            }

            return {
                name: item.label_ar,
                value: formatMetricValue(item),
                valueType: item.type === "currency" ? "price" : "count",
                type: Array.isArray(item.value) ? "arrayOfNames" : "regular",
                link: `/home/staff-analysis/${cardId}`,
            };
        }),
    };

    const unitsSection = {
        title: "تحليــلات العقــارات والوحــدات  : ",
        propertiesAnalysis: [
            ...formatMap(apiData.real_estate_and_units_analytics.real_estates, "/home/Properties-analysis", "count"),
            ...formatMap(apiData.real_estate_and_units_analytics.units, "/home/Units-analysis", "count"),
        ],
    };

    const locationsSection = {
        title: "تحليــلات المــواقــع :",
        locationsAnalysis: apiData.location_analytics.map((item) => ({
            name: item.label_ar,
            value: formatMetricValue(item),
            valueType: item.type === "currency" ? "price" : "count",
            percentage: formatPercentage(item.percentage_change),
            type: "onlyNumber",
        })),
    };

    const layeringSection = {
        title: "تحليــلات انتقال الطلب من تصنيف الى تصنيف أخر  : ",
        layeringAnalysis: apiData.order_transfer_analytics.map((item) => ({
            name: item.label_ar,
            value: formatMetricValue(item),
            valueType: "count",
            type: "regular",
            link: "/home/layering-analysis/regular",
        })),
    };

    return (
        <>
            <Header
                page="welcome"
                title={"التحليــلات"}
                isMain={false}
                first="الرئيــسية"
                firstURL="/"
                second="التحليــلات"
                secondURL="/home/analysis"
            />
            <div
                className="flex flex-col gap-6 min-h-screen p-6 w-full min-w-0 max-w-full"
                dir="rtl"
            >
                <SectionBlock title={analysisData.title}>
                    <CardGrid>
                        {analysisData.incomes.map((item, index) => (
                            <AnalsCard key={`control-${index}`} item={item} />
                        ))}
                    </CardGrid>
                </SectionBlock>

                <SectionBlock title={financialSection.title}>
                    <CardGrid>
                        {financialSection.incomes.map((card, index) => (
                            <DayCard key={`fin-income-${index}`} item={card} />
                        ))}
                    </CardGrid>
                    <CardGrid>
                        {financialSection.orders.map((card, index) => (
                            <DayCard key={`fin-orders-${index}`} item={card} />
                        ))}
                    </CardGrid>
                    <CardGrid>
                        {financialSection.incompleteOrders.map((card, index) => (
                            <DayCard key={`fin-incomplete-${index}`} item={card} />
                        ))}
                    </CardGrid>
                    <CardGrid>
                        {financialSection.returns.map((card, index) => (
                            <DayCard key={`fin-returns-${index}`} item={card} />
                        ))}
                    </CardGrid>
                    <CardGrid>
                        {financialSection.expenses.map((card, index) => (
                            <DayCard key={`fin-expenses-${index}`} item={card} />
                        ))}
                    </CardGrid>
                </SectionBlock>

                <SectionBlock title={userSection.title}>
                    <CardGrid>
                        {userSection.usersAnalysis.map((card, index) => (
                            <UserCard key={`user-${index}`} item={card} />
                        ))}
                    </CardGrid>
                    <CardGrid columns="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full min-w-0 mb-3">
                        {userSection.userAvtivity.map((card, index) => (
                            <UserCard key={`user-activity-${index}`} item={card} />
                        ))}
                    </CardGrid>
                    <CardGrid>
                        {userSection.userOrders.map((card, index) => (
                            <UserCard key={`user-orders-${index}`} item={card} />
                        ))}
                    </CardGrid>
                </SectionBlock>

                <SectionBlock title={ordersSection.title}>
                    <CardGrid columns="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full min-w-0 mb-3">
                        {ordersSection.orders.map((card, index) => (
                            <OrderCard key={`order-${index}`} item={card} />
                        ))}
                    </CardGrid>
                </SectionBlock>

                <SectionBlock title={employeesSection.title}>
                    <CardGrid columns="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full min-w-0 mb-3">
                        {employeesSection.employeesAnalysis.map((card, index) => (
                            <EmployeeCard key={`employee-${index}`} item={card} />
                        ))}
                    </CardGrid>
                </SectionBlock>

                <SectionBlock title={unitsSection.title}>
                    <CardGrid>
                        {unitsSection.propertiesAnalysis.map((card, index) => (
                            <UnitsCard key={`unit-${index}`} item={card} />
                        ))}
                    </CardGrid>
                </SectionBlock>

                <SectionBlock title={locationsSection.title}>
                    <CardGrid columns="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full min-w-0 mb-3">
                        {locationsSection.locationsAnalysis.map((card, index) => (
                            <LocationsCard key={`location-${index}`} item={card} />
                        ))}
                    </CardGrid>
                </SectionBlock>

                <SectionBlock title={layeringSection.title}>
                    <CardGrid columns="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 w-full min-w-0 mb-3">
                        {layeringSection.layeringAnalysis.map((card, index) => (
                            <LayeringCard key={`layer-${index}`} item={card} />
                        ))}
                    </CardGrid>
                </SectionBlock>
            </div>
        </>
    );
}
