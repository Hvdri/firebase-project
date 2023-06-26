import React, { useState } from "react";


type UpdateElementProps = {
  data: {
    id: string;
    language: string;
    years: number;
  };
  onSave: (updatedData: { language: string; years: number }) => void;
  onCancel: () => void;
};

const UpdateElement: React.FC<UpdateElementProps> = ({
  data,
  onSave,
  onCancel,
}) => {
  const [updatedLanguage, setUpdatedLanguage] = useState<string>(data.language);
  const [updatedYears, setUpdatedYears] = useState<number>(data.years);

  const handleSave = () => {
    const updatedData = {
      language: updatedLanguage,
      years: updatedYears,
    };
    onSave(updatedData);
  };

  return (
    <div className="div-update">
      <input
        type="text"
        value={updatedLanguage}
        onChange={(e) => setUpdatedLanguage(e.target.value)}
      />
      <input
        type="number"
        value={updatedYears}
        onChange={(e) => setUpdatedYears(parseInt(e.target.value))}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default UpdateElement;
