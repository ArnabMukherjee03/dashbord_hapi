import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const Board = ({ data, className = "", onClick, setPermission }) => {
  console.log(className);
  return (
    <div
      onClick={onClick}
      style={{ backgroundImage: `url(${data?.image})` }}
      className={`cursor-pointer relative w-60 h-36 rounded-lg bg-cover after:bg-black after:absolute after:top-0 after:left-0 after:w-full after:h-full after:z-[1] after:opacity-10  overflow-hidden p-4 ${className}`}
    >
      <Link   to={data.id?`/board/${data.id}`:'#'}>
        <p className="relative z-40 capitalize">{data?.name}</p>
      </Link>
      {data?.image && (
        <FaUser
          onClick={setPermission}
          className="absolute z-50 right-4 bottom-4 text-xs"
        />
      )}
    </div>
  );
};
