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
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/src/utils/axios";


export default function Statistics() {

    const { data: statisticsData, isError, isLoading } = useQuery({
        queryKey: ["getAnalysis"],
        queryFn: () => axiosInstance.get("/admin/dashboard-analytics").then(res => res.data),
    })
    if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>
    if (isError) return <div className="flex items-center justify-center h-screen">Error loading data</div>
    if (!statisticsData?.data) return null;
    

    const apiData = statisticsData.data;

    const formatMap = (obj, basePath, valueType = "price") => {
        if (!obj) return [];
        return Object.entries(obj).map(([key, item]) => ({
            name: item.label_ar,
            value: item.value,
            valueType: valueType,
            percentage: item.percentage_change !== null ? `${item.percentage_change >= 0 ? '+' : ''}${item.percentage_change}%` : null,
            type: key === "total" ? (valueType === "price" ? "total" : "total-regular") : key,
            link: `${basePath}/${key}`
        }));
    };

    const getControlPanelLink = (label) => {
        if (!label) return null;
        if (label.includes("الموظفين")) return "/home/employees";
        if (label.includes("المستخدمين")) return null;
        if (label.includes("المدن")) return "/home/settings/cities";
        if (label.includes("الوحدات")) return "/home/settings/unit-types";
        if (label.includes("العقود الغير المكتملة") || label.includes("عقود غير مكتملة")) return "/home/incolpleted-orders-analysis/total";
        if (label.includes("العقود المكتملة") || label.includes("عقود مكتملة")) return "/home/completed-orders";
        if (label.includes("عقود مدفوعه")) return null;
        if (label.includes("اجمالي المدفوعات في العقود") || label.includes("المدفوعات")) return null;
        return null;
    };

    const getOrderAnalyticsLink = (label) => {
        if (!label) return "/home/orders-analysis";
        if (label.includes("الطلبات المكتملة")) return "/home/completed-orders?created_at=total";
        if (label.includes("الطلبات غير المكتملة")) return "/home/incolpleted-orders-analysis/total";
        if (label.includes("واتساب مكتملة") || label.includes("واتساب المكتملة")) return "/home/completed-whatsapp";
        if (label.includes("واتساب غير مكتملة") || label.includes("واتساب الغير مكتملة")) return "/home/incompleted-whatsapp";
        if (label.includes("مسترجعه") || label.includes("مسترجعة")) return "/home/return-orders?created_at=total";
        return null;
    };

    const analysisData = {
        title: "لوحة التحكم :",
        incomes: apiData.control_panel.map(item => ({
            name: item.label_ar,
            value: item.value,
            valueType: item.type === "currency" ? "price" : "count",
            link: getControlPanelLink(item.label_ar)
        }))
    };

    const data = [
        {
            title: "التحليــلات المــاليــة :",
            incomes: formatMap(apiData.financial_analytics.income, "/home/financial-analysis"),
            orders: Object.entries(apiData.financial_analytics.completed_orders || {}).map(([key, item]) => ({
                name: item.label_ar,
                value: item.value,
                valueType: "count",
                percentage: item.percentage_change !== null ? `${item.percentage_change >= 0 ? '+' : ''}${item.percentage_change}%` : null,
                type: key === "total" ? "total-regular" : key,
                link: `/home/completed-orders?created_at=${key}`
            })),
            incompleteOrders: formatMap(apiData.financial_analytics.incomplete_orders, "/home/incolpleted-orders-analysis", "count"),
            returns: Object.entries(apiData.financial_analytics.refunds || {}).map(([key, item]) => ({
                name: item.label_ar,
                value: item.value,
                valueType: "price",
                percentage: item.percentage_change !== null ? `${item.percentage_change >= 0 ? '+' : ''}${item.percentage_change}%` : null,
                type: key === "total" ? "total" : key,
                link: `/home/return-orders?created_at=${key}`
            })),
            expenses: formatMap(apiData.financial_analytics.expenses, "/home/expense-analysis"),
        }
    ];



    const UserData = [
        {
            title: "تحلــيلات المستخدميــن : ",
            usersAnalysis: formatMap(apiData.user_analytics.new_users, "/home/user-analysis", "count"),
            userAvtivity: [
                {
                    name: apiData.user_analytics.user_activity_rate.label_ar,
                    value: `${apiData.user_analytics.user_activity_rate.value}%`,
                    valueType: "count",
                    type: "onlyNumber",
                },
                {
                    name: apiData.user_analytics.most_clients_completed_requests.label_ar,
                    value: apiData.user_analytics.most_clients_completed_requests.value,
                    type: "onlyNumber",
                    link: "/home/user-analysis/top_completed_orders"
                },
                {
                    name: apiData.user_analytics.most_clients_incomplete_requests?.label_ar || "اكثر العملاء طلب غير مكتمل",
                    value: apiData.user_analytics.most_clients_incomplete_requests?.value,
                    type: "onlyNumberTwoSpace",
                    link: "/home/user-analysis/top_incompleted_orders"
                }
            ],
            userOrders: [
                {
                    name: apiData.user_analytics.most_clients_requests?.label_ar || "اكثر العملاء طلبـــات",
                    value: apiData.user_analytics.most_clients_requests?.value,
                    type: "onlyButton",
                    link: "/home/user-analysis/top_orders"
                },
                {
                    name: apiData.user_analytics.most_clients_returns?.label_ar || "اكثر العملاء استرجاع ",
                    value: apiData.user_analytics.most_clients_returns?.value,
                    type: "onlyButton",
                    link: "/home/user-analysis/top_refunds"
                },
                {
                    name: apiData.user_analytics.most_clients_real_estate?.label_ar || "اكثر العملاء عقارات",
                    value: apiData.user_analytics.most_clients_real_estate?.value,
                    type: "onlyButton",
                    link: "/home/user-analysis/top_properties"
                },
                {
                    name: apiData.user_analytics.most_clients_units?.label_ar || "اكثر العملاء وحدات",
                    value: apiData.user_analytics.most_clients_units?.value,
                    type: "onlyNumberTwoSpace",
                    link: "/home/user-analysis/top_units"
                }
            ],
        }
    ];

    const OrdersData = [
        {
            title: "تحليــلات الطلبــات  : ",
            orders: apiData.order_analytics.map(item => ({
                name: item.label_ar,
                value: item.value + (item.type === "percentage" ? "%" : ""),
                valueType: "count",
                type: item.type === "percentage" ? "onlyNumber" : "regular",
                link: getOrderAnalyticsLink(item.label_ar)
            }))
        }
    ];

    const EmployeesData = [
        {
            title: "تحليــلات الموظفيــن : ",
            employeesAnalysis: apiData.employee_analytics.map(item => {
                let cardId = "total";
                const key = (item.key || "").toLowerCase();
                const label = item.label_ar || "";
                
                if (key.includes("received") || label.includes("استلم") || label.includes("المستلمة")) {
                    cardId = "most_received_orders";
                } else if (key.includes("completed") || label.includes("وثق") || label.includes("المكتملة")) {
                    cardId = "most_completed_orders";
                } else if (key.includes("incomplete") || key.includes("incompleted") || label.includes("غير مدفوع") || label.includes("الغير مدفوع")) {
                    cardId = "most_incompleted_orders";
                } else if (key.includes("refund") || key.includes("return") || label.includes("استرجاع") || label.includes("المرتجعة")) {
                    cardId = "most_refunded_orders";
                }

                return {
                    name: item.label_ar,
                    value: item.value,
                    valueType: item.type === "currency" ? "price" : "count",
                    type: Array.isArray(item.value) ? "arrayOfNames" : "regular",
                    link: `/home/staff-analysis/${cardId}`
                };
            })

        }
    ];

    const UnitsData = [
        {
            title: "تحليــلات العقــارات والوحــدات  : ",
            PropertiesAnalysis: [
                ...formatMap(apiData.real_estate_and_units_analytics.real_estates, "/home/Properties-analysis", "count"),
                ...formatMap(apiData.real_estate_and_units_analytics.units, "/home/Units-analysis", "count"),
            ]
        }
    ];

    const LocationsData = [
        {
            title: "تحليــلات المــواقــع :",
            locationsAnalysis: apiData.location_analytics.map(item => ({
                name: item.label_ar,
                value: item.value,
                valueType: item.type === "currency" ? "price" : "count",
                percentage: item.percentage_change !== null ? `${item.percentage_change >= 0 ? '+' : ''}${item.percentage_change}%` : null,
                type: "onlyNumber"
            }))
        }
    ];

    const layeringData = [
        {
            title: "تحليــلات انتقال الطلب من تصنيف الى تصنيف أخر  : ",
            layeringAnalysis: apiData.order_transfer_analytics.map(item => ({
                name: item.label_ar,
                value: item.value,
                valueType: "count",
                type: "regular",
                link: "/home/layering-analysis/regular"
            }))
        }
    ];


    console.log(LocationsData, apiData.location_analytics);
    

    return (
        <>
            <Header page='welcome' title={"التحليــلات"} isMain={false} first="الرئيــسية" firstURL="/" second='التحليــلات' secondURL="/home/analysis" />
            <div className="flex flex-col gap-6 min-h-screen p-6 overflow-x-auto max-w-[calc(100vw-305px)] max-[1200px]:max-w-[calc(100vw-60px)]" dir="rtl">
                <div className="[&>h2]:text-[18px] [&>h2]:font-bold [&>h2]:text-black [&>h2]:mb-[18px]">
                    <h2>{analysisData.title}</h2>
                    <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                        {
                            analysisData.incomes?.map((item, index) => (
                                <AnalsCard key={index} item={item} />
                            ))
                        }
                    </main>
                </div>
                {
                    data.map((item, index) => (
                        <div className="[&>h2]:text-[18px] [&>h2]:font-bold [&>h2]:text-black [&>h2]:mb-[18px]" key={index}>
                            <h2>{item.title}</h2>
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                                {item.incomes.map((card, index) => (
                                    <DayCard key={index} item={card} />
                                ))}
                            </main>
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                                {item?.orders?.map((card, index) => (
                                    <DayCard key={index} item={card} />
                                ))}
                            </main>
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                                {item.incompleteOrders.map((card, index) => (
                                    <DayCard key={index} item={card} />
                                ))}
                            </main>
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                                {item.returns.map((card, index) => (
                                    <DayCard key={index} item={card} />
                                ))}
                            </main>
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                                {item.expenses.map((card, index) => (
                                    <DayCard key={index} item={card} />
                                ))}
                            </main>
                        </div>
                    ))
                }
                {
                    UserData.map((item, index) => (
                        <div className="[&>h2]:text-[18px] [&>h2]:font-bold [&>h2]:text-black [&>h2]:mb-[18px]" key={index}>
                            <h2>{item.title}</h2>
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                                {item.usersAnalysis.map((card, index) => (
                                    <UserCard key={index} item={card} />
                                ))}
                            </main>
                            <main className="grid grid-cols-4 gap-2.5 w-full mb-2.5">
                                {item.userAvtivity.map((card, index) => (
                                    <UserCard key={index} item={card} />
                                ))}
                            </main>
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                                {item.userOrders.map((card, index) => (
                                    <UserCard key={index} item={card} />
                                ))}
                            </main>
                        </div>
                    ))
                }
                {
                    OrdersData.map((item, index) => (
                        <div className="[&>h2]:text-[18px] [&>h2]:font-bold [&>h2]:text-black [&>h2]:mb-[18px]" key={index}>
                            <h2>{item.title}</h2>
                            <main className="grid grid-cols-3 gap-2.5 w-full mb-2.5">
                                {item.orders.map((card, index) => (
                                    <OrderCard key={index} item={card} />
                                ))}
                            </main>
                        </div>
                    ))
                }
                {
                    EmployeesData.map((item, index) => (
                        <div className="[&>h2]:text-[18px] [&>h2]:font-bold [&>h2]:text-black [&>h2]:mb-[18px]" key={index}>
                            <h2>{item.title}</h2>
                            <main className="grid grid-cols-3 gap-2.5 w-full mb-2.5">
                                {item.employeesAnalysis.map((card, index) => (
                                    <EmployeeCard key={index} item={card} />
                                ))}
                            </main>
                        </div>
                    ))
                }
                {
                    UnitsData.map((item, index) => (
                        <div className="[&>h2]:text-[18px] [&>h2]:font-bold [&>h2]:text-black [&>h2]:mb-[18px]" key={index}>
                            <h2>{item.title}</h2>
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
                                {item.PropertiesAnalysis.map((card, index) => (
                                    <UnitsCard key={index} item={card} />
                                ))}
                            </main>
                        </div>
                    ))
                }
                {
                    LocationsData.map((item, index) => (
                        <div className="[&>h2]:text-[18px] [&>h2]:font-bold [&>h2]:text-black [&>h2]:mb-[18px]" key={index}>
                            <h2>{item.title}</h2>
                            <main className="grid grid-cols-4 gap-2.5 w-full mb-2.5">
                                {item.locationsAnalysis.map((card, index) => (
                                    <LocationsCard key={index} item={card} />
                                ))}
                            </main>
                        </div>
                    ))
                }
                {
                    layeringData.map((item, index) => (
                        <div className="[&>h2]:text-[18px] [&>h2]:font-bold [&>h2]:text-black [&>h2]:mb-[18px]" key={index}>
                            <h2>{item.title}</h2>
                            <main className="grid grid-cols-6 gap-2.5 w-full mb-2.5">
                                {item.layeringAnalysis.map((card, index) => (
                                    <LayeringCard key={index} item={card} />
                                ))}
                            </main>
                        </div>
                    ))
                }
            </div>
        </>
    );
}