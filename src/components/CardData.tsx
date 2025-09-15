import { useEffect } from "react";
import GaugeChart from "./GaugeChart";
import Aos from "aos";

interface Props {
  score: number;
  name: string;
  job: string;
  income: number;
  age: number;
  describe: string;
}

const CardData: React.FC<Props> = ({
  score,
  name,
  job,
  income,
  age,
  describe,
}) => {
  const capitalizeAllWords = (text: string) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  // if (typeof window != "undefined") {
  //   import("aos").then((Aos) => {
  //     Aos.init();
  //   });
  // }

  useEffect(() => {
    Aos.init({
      duration: 1000, // optional: biar lebih smooth
      once: true, // animasi cuma jalan sekali
    });
  }, []);
  return (
    <div
      data-aos="fade-right"
      className="w-full h-full flex md:flex-row flex-col md:gap-6 md:justify-between bg-[var(--pink)] pb-0 md:rounded-3xl rounded-xl p-4 md:p-8">
      <div className="bg-white md:hidden flex h-2/5 rounded-lg w-full justify-center items-center">
        <GaugeChart score={score} hight={280}></GaugeChart>
      </div>
      <div className="grid grid-cols-16 md:w-3/5 w-full md:mt-0 mt-10 md:text-xl text-xs font-semibold items-center md:ms-14">
        <div className="gap-6 flex flex-col col-span-7 h-full">
          <div>Nama Nasabah </div>
          <div>Pekerjaan </div>
          <div>Penghasilan</div>
          <div>Usia</div>
          <div>Keterangan</div>
        </div>
        <div className="gap-6 flex flex-col top-0 items-center col-span-1 h-full">
          <div>:</div>
          <div>:</div>
          <div>:</div>
          <div>:</div>
          <div>:</div>
        </div>
        <div className="gap-6 flex flex-col col-span-8 h-full">
          <div>{capitalizeAllWords(name)}</div>
          <div>{job}</div>
          <div>{formatRupiah(income)}</div>
          <div>{age}</div>
          <div>{describe}</div>
        </div>
      </div>
      <div className="bg-white md:flex hidden rounded-lg w-2/5 h-full justify-center items-center">
        <GaugeChart score={score} hight={280}></GaugeChart>
      </div>
    </div>
  );
};

export default CardData;
