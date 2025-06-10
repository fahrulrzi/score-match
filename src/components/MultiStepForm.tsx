"use client";

import { CustomerRequest, submitForm } from "@/lib/Form";
import { useEffect, useState } from "react";
import GaugeChart from "./GaugeChart";
import { useRouter } from "next/navigation";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type: "text" | "number" | "select";
  options?: string[]; // kalau select
  required: boolean;
};

type Step = {
  title: string;
  fields: Field[];
};

const steps: Step[] = [
  {
    title: "Customer Profile",
    fields: [
      {
        name: "institusi",
        label: "Institusi Yang Mengisi",
        type: "text",
        placeholder: "Masukkan nama institusi",
        required: true,
      },
      {
        name: "username",
        label: "Nama Nasabah",
        type: "text",
        placeholder: "Masukkan nama",
        required: true,
      },
      {
        name: "kelamin",
        label: "Jenis Kelamin",
        type: "select",
        options: ["Laki-laki", "Perempuan"],
        required: true,
      },
      {
        name: "age",
        label: "Usia",
        type: "number",
        placeholder: "Masukkan usia",
        required: true,
      },
      {
        name: "marital_status",
        label: "Status Pernikahan",
        type: "select",
        options: ["Lajang", "Menikah", "Bercerai"],
        required: true,
      },
      {
        name: "alamat",
        label: "Tempat Tinggal",
        type: "text",
        placeholder: "Masukkan alamat",
        required: true,
      },
    ],
  },
  {
    title: "Customer Profile",
    fields: [
      {
        name: "job",
        label: "Pekerjaan",
        type: "select",
        options: [
          "Pegawai Tetap PNS,BUMN",
          "Pegawai Swasta",
          "Pegawai Kontrak",
          "Freelance",
          "Serabutan",
          "Tidak Bekerja",
        ],
        required: true,
      },
      {
        name: "length_of_work",
        label: "Lama Bekerja",
        type: "select",
        options: ["> 5 Tahun", "3 - 5 Tahun", "1 - 3 Tahun", "< 1 Tahun"],
        required: true,
      },
      {
        name: "income",
        label: "Jumlah Penghasilan Bulanan",
        type: "text",
        placeholder: "Masukkan penghasilan",
        required: true,
      },
      {
        name: "installment",
        label: "Jumlah Cicilan Perbulan",
        type: "text",
        placeholder: "Masukkan cicilan",
        required: true,
      },
      {
        name: "dbr",
        label: "DBR(%)",
        type: "text",
        placeholder: "Total DBR",
        required: true,
      },
    ],
  },
  {
    title: "Customer Profile",
    fields: [
      {
        name: "kreditBerjalan",
        label: "Jumlah Kredit Berjalan",
        type: "text",
        placeholder: "Masukkan jumlah kredit berjalan",
        required: true,
      },
      {
        name: "jangkaWaktuKredit",
        label: "Sisa Jangka Waktu Kredit Berjalan (Bulan)",
        type: "number",
        placeholder: "Masukkan jangka waktu kredit berjalan (Bulan)",
        required: true,
      },
      {
        name: "jumlahKreditDiajukan",
        label: "Jumlah Kredit Yang Diajukan",
        type: "number",
        placeholder: "Masukkan jumlah kredit yang diajukan",
        required: true,
      },
      {
        name: "jangkaWaktuKreditDiajukan",
        label: "Jangka Waktu Kredit Yang Diajukan (Bulan)",
        type: "text",
        placeholder: "Masukkan jangka waktu kredit yang diajukan",
        required: true,
      },
      {
        name: "collateral",
        label: "Agunan Yang Diberikan",
        type: "select",
        options: [
          "Sertifikat Rumah",
          "BPKB Mobil",
          "BPKB Motor",
          "Tidak ada agunan",
        ],
        required: true,
      },
      {
        name: "purpose",
        label: "Tujuan Pengajuan Kredit",
        type: "select",
        options: ["Modal Usaha", "Konsumtif"],
        required: true,
      },
    ],
  },
];

