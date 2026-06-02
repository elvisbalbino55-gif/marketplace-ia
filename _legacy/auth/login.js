import { tenants }
from "../database/tenants.js";

export function login(
  email,
  password
){

  const tenant =
    tenants.find(t=>

      t.email === email &&
      t.password === password

    );

  if(!tenant){

    return null;

  }

  return {

    id:tenant.id,

    company:tenant.company,

    apiKey:tenant.apiKey,

    quota:tenant.quota

  };

}
