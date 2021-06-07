const headersPredef = {
  'accept': 'application/json',
  'Content-Type': 'application/json',
};

export default async function sendRequest({
  url,
  method,
  body,
  headers,
  options,
}) {
  const newHeaders = { ...headersPredef, ...headers };
  const response = await fetch(url, {
    ...options,
    method,
    headers: newHeaders,
    body: JSON.stringify(body),
  });
  console.log(response);
  if (!response.ok) {
    throw await response.json();
  } else {
    return await response.json();
  }
}
