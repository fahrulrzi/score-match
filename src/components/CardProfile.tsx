import Image from "next/image";

interface Props {
  name: string;
  photo: string;
  width: number;
  height: number;
}

const CardProfile: React.FC<Props> = ({ name, photo, width, height }) => {
  return (
    <div className="flex w-1/2">
      <div className=" flex flex-col w-full h-64 items-center rounded-4xl relative">
        <div className="bg-[var(--green)] px-4 py-4 w-full min-h-56 min-w-48 rounded-3xl top-auto bottom-0 absolute z-10 -rotate-4"></div>
        <div className=" w-full z-20 justify-center flex items-center">
          <Image
            src={photo}
            alt={`Picture of ${name}`}
            width={width}
            height={height}
            className="md:-translate-y-8 translate-y-2 p-2 ms-4"
          />
        </div>
        <div className="bg-[var(--pink)] px-4 py-4 rounded-2xl min-h-12 min-w-48 top-auto bottom-0 absolute justify-center items-center flex font-bold text-[var(--green)] md:text-2xl text-xl z-20 translate-x-4 -rotate-2">
          {name}
        </div>
        <div className="h-20 w-1/3 top-auto bottom-0 left-0 right-auto absolute">
          <Image
            src="/component/entah.png"
            alt={`Picture of ${name}`}
            layout="fill"
            objectFit="contain"
            className="object-contain -translate-y-8 p-2 z-50 md:-rotate-16 md:-translate-x-4"
          />
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
