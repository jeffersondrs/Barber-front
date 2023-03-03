type Staff = {
  id: number;
  name: string;
  email: string;
  photo: string;
  role: string;
  createdAt: string;
  _id: string;
};

type Data = {
  status: string;
  result: number;
  data: {
    staff: Staff[];
  };
};

export default function Fetcher({ data }: { data: Data[] }) {
  return (
    <div className="h-full w-full">
      {data?.map((staff: any) => {
        return (
          <div
            className="h-56 w-80 flex flex-col  justify-center items-start p-5 rounded-xl shadow-xl"
            key={staff.id}
          >
            <h1 className="text-xl font-bold text-center w-full">
              {staff.name}
            </h1>
            <p className="text-lg">{staff.email}</p>
            <p className="text-lg">{staff.photo}</p>
            <p className="text-lg">{staff.role}</p>
            <p className="text-lg">{staff.createdAt}</p>
            <p className="text-lg">{staff._id}</p>
          </div>
        );
      })}
    </div>
  );
}
