"use client";

import CardData from "@/components/CardData";
import { getData } from "@/lib/Form";
import { useEffect, useState } from "react";

interface Field {
  id: number;
  username: string;
  job: string;
  income: number;
  installment: number;
  age: number;
  score: number;
  status: string;
  describe: string;
}

const Database = () => {
  const [customers, setCustomers] = useState<Field[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getData();
      setCustomers(data.data);
    };
    fetchCustomers();
  }, []);
  return (
    <div className="flex w-full md:p-10 p-4">
      <div className="flex flex-col w-full gap-20 pt-[17vh]">
        {customers.map((customer) => (
          <CardData
            key={customer.id}
            score={customer.score}
            name={customer.username}
            job={customer.job}
            income={customer.income}
            age={customer.age}
            describe={customer.describe}></CardData>
        ))}
      </div>
    </div>
  );
};

export default Database;
