"use client"
import React from 'react'
import Header from '@/components/home/Header';
import EmployeeDetailsCard from '@/components/employees/employee-details';
import SalaryTable from '@/components/employees/salary-table';
import NotesTable from '@/components/employees/notes-table';
import ContractEmployeeTable from '@/components/employees/contract-employee-table';
import Loader from '@/components/home/loader';
import { useParams } from 'next/navigation';
import { axiosInstance } from '@/src/utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function EmployeeDetailsPage() {
  const { id } = useParams()

  function getEmployeeById(id) {
    return axiosInstance.get(`/admin/employees/${id}`)
      .then((res) => res?.data)
      .catch((err) => {
        throw err;
      });
  }

  const { data, isLoading } = useQuery({
    queryKey: ['employee', id],
    queryFn: () => getEmployeeById(id),
    enabled: !!id
  });

  const employee = data?.data || data;

  console.log("Employee Data:", employee);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* app header */}
      <Header page='welcome' title="الموظفين" isMain={false} first="الرئيــسية" firstURL="/" second='الموظفين' secondURL="/home/employees" third='تفاصيل الموظف' thirdURL={`/home/employees/${id}`} />
      {/* employee details card */}
      <EmployeeDetailsCard employee={employee} />
      {/* salary table */}
      <SalaryTable salaries={employee?.salaries} />
      {/* notes table */}
      <NotesTable notes={employee?.notes} />
      {/* contract employee table */}
      <ContractEmployeeTable receivedContracts={employee?.received_contracts} refundableContracts={employee?.refundable_contracts} />

    </div>
  )
}