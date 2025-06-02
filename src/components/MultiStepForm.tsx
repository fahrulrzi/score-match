"use client";

import { useState } from "react";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
  type: "text" | "number" | "select";
  options?: string[]; // kalau select
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
      },
      {
        name: "name",
        label: "Nama Nasabah",
        type: "text",
        placeholder: "Masukkan nama",
      },
      {
        name: "kelamin",
        label: "Jenis Kelamin",
        type: "select",
        options: ["Laki-laki", "Perempuan"],
      },
      {
        name: "usia",
        label: "Usia",
        type: "number",
        placeholder: "Masukkan usia",
      },
      {
        name: "status",
        label: "Status Pernikahan",
        type: "select",
        options: ["Menikah", "Belum Menikah"],
      },
      {
        name: "alamat",
        label: "Tempat Tinggal",
        type: "text",
        placeholder: "Masukkan alamat",
      },
    ],
  },
  {
    title: "Customer Profile",
    fields: [
      {
        name: "pekerjaan",
        label: "Pekerjaan",
        type: "text",
        placeholder: "Masukkan pekerjaan",
      },
      {
        name: "lamaBekerja",
        label: "Lama Bekerja",
        type: "number",
        placeholder: "Masukkan lama bekerja(Tahun)",
      },
      {
        name: "penghasilan",
        label: "Jumlah Penghasilan Bulanan",
        type: "number",
        placeholder: "Masukkan penghasilan",
      },
    ],
  },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isStepValid = () => {
    const currentFields = steps[currentStep].fields;
    return currentFields.every((field) => formData[field.name]?.trim() !== "");
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    alert(JSON.stringify(formData, null, 2));
  };

  const step = steps[currentStep];

  return (
    <div className="max-w-xl mx-auto mt-16 p-6 bg-white shadow-xl text-black rounded-2xl">
      <h2 className="text-xl font-semibold mb-6">{step.title}</h2>

      {step.fields.map((field) => (
        <div key={field.name}>
          <label className="block mb-1 font-medium">{field.label}</label>

          {field.type === "select" ? (
            <select
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full border rounded-lg px-4 py-2">
              <option value="">-- Pilih --</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-md ${
            currentStep === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-600 text-white"
          }`}>
          Sebelumnya
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!isStepValid()}
            className={`px-4 py-2 rounded-md ${
              !isStepValid()
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}>
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`px-4 py-2 rounded-md ${
              !isStepValid()
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}>
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  );
}