interface customerResponse {
  score: number;
  status: string;
  describe: string;
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showError, setShowErrors] = useState(false);
  const [formattedValues, setFormattedValues] = useState<
    Record<string, string>
  >({});
  const [scoreStatus, setScoreStatus] = useState<boolean>(false);
  const [customerResponse, setCustomerResponse] = useState<customerResponse>({
    score: 0,
    status: "",
    describe: "",
  });

  const router = useRouter();

  const formatRupiah = (value: string): string => {
    const number = value.replace(/[^0-9]/g, "");
    if (!number) return "";
    return Number(number).toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const parseRupiah = (value: string): string => {
    return value.replace(/[^0-9]/g, "") || "0";
  };

  const handleChange = (name: string, value: string) => {
    if (
      name === "income" ||
      name === "installment" ||
      name === "kreditBerjalan" ||
      name === "jumlahKreditDiajukan"
    ) {
      // Ambil hanya angka dari input
      const numericValue = parseRupiah(value);
      // Update formData dengan nilai numerik
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
      // Update formattedValues dengan nilai yang diformat
      setFormattedValues((prev) => ({
        ...prev,
        [name]: formatRupiah(numericValue),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every((field) => {
      if (!field.required) return true;
      const value = formData[field.name];
      return value !== undefined && value.toString().trim() !== "";
    });
  };

  const handleNext = () => {
    const currentFields = steps[currentStep].fields;
    const valid = currentFields.every((field) => {
      if (!field.required) return true;
      const value = formData[field.name];
      return value !== undefined && value.toString().trim() !== "";
    });

    setShowErrors(true);

    if (valid) {
      setShowErrors(false);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    const cicilan = parseFloat(formData["installment"] || "0");
    const penghasilan = parseFloat(formData["income"] || "0");

    if (penghasilan > 0 && cicilan >= 0) {
      const dbrValue = ((cicilan / penghasilan) * 100).toFixed(2);
      setFormData((prev) => ({
        ...prev,
        dbr: dbrValue,
      }));
    }
  }, [formData["installment"], formData["income"]]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isStepValid()) {
      console.log("Form data:", formData);
    }

    const customerRequest: CustomerRequest = {
      username: formData["username"],
      job: formData["job"],
      income: parseFloat(parseRupiah(formData["income"])),
      installment: parseFloat(parseRupiah(formData["installment"])),
      age: parseFloat(formData["age"]),
      marital_status: formData["marital_status"],
      length_of_work: formData["length_of_work"],
      purpose: formData["purpose"],
      collateral: formData["collateral"],
    };

    console.log(customerRequest);

    try {
      const res = await submitForm(customerRequest);
      setCustomerResponse(() => ({
        score: res.data.score,
        status: res.data.status,
        describe: res.data.describe,
      }));
      setScoreStatus(!scoreStatus);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const step = steps[currentStep];

  return scoreStatus ? (
    <div className="flex md:px-20 px-4 fixed bottom-0 left-0 w-full h-4/5 md:h-3/4">
      <div className="w-full flex flex-col md:p-12 p-4 h-full gap-14 bg-[var(--pink-background)] rounded-t-lg text-black">
        <div className="flex flex-col md:flex-row w-full h-full bg-white md:p-0 p-4 rounded-xl">
          <div className="flex justify-center items-center w-full h-1/5 md:h-full">
            <GaugeChart score={customerResponse.score} hight={400}></GaugeChart>
          </div>
          <div className="text-5xl font-medium w-full mt-6 md:mt-0 text-[var(--green)] h-full flex flex-col pt-20">
            <div className="md:text-3xl text-lg font-bold text-[var(--green)]">
              Penjelasan
            </div>
            <div className="text-lg font-medium text-wrap mt-5 text-black md:px-4">
              {customerResponse.describe}
            </div>
            <div className="flex mb-10 mt-auto w-full">
              <button
                onClick={() => router.push("/database")}
                className="px-5 py-2 text-base ms-auto me-10 md:text-xl rounded-md cursor-pointer bg-[var(--green-button)] text-white hover:bg-[var(--green)]">
                Oke
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full p-8 md:px-16 text-black">
      <h2 className="text-xl font-semibold mb-6 text-[var(--pink)]">
        {step.title}
      </h2>

      {step.fields.map((field) => {
        const value =
          field.name === "income" ||
          field.name === "installment" ||
          field.name === "kreditBerjalan" ||
          field.name === "jumlahKreditDiajukan"
            ? formattedValues[field.name] || ""
            : formData[field.name] || "";
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-[var(--green)] mb-1 font-semibold">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "select" ? (
              <select
                value={value}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`${
                  value == "" ? "text-gray-500" : "text-black"
                } w-full outline outline-[var(--pink)] md:min-h-10 h-10 focus:outline-2 rounded-lg px-4 py-2  ${
                  showError ? "border-red-500" : ""
                }`}>
                <option value="" className={`text-gray-500 rounded-lg`}>
                  -- Pilih --
                </option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt} className="text-black">
                    {opt}
                  </option>
                ))}
              </select>
            ) : field.name === "dbr" ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={value + "%"}
                  readOnly
                  className="w-full outline outline-[var(--pink)] focus:outline-2 rounded-l-lg px-4 py-2"
                />
              </div>
            ) : (
              <input
                type={
                  field.name === "income" ||
                  field.name === "installment" ||
                  field.name === "kreditBerjalan" ||
                  field.name === "jumlahKreditDiajukan"
                    ? "text"
                    : field.type
                }
                placeholder={field.placeholder}
                value={value}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`w-full outline outline-[var(--pink)] focus:outline-2 rounded-lg px-4 py-2 ${
                  showError ? "border-red-500" : ""
                }`}
                readOnly={field.name === "dbr"}
              />
            )}

            {showError && (
              <p className="text-sm text-red-500 mt-1">Wajib diisi</p>
            )}
          </div>
        );
      })}

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-md ${
            currentStep === 0
              ? "bg-gray-200 cursor-not-allowed"
              : "cursor-pointer bg-gray-600 text-white hover:bg-gray-500"
          }`}>
          Previous
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!isStepValid()}
            className={`px-4 py-2 rounded-md ${
              !isStepValid()
                ? "bg-[var(--green-disable)] cursor-not-allowed"
                : "cursor-pointer bg-[var(--green-button)] text-white hover:bg-[var(--green)]"
            }`}>
            Cek skor
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-8 py-2 rounded-md ${
              !isStepValid()
                ? "bg-[var(--green-disable)] cursor-not-allowed"
                : "cursor-pointer bg-[var(--green-button)] text-white hover:bg-[var(--green)]"
            }`}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}
