const SubWhy = ({ id, img, title, description }) => {
  return (
    <div key={id} className="bg-[#F8F8F8]  rounded-lg shadow-md p-5">
      <div className="">
        <img src={img} alt={title} className="w-64" />
      </div>
      <div className="w-3/5">
        <h2 className="text-2xl font-semibold text-[#453939]">{title}</h2>
        <p className="text-[#453939]">{description}</p>
      </div>
    </div>
  );
}
export default SubWhy;
