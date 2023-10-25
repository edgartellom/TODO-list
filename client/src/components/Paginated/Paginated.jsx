import React from "react";
import ReactPaginate from "react-paginate";

const Paginated = ({ totalPages, onPageChange, currentPage }) => {
  const handlePageChange = (selectedPage) => {
    onPageChange(selectedPage + 1);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplaza hacia arriba
  };

  return (
    <div className="flex pt-4 gap-3 flex-wrap m-auto justify-end items-center mb-7">
      <ReactPaginate
        className=" flex flex-wrap justify-center items-center gap-2"
        pageCount={totalPages}
        pageRangeDisplayed={window.innerWidth < 768 ? 2 : 4}
        marginPagesDisplayed={1}
        onPageChange={({ selected }) => handlePageChange(selected)}
        activeClassName=" shadow bg-gray-500 hover:bg-gray-400"
        pageClassName="bg-[#0006] cursor-pointer border-none font-semibold  p-2 px-4 text-xl  rounded-md  duration-300 hover:bg-gray-400"
        previousClassName=" bg-[#000] text-white border-none cursor-pointer text-xl py-2 px-4 rounded-md hover:bg-gray-700 font-semibold hover:text-black shadow transition duration-300 hover:bg-gray-400"
        nextClassName=" bg-[#000] text-white border-none cursor-pointer text-xl py-2 px-4 rounded-md hover:bg-gray-700 font-semibold hover:text-black shadow transition duration-300 hover:bg-gray-400"
        previousLabel="<"
        nextLabel=">"
        breakLabel="..."
        breakClassName=" cursor-pointer text-xl py-2 px-4 font-semibold"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1} // Utiliza currentPage desde el estado de Redux
      />
    </div>
  );
};

export default Paginated;
