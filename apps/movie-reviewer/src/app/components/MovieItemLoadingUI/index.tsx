export function MovieItemLoadingUI() {
  return (
    <li className="card w-50 bg-base-300 shadow-xl hover:ring-2 hover:ring-indigo-600">
      <div className="mx-auto flex-shrink-0">
        <figure className="p-0">
          <div className="animate-pulse h-[330px] animate-pulse bg-gray-300 rounded-xl w-[220px]"></div>
        </figure>
      </div>

      <div className="card-body items-center text-center">
        <p>
          <div className="animate-pulse w-[220px] h-[30px] animate-pulse bg-gray-300"></div>
        </p>
        <p>
          <div className="animate-pulse w-[220px] h-[30px] animate-pulse bg-gray-300"></div>
        </p>
        <div className="card-actions">
          <button className="btn animate-pulse bg-gray-300 w-[100px]" />
        </div>
      </div>
    </li>
  );
}
