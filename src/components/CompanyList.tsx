import React, { useState } from "react";
import { Link } from "react-router-dom";

import EditCompany from "./EditCompany";

export type Company = {
  id: string;
  companyName: string;
  createdDate: string;
};

type Props = {
  companyData: Company;
  removeCompany: (id: string) => void;
};

export default function CompanyList({ companyData, removeCompany }: Props) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [companyName, setCompanyName] = useState<string>(
    companyData.companyName
  );
  const date = new Date(parseInt(companyData.createdDate)).toString();
  return (
    <>
      <div className="listContainer">
        <div className="companyName">{companyName}</div>
        <div className="companyDate">{date}</div>
        <div className="companyViewBtns">
          <Link to={`/${companyData.id}`}>
            <button className="viewCompBtn">View</button>
          </Link>
          <button
            onClick={() => setOpenEditModal(!openEditModal)}
            className="editBtn"
          >
            Edit
          </button>
          <button
            className="deleteBtn"
            onClick={() => removeCompany(companyData.id)}
          >
            Delete
          </button>
        </div>
      </div>
      {openEditModal && (
        <EditCompany
          companyData={companyData}
          setCompanyName={(newName: string) => setCompanyName(newName)}
          closeModal={() => setOpenEditModal(!openEditModal)}
        />
      )}
    </>
  );
}
