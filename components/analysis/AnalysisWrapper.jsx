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

    const analysisData = {
        title: "لوحة التحكم :",
        incomes: apiData.control_panel.map(item => ({
            name: item.label_ar,
            value: item.value,
            valueType: item.type === "currency" ? "price" : "count",
        }))
    };

    const data = [
        {
            title: "التحليــلات المــاليــة :",
            incomes: formatMap(apiData.financial_analytics.income, "/home/financial-analysis"),
            orders: formatMap(apiData.financial_analytics.completed_orders, "/home/orders-analysis", "count"),
            incompleteOrders: formatMap(apiData.financial_analytics.incomplete_orders, "/home/incolpleted-orders-analysis", "count"),
            returns: formatMap(apiData.financial_analytics.refunds, "/home/return-analysis"),
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
                    link: "/home/user-analysis/regular"
                },
                {
                    name: apiData.user_analytics.most_clients_completed_requests.label_ar,
                    value: apiData.user_analytics.most_clients_completed_requests.value,
                    type: "onlyNumber",
                },
                {
                    name: "اكثر العملاء طلب مكتمل",
                    type: "onlyButton",
                    link: "/home/user-analysis/top_completed_orders"
                },
                {
                    name: "اكثر العملاء طلب غير مكتمل",
                    type: "onlyNumberTwoSpace",
                    link: "/home/user-analysis/top_incompleted_orders"
                }
            ],
            userOrders: [
                {
                    name: "اكثر العملاء طلبـــات",
                    type: "onlyButton",
                    link: "/home/user-analysis/top_orders"
                },
                {
                    name: "اكثر العملاء استرجاع ",
                    type: "onlyButton",
                    link: "/home/user-analysis/top_refunds"
                },
                {
                    name: "اكثر العملاء عقارات",
                    type: "onlyButton",
                    link: "/home/user-analysis/top_properties"
                },
                {
                    name: "اكثر العملاء وحدات",
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
                link: "/home/orders-analysis"
            }))
        }
    ];

    const EmployeesData = [
        {
            title: "تحليــلات الموضفيــن : ",
            employeesAnalysis: apiData.employee_analytics.map(item => ({
                name: item.label_ar,
                value: item.value,
                valueType: item.type === "currency" ? "price" : "count",
                type: Array.isArray(item.value) ? "arrayOfNames" : "regular",
                link: "/home/staff-analysis"
            }))

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
                                {item.orders.map((card, index) => (
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
                            <main className="grid grid-cols-5 gap-2.5 w-full mb-2.5">
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