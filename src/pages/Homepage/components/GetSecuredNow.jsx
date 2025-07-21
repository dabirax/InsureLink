import { useNavigate } from 'react-router-dom';

const GetSecuredNow = () => {
  const navigate = useNavigate();

  const handleGetSecured = () => {
    navigate('/signup');
  };

  return (
    <button 
      className="bg-[#FF7043] rounded-sm p-5 hover:scale-105 text-[#fff] text-sm"
      onClick={handleGetSecured}
    >
      Get Secured Now
    </button>
  );
};

export default GetSecuredNow;