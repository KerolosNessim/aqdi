import React from 'react'
import Header from '@/components/home/Header';
import EmployeeDetailsCard from '@/components/employees/employee-details';
import SalaryTable from '@/components/employees/salary-table';
import NotesTable from '@/components/employees/notes-table';
import ContractEmployeeTable from '@/components/employees/contract-employee-table';
export default function EmployeeDetailsPage() {
  return (
    <div>
      {/* app header */}
      <Header page='welcome' title="الموظفين" isMain={false} first="الرئيــسية" firstURL="/" second='الموظفين' secondURL="/home/employees" third='تفاصيل الموظف' thirdURL="/home/employees/1" />
      {/* employee details card */}
      <EmployeeDetailsCard />
      {/* salary table */}
      <SalaryTable />
      {/* notes table */}
      <NotesTable />
      {/* contract employee table */}
      <ContractEmployeeTable />

    </div>
  )
}