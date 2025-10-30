import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Plus } from "lucide-react";

const CreateRecipeButton = ({to}) => {
    const navigate = useNavigate();
  return (
    <button className="fixed z-50 w-12 h-12 bg-[#FF7518] rounded-full bottom-3 right-3 md:bottom-8 md:right-8 flex justify-center items-center cursor-pointer shadow-lg" onClick={() => navigate(`${to}`)}>
      <Plus color="white" />
    </button>
  );
}

export default CreateRecipeButton