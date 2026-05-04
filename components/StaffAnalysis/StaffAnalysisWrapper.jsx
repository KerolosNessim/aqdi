'use client'
import React, { useEffect, useState } from 'react'
import StaffCard from './StaffCard'
import defaultUser from '@/public/images/defaultUser.jpg'
import Header from '../home/Header'

export default function StaffAnalysisWrapper({ id }) {
    const [title, setTitle] = useState('')

    useEffect(() => {
        switch (id) {
            case 'most_received_orders':
                setTitle('اكثر الموضفين استلم طلب')
                break;
            case 'most_completed_orders':
                setTitle('اكثر الموضفين وثق طلب')
                break;
            case 'most_incompleted_orders':
                setTitle("اكثر موضف اكتسب طلب غير مدفوع")
                break;
            case 'most_refunded_orders':
                setTitle("اكثر موضف قدم استرجاع")
                break;
            case 'total':
                setTitle("عدد الموضفين")
                break;
            default:
                setTitle("عدد الموضفين")
                break;
        }
    }, [id])

    // Sample staff data
    const staffData = [
        {
            id: 1,
            rank: 1,
            image: defaultUser,
            name: "ريـــان التركي",
            role: "admin",
            count: "410",
            label: "عدد العقود المكتسبة"
        },
        {
            id: 2,
            rank: 2,
            image: defaultUser,
            name: "ريـــان التركي",
            role: "admin",
            count: "410",
            label: "عدد العقود المكتسبة"
        },
        {
            id: 3,
            rank: 3,
            image: defaultUser,
            name: "ريـــان التركي",
            role: "admin",
            count: "410",
            label: "عدد العقود المكتسبة"
        },
        {
            id: 4,
            rank: 4,
            image: defaultUser,
            name: "ريـــان التركي",
            role: "admin",
            count: "410",
            label: "عدد العقود المكتسبة"
        },
        {
            id: 5,
            rank: 5,
            image: defaultUser,
            name: "ريـــان التركي",
            role: "admin",
            count: "410",
            label: "عدد العقود المكتسبة"
        },
        {
            id: 6,
            rank: 6,
            image: defaultUser,
            name: "ريـــان التركي",
            role: "admin",
            count: "410",
            label: "عدد العقود المكتسبة"
        }
    ]

    return (
        <div className="flex flex-col gap-6 p-6 min-h-screen" dir="rtl">
            <Header page='welcome' title={title} isMain={false} first="الرئيــسية" firstURL="/" second='التحليــلات' secondURL="/home/analysis" third={title} thirdURL={`/home/financial-analysis/${id}`} />
            
            <div className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {staffData.map((staff) => (
                        <StaffCard key={staff.id} staff={staff} />
                    ))}
                </div>
            </div>
        </div>
    );
}