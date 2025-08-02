import { useNavigate } from "react-router-dom";

const Ready = () => {
  const navigate = useNavigate();

  const handleGetSecured = () => {
    navigate("/signup");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FF7043] text-white font-poppins gap-8 w-50%">
      <div className="text-4xl font-semibold">Ready to Protect What You’ve Built?</div>
      <div className="w-2/3 text-3xl text-center">
        Join thousands of Nigerian business owners who sleep better knowing
        InsureLink has their back.
      </div>
      <div className="flex flex-col gap-4">
        <button
          className="bg-white rounded-sm p-5 hover:scale-105 text-[#FF7043] text-sm"
          onClick={handleGetSecured}
        >
          Get Secured Now
        </button>
        <button className="p-5 text-sm text-white rounded-sm hover:scale-105">
          Chat on telegram
        </button>
      </div>
    </div>
  );
}

export default Ready