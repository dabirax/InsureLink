import React from 'react'

const Footer = () => {
  return (
    <div className="flex items-center justify-start gap-18 text-xs text-[#fdfdfdd4] bg-black/90 font-poppins p-24">
      <div className="max-w-60">
        <h1 className="text-[#FF7043] text-lg font-semibold">InsureLink</h1>
        <p>Making insurance accessible and understandable for all Nigerians.</p>
      </div>
      <div>
        <h1 className="text-lg font-semibold">Quick Links</h1>
        <div>
          <p>Education Center</p>
          <p>Insurance Plans</p>
          <p>AI Assistants</p>
        </div>
      </div>
      <div>
        <div>
          <h1 className="text-lg font-semibold">AI Assistants</h1>
          <div>
            <p>Contact Us</p>
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer