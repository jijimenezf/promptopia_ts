/**
 * This is a refactor for the function that is doing the request to several /api endpoints
 */
/**
 * Function for handling requests to /api url and for returning the right
 * data type as it is specified in the Promise
 * @param url the endpoint for either user or prompts
 * @param options object containing options for the request
 * @returns the data returned from the database
 */
export async function makeRequestToDataBase<TJsonResponse>(url: string,
  options?: RequestInit | undefined): Promise<TJsonResponse> {
  const response = await fetch(url, options);
  const data: TJsonResponse = await response.json();
  if (response.ok) {
    return data;
  } else {
    return Promise.reject(new Error(`No endpoint or data were located at ${url}`));
  }
}

/**
 * Same logic as function from above, but using arrow notation
 * @param url the endpoint for either user or prompts
 * @param options object containing options for the request
 * @returns the data returned from the database
 */
export const makeRequestToDataBaseArrowNotation =
  async <TJsonResponse extends unknown>(url: string, options?: RequestInit): Promise<TJsonResponse> => {
    const response = await fetch(url, options);
    const data: TJsonResponse = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(new Error(`No endpoint or data were located at ${url}`));
    }
};
/**
export const getDataFromDBV2 = async <TJsonResponse>(endpoint: string): Promise<TJsonResponse> => {
  const response = await fetch(endpoint);
    const data:TJsonResponse  = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(new Error(`No endpoint or data were located at ${endpoint}`));
    }
}
*/
