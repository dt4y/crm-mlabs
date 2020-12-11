export function formatCompanyPostData(company: {
  id: string;
  companyName: string;
  createdDate: string;
}) {
  const params = {
    TableName: "CRM-MLabs-Companies",
    Item: {
      id: company.id,
      companyName: company.companyName,
      createdDate: company.createdDate,
    },
  };

  const data = JSON.stringify(params);

  return data;
}

export function formatCompanyDeleteData(id: string) {
  const params = {
    TableName: "CRM-MLabs-Companies",
    Key: {
      id: id,
    },
  };

  const data = JSON.stringify(params);
  return data;
}

export function formatContactPostData(contact: {
  id: string;
  companyID: string;
  contactName: string;
  contactRole: string;
  email: string;
  phoneNumber: string;
}) {
  const params = {
    TableName: "CRM-MLabs-Contacts",
    Item: {
      id: contact.id,
      contactName: contact.contactName,
      contactRole: contact.contactRole,
      email: contact.email,
      phoneNumber: contact.phoneNumber,
      companyID: contact.companyID,
    },
  };

  const data = JSON.stringify(params);

  return data;
}

export function formatContactDeleteData(id: string) {
  const params = {
    TableName: "CRM-MLabs-Contacts",
    Key: {
      id: id,
    },
  };

  const data = JSON.stringify(params);
  return data;
}

export function formatCompanyEditData(id: string, name: string) {
  const params = {
    TableName: "CRM-MLabs-Companies",
    Key: {
      id: id,
    },
    UpdateExpression: "set companyName = :n",
    ExpressionAttributeValues: {
      ":n": name,
    },
    ReturnValues: "UPDATED_NEW",
  };

  const data = JSON.stringify(params);
  return data;
}

export function formatContactEditData(contact: {
  id: string;
  companyID: string;
  contactName: string;
  contactRole: string;
  email: string;
  phoneNumber: string;
}) {
  const params = {
    TableName: "CRM-MLabs-Contacts",
    Key: {
      id: contact.id,
    },
    UpdateExpression:
      "set contactName = :n, contactRole = :r, email = :e, phoneNumber = :p",
    ExpressionAttributeValues: {
      ":n": contact.contactName,
      ":e": contact.email,
      ":p": contact.phoneNumber,
      ":r": contact.contactRole,
    },
    ReturnValues: "UPDATED_NEW",
  };

  const data = JSON.stringify(params);
  return data;
}
