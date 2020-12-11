import React, { useState } from "react";
import { Company } from "./CompanyList";
import axios from "axios";
import { formatCompanyEditData } from "../utils";

type Props = {
  companyData: Company;
  closeModal: () => void;
  setCompanyName: (newName: string) => void;
};

const COMPANY_ENPOINT =
  "https://dr0kczc0df.execute-api.us-east-2.amazonaws.com/default/companies";

export default function EditCompany({
  companyData,
  closeModal,
  setCompanyName,
}: Props) {
  const [newCompanyName, setNewCompanyName] = useState(companyData.companyName);

  const editCompany = async (e: any) => {
    e.preventDefault();
    const params = formatCompanyEditData(companyData.id, newCompanyName);

    try {
      await axios.put(COMPANY_ENPOINT, params);
      setCompanyName(newCompanyName);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    setNewCompanyName(e.target.value);
  };

  return (
    <div className="editContainer">
      <div className="edit">
        <form onSubmit={editCompany}>
          <div className="addCompany">
            <input
              className="inputField"
              type="text"
              value={newCompanyName}
              onChange={handleChange}
            />
            <input type="submit" value="Edit" className="addCompanyBtn" />
          </div>
        </form>
      </div>
    </div>
  );
}
