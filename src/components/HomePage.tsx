import React, { useEffect, useState } from "react";
import CompanyList, { Company } from "../components/CompanyList";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { formatCompanyPostData, formatCompanyDeleteData } from "../utils";

const COMPANY_ENPOINT =
  "https://dr0kczc0df.execute-api.us-east-2.amazonaws.com/default/companies";

export default function HomePage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [newCompany, setNewCompany] = useState<string>("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(COMPANY_ENPOINT);
        setCompanies(res.data.Items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCompanies();
  }, []);

  const addCompany = async (e: any) => {
    e.preventDefault();
    const id = uuidv4();
    const date = Date.now().toString();
    const company = { id, companyName: newCompany, createdDate: date };
    const params = formatCompanyPostData(company);

    try {
      await axios.post(COMPANY_ENPOINT, params);
      setCompanies((prev) => [company, ...prev]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    setNewCompany(e.target.value);
  };

  const removeCompany = async (id: string) => {
    const params = formatCompanyDeleteData(id);

    try {
      await axios.delete(COMPANY_ENPOINT, { data: params });
      const filteredCompanies = companies.filter(
        (company) => company.id !== id
      );
      setCompanies(filteredCompanies);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="App">
        <div className="header">
          <div className="pageTitle">Companies</div>
          <div className="heading">Add New Company</div>

          <form onSubmit={addCompany}>
            <div className="addCompany">
              <input
                className="inputField"
                type="text"
                value={newCompany}
                onChange={handleChange}
              />
              <input type="submit" value="Add" className="addCompanyBtn" />
            </div>
          </form>
        </div>
        <main className="main">
          {companies.map((company) => (
            <CompanyList
              key={company.id}
              companyData={company}
              removeCompany={removeCompany}
            />
          ))}
        </main>
      </div>
    </div>
  );
}
